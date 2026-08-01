# Jira Automation Server Analysis Notes

This document tracks what the external Jira automation server must support for
the protected Jira Setup Studio, plus likely next server changes to evaluate.
The Next.js app owns authentication, admin checks, UI flow, local payload
validation, and safe forwarding. The automation server owns persistence,
resumable orchestration, Jira side effects, generated Jira IDs/keys, run state,
and final reports.

## Current Next.js Expectations

The Next.js app forwards trusted headers after authenticating the browser user
and verifying `role === "admin"`:

```text
X-App-User-Id: <authenticated app user id>
X-App-User-Role: admin
X-Request-Id: <correlation id>
Authorization: Bearer <APP_ADMIN_TOKEN>
```

The automation server should never accept ownership from browser-provided JSON
fields. Use `X-App-User-Id` as the owner only after validating the bearer token.

The app currently calls these upstream paths through the protected server layer:

```text
GET  /health
POST /api/project-setups/validate
POST /api/project-setups
GET  /api/project-setups/:id
PUT  /api/project-setups/:id
POST /api/project-setups/:id/runs
GET  /api/runs/:runId
GET  /api/runs/:runId/report
```

## Required Ownership Contract

Persist `ownerUserId: string` on:

- project setup draft records
- setup run records

When creating a setup through `POST /api/project-setups`, set `ownerUserId`
from `X-App-User-Id`.

When creating a run through `POST /api/project-setups/:id/runs`, copy
`ownerUserId` from the referenced setup record.

Return `ownerUserId` on all setup and run JSON responses:

```json
{
  "id": "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
  "ownerUserId": "app-user-id",
  "status": "draft",
  "request": {},
  "createdAt": "2026-07-23T12:00:00.000Z",
  "updatedAt": "2026-07-23T12:00:00.000Z"
}
```

For protected setup/run operations, reject access when the resource is missing
or `X-App-User-Id` does not match the persisted `ownerUserId`.

Use `404` for missing or inaccessible setup/run records so resource existence
is not leaked across app users.

Apply ownership checks to:

- `GET /api/project-setups/:id`
- `PUT /api/project-setups/:id`
- `POST /api/project-setups/:id/runs`
- `GET /api/runs/:runId`
- `GET /api/runs/:runId/report`

## Current Configure Flow

The Next.js configure page is currently a new-space-only decision tree:

1. Enter project name.
2. Generate project key from first letter of each word.
3. Select a supported project template card and workflow.
4. Import staged JSON for workstreams, workstream links, tasks, task links, and
   subtasks.
5. Auto-validate and autosave only when Jira automation is ready.
6. Save and preview the persisted setup draft.

The browser does not call Jira or the automation server directly. The configure
route checks `GET /health` on page load through the server layer and passes a
safe readiness state into the client UI.

The staged import UI is frontend-only. Before sending data upstream, the app
merges staged imports into the existing normalized setup request shape:

```ts
type JiraProjectSetupRequest = {
  project: {
    key: string;
    name: string;
    projectTypeKey: "business" | "software";
    projectTemplateKey: string;
    createIfMissing?: boolean;
    existingProjectPolicy?: "reuse" | "fail";
  };
  issueHierarchy: {
    workstreamIssueType: string;
    taskIssueType: string;
    subtaskIssueType: string;
    createMissingIssueTypes?: boolean;
  };
  workflow: {
    id: "jira-default" | "document-heavy";
  };
  workstreams: JiraWorkstreamInput[];
};
```

Saved setup preview pages consume the app-facing setup response returned by
`GET /api/project-setups/:id`, not the server's richer internal setup request.
That response should keep descriptions as strings, links as
`{ ref, type, inwardRef, outwardRef }`, and workflow present as
`{ id: "jira-default" | "document-heavy" }`. Server-only fields such as
`existingProjectPolicy`, arbitrary project template options, labels, and date
fields should remain outside the preview contract unless the Next.js schema and
UI are updated in the same change.

## Analyze Next Upstream Changes

These are candidates to review before expanding the frontend further.

### Project Summary Preload

The configure page is designed to receive page-loaded project summaries so it
can block duplicate new-space keys before the admin starts importing data.

Candidate endpoint:

```text
GET /api/projects/summary
```

Candidate response:

```json
[
  {
    "key": "ABC",
    "name": "Acme Business Center"
  }
]
```

Questions to resolve:

- Should this list include all Jira projects visible to automation credentials,
  or only projects created through this setup system?
- Should archived/deleted Jira projects be included as key conflicts?
- Should the endpoint cache Jira project summaries server-side to avoid slow
  page loads?

### Setup Registry Listing

The Jira dashboard still has a registry placeholder. A listing endpoint would
let admins resume drafts and inspect recent runs without knowing setup IDs.

Candidate endpoint:

```text
GET /api/project-setups
```

Minimum response fields:

```json
[
  {
    "id": "a7d8f6f0-2b8f-4f3f-91cf-6b15f9f7f7b1",
    "ownerUserId": "app-user-id",
    "status": "draft",
    "projectKey": "ABC",
    "projectName": "Acme Business Center",
    "createdAt": "2026-07-23T12:00:00.000Z",
    "updatedAt": "2026-07-23T12:00:00.000Z"
  }
]
```

Questions to resolve:

- Should records be paginated from the first version?
- Which statuses should be filterable?
- Should the registry include latest run summary fields?

### Health And Configuration Diagnostics

The current app only needs a safe ready/unavailable result, but diagnosing setup
issues would be easier if `/health` identified non-secret configuration status.

Possible response expansion:

```json
{
  "ok": true,
  "checks": {
    "jiraBaseUrl": "configured",
    "jiraCredentials": "valid",
    "database": "connected"
  }
}
```

Rules:

- Never return tokens, authorization headers, email addresses, or connection
  strings.
- Keep `ok: boolean` for backward compatibility with the current Next.js
  schema, or version this response before changing it.

### Idempotent Run Execution

The setup run must remain resumable and safe to retry.

Confirm the automation server:

- Checks persisted state before creating any Jira issue or link.
- Stores generated Jira IDs and keys immediately after successful creation.
- Stores completed links with stable identities.
- Rechecks project existence at run start before creating a project.
- Does not recreate successful workstreams, tasks, subtasks, or links on retry.

Possible future endpoints:

```text
POST /api/runs/:runId/retry
POST /api/runs/:runId/cancel
```

### Project Create/Edit Policy

The current configure UI is new-space-only, but the upstream server should still
define deterministic project behavior at execution time.

Policy to evaluate:

- If `project.key` does not exist, create it with `project.projectTypeKey`.
- If `project.key` exists, either block with a conflict or explicitly enter a
  supported edit/reuse mode.
- Do not rename an existing Jira project or change its project type unless that
  behavior is intentionally implemented and documented.

### Validation Detail

The app currently expects:

```json
{
  "valid": true
}
```

Richer validation could improve the decision-tree UX.

Potential future shape:

```json
{
  "valid": false,
  "issues": [
    {
      "path": "workstreams.0.tasks.2",
      "message": "Task issue type is not available in this project."
    }
  ],
  "warnings": []
}
```

If this changes, update the Next.js response schema and builder feedback UI
together.

## Compatibility Notes

- Keep response fields currently parsed by the Next.js app stable unless the app
  schema is updated in the same release.
- Preserve `ownerUserId` on setup and run responses.
- Preserve `valid: true` for successful validation responses.
- Preserve `ok: boolean` on health responses.
- Return normalized errors through HTTP statuses the app already maps:
  `401`, `403`, `404`, `409`, `422`, `429`, `502`, `503`, and `504`.
