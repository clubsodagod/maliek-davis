# Jira Setup Studio

This directory contains the protected Jira Setup Studio inside the admin dashboard. The feature is intended to create, validate, preview, execute, and track Jira project setup runs from structured input data.

The configure route includes a decision-tree builder for new Jira spaces: admins enter one project name, choose a supported project template and workflow, then import workstreams, links, tasks, task links, and subtasks through staged JSON drops.

## Routes

- `/admin/dashboard/jira` - setup registry and Jira feature entry point
- `/admin/dashboard/jira/configure` - decision-tree setup flow for new Jira spaces
- `/admin/dashboard/jira/new` - compatibility redirect to `/admin/dashboard/jira/configure`
- `/admin/dashboard/jira/setups/[setupid]/preview` - saved setup preview
- `/admin/dashboard/jira/setups/[setupid]/run` - setup execution progress
- `/admin/dashboard/jira/setups/[setupid]/results` - setup results and error review
- `/admin/dashboard/jira/[project-key]` - project execution dashboard
- `/admin/dashboard/jira/[project-key]/work` - default Ready work inbox
- `/admin/dashboard/jira/[project-key]/work/[task-type]` - Ready queue for one issue type
- `/admin/dashboard/jira/[project-key]/work/[task-type]/[status]` - status-filtered queue

## Directory Structure

```text
app/admin/dashboard/jira/
|-- page.tsx
|-- README.md
|-- AGENTS.md
|-- new/
|   `-- page.tsx
|-- configure/
|   `-- page.tsx
|-- setups/
|   `-- [setupid]/
|       |-- preview/page.tsx
|       |-- run/page.tsx
|       `-- results/page.tsx
|-- [project-key]/
|   |-- page.tsx
|   `-- work/
|       |-- page.tsx
|       `-- [task-type]/
|           |-- page.tsx
|           `-- [status]/page.tsx
|-- _components/
|-- _config/
|-- _hooks/
|-- _schemas/
|-- _services/
|-- _theme/
|-- _types/
`-- _utils/
```

## Folder Responsibilities

- `page.tsx` files compose route-level UI and should stay thin.
- `_components` holds Jira-specific visual components such as the registry table, project details form, file drop zone, data previewer, validation summary, and setup progress UI.
- `_config` holds strongly typed Jira template and workflow metadata. Raw Jira template keys should stay there.
- `_hooks` holds Jira-specific React hooks for client-side form behavior, upload state, autosave coordination, registry queries, and polling.
- `_schemas` holds runtime validation and parsing schemas for untrusted setup input and normalized setup data.
- `_services` holds typed calls to protected API routes, server actions, and backend services. Client Components must not call Jira directly or receive Jira credentials.
- `_theme` holds Jira-specific Material UI theme extensions only when the application theme is not enough.
- `_types` holds shared feature contracts for source data, normalized data, persisted setup records, execution status, and service request/response shapes.
- `_utils` holds small pure helpers for reference resolution, progress calculation, link identity generation, and other deterministic transformations.
- `configure` owns creating drafts, new-space project configuration, staged hierarchy imports, validation, preview, and confirmation.
- `new` redirects to `configure` for compatibility.
- `setups` owns saved setup detail views, execution, progress, retry, and results.
- `[project-key]` owns the first work-management slice: project health,
  Ready queues, status queues, and Subtask answer completion.

## Intended Setup Flow

The Jira setup flow should remain explicit and resumable:

1. Validate project setup data.
2. Create workstreams.
3. Store generated Jira IDs and keys.
4. Link related workstreams.
5. Create tasks under their assigned workstreams.
6. Store generated task IDs and keys.
7. Link related tasks.
8. Create subtasks under their assigned tasks.
9. Generate a final setup report.

All workstreams, tasks, and subtasks must use stable internal `ref` values. Relationships should resolve through refs, not summaries or display names.

## Data Safety

The browser must never communicate directly with privileged Jira endpoints. Jira credentials, authorization headers, generated IDs, generated keys, and project-specific configuration belong on the server side.

Before any Jira side effect, the feature should:

- Validate the normalized payload.
- Show a confirmation summary.
- Save the submitted input.
- Check persisted state for already-created records or links.
- Persist progress immediately after successful creation operations.
- Make retry behavior idempotent so completed Jira records are not recreated.

## Validation, State, and Progress

Validation should fail early with useful messages for duplicate refs, missing parent refs, missing link targets, empty summaries, unsupported issue types, invalid project configuration, and unresolved references.

The saved setup registry should be the source of truth for drafts, execution progress, Jira IDs, Jira keys, failures, retries, and final results. Browser state can support interaction, but it must not be the only copy of setup or execution data.

Execution status should be modeled as typed states such as `draft`, `validating`, `ready`, `queued`, `running`, `partially_completed`, `blocked`, `failed`, `completed`, and `cancelled`.

## Current Status

- Route folders exist.
- Feature responsibility folders exist.
- `/admin/dashboard/jira/configure` renders a decision-tree builder.
- Project setup starts with one project name field and generates the key from the first letter of each word.
- Existing project keys or names from page-loaded project summaries block progress; this flow does not edit existing Jira spaces.
- The configure route checks Jira automation health on page load and blocks Jira network side effects when unavailable.
- Project template selection is shown as grouped cards from `_config/projectOptions.ts`; each card derives `projectTypeKey` and `projectTemplateKey`.
- Workflow selection is required. `Jira Default` keeps the template workflow, while `Document Heavy Workflow` is disabled for team-managed templates.
- Workstreams, workstream links, tasks, task links, and subtasks are imported as focused stages.
- Validation runs automatically after successful imports, and drafts autosave once the minimum valid setup exists and automation is ready.
- The application-facing Jira API and server action layer exists under
  `/api/jira/**` and `_services`.
- The dashboard registry lists saved setup drafts by project name and links them
  to preview routes.
- The saved setup preview renders project summary, hierarchy stats, workstream
  cards, expandable task/subtask sections, and link details from the persisted
  setup record.
- The saved setup run page renders execution progress, and the results page
  renders live project status, counts, generated Jira records, and final report
  output when a run id is available.
- Project-key work routes render normalized execution views from the automation
  server: project summary, Ready queues, task-type/status queues, and a focused
  Subtask question workspace with answer save, validation, and completion.

## Configure Input

The configure page accepts staged JSON imports. Each stage accepts either a raw
array or an object wrapper with the matching property.

Workstreams:

```json
{
  "workstreams": []
}
```

Workstream links:

```json
{
  "workstreamLinks": []
}
```

Tasks include the parent workstream ref:

```json
{
  "tasks": [
    {
      "ref": "task-ref",
      "workstreamRef": "workstream-ref",
      "summary": "Task summary"
    }
  ]
}
```

Task links:

```json
{
  "taskLinks": []
}
```

Subtasks include the parent task ref:

```json
{
  "subtasks": [
    {
      "ref": "subtask-ref",
      "taskRef": "task-ref",
      "summary": "Subtask summary"
    }
  ]
}
```

Project template selection is centralized in `_config/projectOptions.ts` and grouped by:

- Software Development
- Business / Project Management
- Process Control

The saved request includes required `project.projectTypeKey`, `project.projectTemplateKey`, and `workflow.id` fields. The configure flow sets `existingProjectPolicy: "fail"` for new-space creation so a selected custom workflow is only applied during safe project creation.

## Application API Layer

The browser must use the same-origin application API or server actions only.
It must not call the privileged Jira automation server directly.

Protected routes:

```text
GET  /api/jira/health
GET  /api/jira/setups
POST /api/jira/setups/validate
POST /api/jira/setups
GET  /api/jira/setups/[setupId]
PUT  /api/jira/setups/[setupId]
POST /api/jira/setups/[setupId]/runs
GET  /api/jira/runs/[runId]
GET  /api/jira/runs/[runId]/report
GET  /api/jira/workspaces/[projectKey]/summary
GET  /api/jira/workspaces/[projectKey]/work
GET  /api/jira/workspaces/[projectKey]/questions/[issueId]
PUT  /api/jira/workspaces/[projectKey]/answers/[issueId]
POST /api/jira/workspaces/[projectKey]/answers/[issueId]/validate
POST /api/jira/workspaces/[projectKey]/answers/[issueId]/complete
```

Every route returns:

```ts
type ApiResult<T> =
  | { success: true; data: T; requestId: string }
  | {
      success: false;
      error: {
        code: string;
        message: string;
        fieldErrors?: Record<string, string[]>;
        retryable: boolean;
      };
      requestId: string;
    };
```

All route responses use `Cache-Control: no-store`.

## Server Actions

Feature-local server actions live in `_services/actions.ts`:

- `validateJiraSetupAction(input)`
- `createJiraSetupAction(input)`
- `updateJiraSetupAction({ setupId, request })`
- `startJiraSetupRunAction({ setupId })`

Work-management actions live in `_services/work-actions.ts`:

- `saveWorkAnswerAction({ projectKey, issueIdOrKey, version, answer, evidence })`
- `validateWorkAnswerAction({ projectKey, issueIdOrKey, version, answer?, evidence? })`
- `completeWorkAnswerAction({ projectKey, issueIdOrKey, version })`

Actions apply the same auth, admin authorization, ownership checks, schemas,
rate limits, upstream service calls, and safe error normalization as routes.

## Ownership

V1 access requires an authenticated app user with `role === "admin"`.

The app forwards trusted identity to the automation server with
`X-App-User-Id` and expects setup and run responses to include
`ownerUserId`. The app returns `404` for records owned by another user.

Update the external Jira automation server using:

```text
app/admin/dashboard/jira/UPSTREAM_SERVER_OWNERSHIP.md
```

## Environment Variables

Server-only Jira automation configuration:

```env
JIRA_AUTOMATION_SERVER_URL=
JIRA_AUTOMATION_SERVER_TOKEN=
JIRA_REQUEST_TIMEOUT_MS=15000
```

Do not prefix these with `NEXT_PUBLIC_`.

## Rate Limiting

The first implementation uses a focused in-memory limiter:

- read/polling: 120 requests per minute
- validation: 30 requests per minute
- mutation/execution: 10 requests per minute

This is a per-process safeguard, not a distributed production limiter. Replace
the limiter boundary with a shared store before deploying across multiple
serverless instances.

## V1 Unsupported Operations

These are intentionally not exposed until the automation server documents them:

- retry
- cancel
- draft generation
- Confluence publication
- document approval
- Definition-of-Done completion

## Next Steps

- Wire Jira transition execution into answer completion once the backend policy
  returns the allowed transition for each workflow.
- Expand work-management contracts for draft generation, Confluence
  publication, review, approval, and Definition-of-Done.
