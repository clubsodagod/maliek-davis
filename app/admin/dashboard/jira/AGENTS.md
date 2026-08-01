# Jira Dashboard Development Instructions

## Scope

These instructions apply to:

`app/admin/dashboard/jira/**`

This feature is a protected Jira Setup Studio within the existing `maliek-davis.com` admin dashboard. It supports creating, validating, previewing, executing, and tracking Jira project setups.

The primary hierarchy is:

`Project -> Workstream -> Task -> Subtask`

The frontend uses:

- Next.js App Router
- React
- TypeScript
- Material UI
- Existing application authentication and route protection

Do not introduce a separate authentication system.

## Priorities

Optimize in this order:

1. Correctness and data safety
2. Readability
3. Performance
4. Minimal implementation
5. Reusability

Use the least amount of code needed to express the behavior clearly. Do not introduce abstractions, dependencies, providers, hooks, or components without a demonstrated need.

Follow SOLID and established design principles pragmatically. Simplicity takes priority over theoretical abstraction.

## Directory Responsibilities

### `page.tsx`

Treat route files as composition boundaries.

Route files should:

- Fetch or coordinate route-level data.
- Handle redirects and route parameters.
- Compose feature components.
- Prefer Server Components.
- Pass minimal serializable props into Client Components.

Route files should not contain:

- Large JSX sections.
- Validation schemas.
- General-purpose utilities.
- Complex data transformations.
- Jira request logic.
- Large event handlers.

### `_components`

Store Jira-specific visual components and component building blocks.

Organize larger features by responsibility when needed:

- Registry dashboard
- Project details form
- Creation mode selector
- File dropzone
- Manual bulk editor
- Data previewer
- Validation summary
- Confirmation summary
- Setup progress
- Results and error review

Keep a component local when it has one consumer. Promote it to the shared application component directory only when it has multiple real consumers outside the Jira feature.

Separate a component when it:

- Has an independent responsibility.
- Has meaningful state or behavior.
- Is reused.
- Makes the parent difficult to scan.
- Can be tested independently.

Do not split simple markup into unnecessary wrapper components.

### `_hooks`

Store Jira-specific React hooks.

Hooks may coordinate:

- Form behavior
- Draft autosaving
- Registry queries
- Execution polling
- Preview filters
- Upload state

Hooks must not contain JSX.

Do not create a hook for logic that can remain:

- A local variable
- A pure function
- A server-side operation
- A short event handler

Keep server state, form state, URL state, and temporary UI state separate.

### `_schemas`

Store runtime validation and parsing schemas.

Schemas should:

- Validate at system boundaries.
- Produce useful field-level errors.
- Be reusable by client and server where appropriate.
- Normalize only when normalization is part of the schema's explicit responsibility.
- Infer TypeScript types when doing so avoids duplicate definitions.

Keep source-input validation distinct from normalized Jira request validation.

### `_services`

Store feature-level communication with API routes, server actions, and backend services.

Services should:

- Expose small typed operations.
- Return predictable typed results.
- Translate transport errors into useful application errors.
- Support cancellation through `AbortSignal` when appropriate.

Never expose Jira credentials, authorization headers, or privileged Jira operations to Client Components.

Do not place presentation state or React hooks in services.

### `_theme`

Store Jira-specific MUI theme extensions, tokens, and reusable style definitions.

Use the application theme first. Add Jira-specific tokens only when the existing theme cannot express the design.

Prefer:

- Theme tokens
- MUI variants
- The `sx` prop for local styling
- Shared styled components only when styles are meaningfully reused

Avoid duplicated color values, spacing values, and arbitrary CSS constants.

### `_types`

Store shared Jira feature types and contracts.

Prefer:

- Narrow types
- Discriminated unions
- `unknown` at untrusted boundaries
- Explicit request and response contracts
- Existing shared types when they already model the concept

Avoid:

- `any`
- Broad index signatures
- Duplicate schema and interface definitions
- Types that exist for only one obvious local variable

Keep source data, normalized data, database records, and Jira API payloads as distinct types when their structures or guarantees differ.

### `_utils`

Store small, pure Jira-specific functions.

Utilities should:

- Have no React dependencies.
- Avoid hidden mutation.
- Produce deterministic output.
- Have focused inputs and outputs.
- Be easy to test.

Keep one-use transformations close to their consumer unless extracting them materially improves readability.

### `new`

Own the new setup workflow:

- Project details
- Creation mode
- Manual data entry or file upload
- Validation
- Preview
- Confirmation
- Draft persistence

Create the database draft early enough to support autosave and resume.

### `setups`

Own saved setup and execution workflows:

- Setup registry
- Setup details
- Resume
- Preview
- Execution progress
- Results
- Error inspection
- Retry and recovery

Prefer dynamic routes such as:

- `setups/[setupId]`
- `setups/[setupId]/preview`
- `setups/[setupId]/run`
- `setups/[setupId]/results`

Use the URL for shareable navigation state such as setup IDs, filters, tabs, and wizard steps.

## Core Product Requirements

Support:

- Project details forms
- Full project setup mode
- Workstream bulk creation
- Task bulk creation
- Subtask bulk creation
- Issue-link creation
- Drag-and-drop uploads
- Formatted data previews
- Hierarchical previews
- Validation feedback
- Execution status and progress
- Database-backed setup registry
- Resume and retry behavior

Initially prefer JSON uploads because JSON preserves hierarchical relationships. Add CSV or XLSX only when required.

Treat the saved setup registry as the source of truth. Do not rely on browser state as the only copy of setup or execution data.

## Component and Rendering Rules

Use Server Components by default.

Add `"use client"` only when a component requires:

- Browser APIs
- User interaction
- React state or effects
- Client-only libraries

Keep Client Component boundaries as low in the tree as practical.

Do not mark an entire route as a Client Component because one nested control is interactive.

Use semantic HTML through MUI's `component` prop where appropriate.

Ensure interactive elements support:

- Keyboard navigation
- Visible focus
- Accessible labels
- Useful error messaging
- Loading and disabled states

## Performance Rules

Before optimizing, identify the actual render, network, parsing, or bundle-size problem.

Prefer:

- Server-side fetching
- Route-level code splitting
- Dynamic imports for heavy preview or editor libraries
- Pagination or virtualization for large registries and datasets
- Debounced draft persistence
- Incremental progress updates
- Derived values instead of duplicated state
- Stable primitive props
- Direct imports when they reduce bundle size

For large Jira datasets:

- Do not render every expanded record initially.
- Default hierarchy nodes to collapsed.
- Paginate or virtualize long collections.
- Parse and validate large files outside the render path.
- Avoid repeatedly serializing the entire dataset.
- Do not store duplicate raw and derived values in component state.
- Avoid performing expensive transformations on every render.

Use `useMemo`, `useCallback`, and `React.memo` only when they address a measurable or structurally likely performance issue. Do not apply them mechanically.

Avoid unnecessary `useEffect`. Prefer event-driven updates, derived state, server operations, and query callbacks.

## Forms and Validation

Use one authoritative schema for each data boundary.

Forms should provide:

- Inline field errors
- Clear blocking errors
- Non-blocking warnings
- Accessible error summaries
- Preservation of valid user input
- Explicit submission states

Do not place the entire bulk dataset into a form library if it causes unnecessary rerenders. Keep large imported datasets in a dedicated data layer and use forms for editable metadata or focused record editing.

Validate files before processing:

- Supported type
- File size
- Parseability
- Expected top-level shape
- Required identifiers
- Parent relationships
- Duplicate references
- Link integrity

Never silently discard invalid records.

## Status and Progress

Model statuses as a discriminated union rather than free-form strings.

Account for at least:

- `draft`
- `validating`
- `ready`
- `queued`
- `running`
- `partially_completed`
- `blocked`
- `failed`
- `completed`
- `cancelled`

Use `blocked` for recoverable conditions requiring user action. Use `failed` for operations that ended because of an execution or system error.

Progress displays should use server-persisted execution state and include:

- Current stage
- Completed count
- Total count
- Failed count
- Skipped count
- Overall percentage
- Current operation
- Retry availability

Prefer polling for the first implementation unless the existing application already provides a reliable live-update system.

## Data Safety

The browser must never communicate directly with privileged Jira endpoints.

Send execution commands through protected server actions or API routes.

Before creating Jira records:

- Validate the normalized payload.
- Show a confirmation summary.
- Make the side effect explicit.
- Preserve the submitted input.
- Save progress incrementally.
- Record created Jira keys and IDs.
- Make retries idempotent where possible.

A retry must not recreate successful Jira issues unintentionally.

## TypeScript

Enable and preserve strict typing.

Avoid:

- `any`
- Unsafe type assertions
- Non-null assertions used to bypass uncertain state
- Duplicated string literals
- Oversized types containing unrelated states

Use exhaustive checks for modes, statuses, stages, and validation issue types.

Validate external data at runtime before treating it as a trusted TypeScript type.

## MUI

Use existing shared MUI components and application patterns before creating Jira-specific replacements.

Prefer standard MUI primitives for:

- Forms
- Tables
- Progress indicators
- Alerts
- Dialogs
- Tabs
- Navigation
- Responsive layout

Do not create wrapper components that only rename a MUI prop or render one unchanged MUI component.

Avoid deeply nested `Box` components when semantic elements or simpler layout primitives can express the same structure.

## Documentation

Add JSDoc to exported functions, hooks, utilities, services, schemas, and non-obvious component APIs when it adds useful context.

Document:

- Purpose
- Parameters with `@param`
- Return value with `@returns`
- Important side effects
- Error behavior
- Data assumptions
- Non-obvious performance decisions

Example:

```ts
/**
 * Calculates execution progress from persisted setup counts.
 *
 * @param completed - Number of successfully completed operations.
 * @param failed - Number of failed operations.
 * @param total - Total number of scheduled operations.
 * @returns A percentage between 0 and 100.
 */
export function calculateProgress(
  completed: number,
  failed: number,
  total: number,
): number {
  if (total === 0) return 0;

  return Math.min(100, ((completed + failed) / total) * 100);
}
```

Do not comment every line.

Explain code that is not immediately clear, especially:

- Jira-specific business rules
- Parent-resolution behavior
- Retry and idempotency logic
- Normalization decisions
- Status transitions
- Performance-sensitive implementation
- Unusual MUI or Next.js behavior

Comments should explain why the code exists or why an approach was chosen. Do not restate what clearly written code already says.

## Refactoring Rules

Before changing code:

1. Inspect the route and its local dependencies.
2. Search for existing shared components, hooks, types, schemas, and utilities.
3. Identify server and client boundaries.
4. Identify existing project conventions.
5. Preserve behavior unless the task explicitly changes it.

During implementation:

- Make the smallest coherent change.
- Reuse existing code where it genuinely fits.
- Keep related code close together.
- Remove dead code introduced or exposed by the change.
- Do not perform unrelated repository-wide refactors.
- Do not add a dependency for behavior that can be implemented clearly with the existing stack.

After implementation:

1. Run the relevant formatter.
2. Run TypeScript checks.
3. Run linting.
4. Run focused tests.
5. Verify loading, empty, success, blocked, and failure states.
6. Report assumptions and anything that could not be verified.

## Testing Priorities

Prioritize tests for:

- Schema validation
- Data normalization
- Parent-child resolution
- Duplicate detection
- Progress calculations
- Status transitions
- Retry and idempotency behavior
- Upload parsing
- Execution service contracts

Test behavior rather than implementation details.

## Decision Standard

When multiple solutions are valid, choose the one that:

- Uses fewer concepts.
- Produces less client-side JavaScript.
- Keeps privileged logic on the server.
- Avoids duplicated state.
- Is easiest to understand and maintain.
- Preserves a clean path for future bulk-data growth.

If requirements materially affect data shape, routing, persistence, or Jira side effects, ask focused clarification questions before implementing.
