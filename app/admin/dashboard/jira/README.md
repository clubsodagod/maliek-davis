# Jira Setup Studio

This directory contains the protected Jira Setup Studio inside the admin dashboard. The feature is intended to create, validate, preview, execute, and track Jira project setup runs from structured input data.

The configure route includes a decision-tree builder for new Jira spaces: admins enter one project name, choose a supported project template and workflow, then import workstreams, links, tasks, task links, and subtasks through staged JSON drops.

## Routes

- `/admin/dashboard/jira` - Jira project links, setup registry, and Jira feature entry point
- `/admin/dashboard/jira/configure` - decision-tree setup flow for new Jira spaces
- `/admin/dashboard/jira/new` - compatibility redirect to `/admin/dashboard/jira/configure`
- `/admin/dashboard/jira/setups/[setupid]/discovery` - optional guided project discovery and editable discovery-plan preview
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
|       |-- discovery/page.tsx
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
- `setups` owns saved setup detail views, optional guided discovery, preview, execution, progress, retry, and results.
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

The automation backend is the only process that writes Jira RCA logs. Failed run responses may include `errorLogId` and `progress.failure` details; the dashboard should display those along with the current request ID and run ID. Do not write Jira error logs into this Next app's `public/` folder because those files are web-served assets.

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
- The dashboard shell server-renders after admin authorization, then hydrates
  Jira project links and compact setup summaries through same-origin API calls
  so slow upstream reads do not block the page render.
- The dashboard registry lists saved setup summaries by project name and links
  them to preview routes without loading full setup hierarchies.
- The dashboard lists Jira project summaries from the automation server with
  Summary and Work links, independent of whether the project has a saved setup
  draft in the registry.
- Opening a Jira project creates a reuse-mode empty setup draft automatically
  when the project exists in Jira but is not yet saved in the setup registry.
- The saved setup preview renders project summary, hierarchy stats, workstream
  cards, expandable task/subtask sections, and link details from the persisted
  setup record.
- The saved setup run page renders execution progress, and the results page
  renders live project status, counts, generated Jira records, and final report
  output when a run id is available.
- Setup runs require a per-admin Jira credential. If the current admin has not
  provided one, the protected run page opens an MUI credential dialog before
  starting Jira automation.
- Project-key work routes render normalized execution views from the automation
  server: project summary, Ready queues, task-type/status queues, and a focused
  Subtask question workspace with answer save, validation, and completion.

## Configure Input

The configure page accepts staged JSON imports up to 15 MB. Each stage accepts
either the compact app-facing shape or the richer normalized planning exports
used by the Pearl Box setup files. Rich description objects are converted to
plain text for preview and persistence.

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

Normalized relationship exports are also accepted with:

```json
{
  "workstreams": [],
  "relationships": [
    {
      "ref": "source--blocks--target",
      "sourceWorkstreamRef": "source",
      "targetWorkstreamRef": "target",
      "linkType": "Blocks"
    }
  ]
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

Grouped normalized task exports are also accepted with:

```json
{
  "taskGroups": [
    {
      "workstreamRef": "workstream-ref",
      "issues": []
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

Normalized task relationship exports are also accepted with `relationships`
records that include `sourceTaskRef`, `targetTaskRef`, summaries, workstream
refs, and `linkType`. `Informs` and `Implemented By` are mapped to Jira
`Relates` before the automation server request is sent.

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

Grouped normalized subtask exports are also accepted as a root array or
`taskSubtasks` array whose records contain `parentTaskRef` and nested
`subtasks`.

Project template selection is centralized in `_config/projectOptions.ts` and grouped by:

- Software Development
- Business / Project Management
- Process Control

The saved request includes required `project.projectTypeKey`, `project.projectTemplateKey`, and `workflow.id` fields. The configure flow sets `existingProjectPolicy: "fail"` for new-space creation so a selected custom workflow is only applied during safe project creation.
The default template for new setup drafts is `business-project-management`.
Automatically created drafts for existing Jira projects use `createIfMissing:
false`, `existingProjectPolicy: "reuse"`, `workflow.id: "jira-default"`, and
empty `workstreams`.

## Guided Discovery

After project name, template, and workflow selection, configure presents:

- `Start Guided Discovery`
- `Skip Discovery and Continue`

Skipping discovery keeps the staged JSON import flow unchanged. Starting discovery creates or updates the same setup draft and routes to `/admin/dashboard/jira/setups/[setupid]/discovery`.

The discovery route loads state by setup ID from the automation server. It never passes generated plans through query parameters, local storage, or client-only state. The browser receives the pinned question-bank config and the resumable session state from the server.

If the automation server returns JSON that no longer matches the application schema, the upstream client returns `UPSTREAM_INVALID_RESPONSE` and logs only sanitized schema issue paths, method, route, and request ID. It does not log answer text, generated plan content, tokens, or other sensitive response bodies.

Discovery UI supports:

- tier selection: `quick`, `standard`, `advanced`
- section navigation and progress
- required/optional labels and question guidance
- answer state selection: draft, confirmed, assumption, unknown, not applicable, deferred, disputed
- backend answer save and model normalization
- clarifying-question cards
- section processing, analysis summary, and approval
- final discovery-plan generation
- manual add operations for workstreams, tasks, and subtasks
- chat change requests that return a structured patch preview before mutation
- final approval, generated setup validation, saved setup update, and redirect to `/preview`

Editing an approved answer invalidates that section approval and any generated plan. The final Jira setup preview remains the review gate before Jira publication.

## Application API Layer

The browser must use the same-origin application API or server actions only.
It must not call the privileged Jira automation server directly.

Per-admin Jira credentials are stored in MongoDB in the `jira_credentials`
collection. Secret values are encrypted with `JIRA_CREDENTIAL_ENCRYPTION_KEY`;
hashes/fingerprints are stored only for comparison and audit. Raw, encrypted,
or hashed Jira secrets are never returned to Client Components or Auth.js
session payloads.

Protected routes:

```text
GET  /api/jira/health
GET  /api/jira/projects/summary
GET  /api/jira/setups
GET  /api/jira/setups/summary
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

Guided discovery currently uses server actions that call the upstream automation server directly through `app/api/jira/_lib/service.ts`; no duplicate same-origin API routes are exposed for these mutations.

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

- `getJiraCredentialStatusAction()`
- `saveJiraCredentialAction({ siteUrl, email, apiToken })`
- `validateJiraSetupAction(input)`
- `createJiraSetupAction(input)`
- `updateJiraSetupAction({ setupId, request })`
- `startJiraSetupRunAction({ setupId })`

Work-management actions live in `_services/work-actions.ts`:

- `saveWorkAnswerAction({ projectKey, issueIdOrKey, version, answer, evidence })`
- `validateWorkAnswerAction({ projectKey, issueIdOrKey, version, answer?, evidence? })`
- `completeWorkAnswerAction({ projectKey, issueIdOrKey, version })`

Discovery actions live in `_services/discovery-actions.ts`:

- `startJiraDiscoveryAction({ setupId, tier })`
- `skipJiraDiscoveryAction({ setupId })`
- `saveJiraDiscoveryAnswerAction({ setupId, questionId | clarificationId, rawAnswer, state, expectedVersion })`
- `processJiraDiscoverySectionAction({ setupId, sectionId })`
- `approveJiraDiscoverySectionAction({ setupId, sectionId, revision })`
- `generateJiraDiscoveryPlanAction({ setupId })`
- `patchJiraDiscoveryPlanAction({ setupId, operations })`
- `chatJiraDiscoveryPlanAction({ setupId, prompt })`
- `approveFinalJiraDiscoveryAction({ setupId, planRevisionId })`

Actions apply the same auth, admin authorization, ownership checks, schemas,
rate limits, upstream service calls, and safe error normalization as routes.

## Ownership

V1 access requires an authenticated app user with `role === "admin"`.

The app forwards trusted identity to the automation server with
`X-App-User-Id` and expects setup and run responses to include
`ownerUserId`. The app returns `404` for records owned by another user.

Credential status and save operations use the same admin protection layer:
pages call `requireJiraDashboardAdmin`, and server actions/API routes call
`requireJiraAdmin`. Non-admin users cannot read or update Jira credentials.

Update the external Jira automation server using:

```text
app/admin/dashboard/jira/UPSTREAM_SERVER_OWNERSHIP.md
```

## Environment Variables

Server-only Jira automation configuration:

```env
JIRA_AUTOMATION_DEV_SERVER_URL=
JIRA_AUTOMATION_PRODUCTION_SERVER_URL=
# Legacy fallback only when the selected dev/prod URL is blank.
# JIRA_AUTOMATION_SERVER_URL=
JIRA_AUTOMATION_SERVER_TOKEN=
JIRA_REQUEST_TIMEOUT_MS=15000
JIRA_CREDENTIAL_ENCRYPTION_KEY=
```

Do not prefix these with `NEXT_PUBLIC_`. Production is selected when
`VERCEL_ENV=production` or `NODE_ENV=production`; all other runtimes use the
development automation URL. `JIRA_AUTOMATION_SERVER_URL` remains supported only
as a legacy fallback when the selected URL is missing. `JIRA_REQUEST_TIMEOUT_MS`
defaults to `15000`.

Dashboard list reads use a shorter six-second upstream timeout and do not retry
server-side. The page renders its protected shell first, then shows independent
loading, retry, and warning states for Jira projects and setup summaries.

Jira credential reads use the shared Mongoose connection helper. The helper
caches the connection promise per server instance and accepts optional
`MONGODB_MAX_POOL_SIZE`, `MONGODB_MIN_POOL_SIZE`,
`MONGODB_MAX_IDLE_TIME_MS`, `MONGODB_SERVER_SELECTION_TIMEOUT_MS`,
`MONGODB_CONNECT_TIMEOUT_MS`, and `MONGODB_SOCKET_TIMEOUT_MS` values. These are
server-only settings and should be configured alongside `MONGODB_URI` in the
deployment environment when the Atlas cluster is tuned.

The OpenAI discovery provider is configured on the automation server with `OPENAI_GENERAL_IQ_MODEL` and `OPENAI_HIGH_IQ_MODEL`, not in this Next app. The browser never receives model credentials or backend prompts.

`JIRA_CREDENTIAL_ENCRYPTION_KEY` belongs to this Next app only. It encrypts
Jira credential values stored in MongoDB and is not sent to the automation
server. The automation server receives decrypted Jira values only for a single
server-to-server request through private `X-Jira-*` headers.

`JIRA_CREDENTIAL_ENCRYPTION_KEY` must be a base64-encoded 32-byte key. Generate
one locally or for each deployment environment with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Preview blank Jira credential records for existing users:

```bash
npm.cmd run jira:credentials:seed -- --dry-run
```

Seed blank Jira credential records for existing users. This writes MongoDB and
is never run automatically:

```bash
npm.cmd run jira:credentials:seed
```

Generate encrypted MongoDB CLI update values for one user:

```bash
npm.cmd run jira:credentials:encrypt -- --user-id=<userId> --site-url=https://example.atlassian.net --email=admin@example.com --api-token=<token> --account-id=<accountId>
```

## Testing

Unit and integration tests:

```bash
npm.cmd test
```

Type check:

```bash
npx.cmd tsc --noEmit
```

Playwright E2E:

```bash
npm.cmd run test:e2e
```

Optional E2E environment:

```env
JIRA_E2E_BASE_URL=http://127.0.0.1:3000
JIRA_E2E_SETUP_ID=
JIRA_E2E_STORAGE_STATE=
JIRA_E2E_UNAUTHORIZED_SETUP_ID=
PLAYWRIGHT_START_SERVER=1
```

The E2E suite is environment-gated. Set `JIRA_E2E_SETUP_ID` and `JIRA_E2E_STORAGE_STATE` to run authenticated discovery flows against a seeded setup. Set `JIRA_E2E_UNAUTHORIZED_SETUP_ID` to verify ownership blocking. `JIRA_E2E_BASE_URL` defaults to `http://127.0.0.1:3000`, and `PLAYWRIGHT_START_SERVER=1` starts the local Next dev server before the tests.

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
