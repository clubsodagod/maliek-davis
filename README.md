# Maliek Davis Website

Next.js application for the Maliek Davis personal website, admin dashboard, content tooling, and integrated business automations.

## What This App Includes

- Public website and branded content experiences.
- Protected admin dashboard surfaces.
- Jira Setup Studio for creating, validating, previewing, running, and reviewing Jira project setup workflows.
- Server-side integrations for authentication, MongoDB-backed data, email, media, Stripe, and Jira automation server calls.

For Jira Setup Studio implementation details, routes, environment variables, and testing notes, see `app/admin/dashboard/jira/README.md`.

## Tech Stack

- Next.js 15, React 19, and TypeScript.
- Material UI, Tailwind CSS, Motion, and Three.js-related rendering packages.
- MongoDB/Mongoose for persistence.
- NextAuth/Auth.js for authentication.
- Vitest for unit and integration tests.
- Playwright for optional Jira E2E coverage.

## CSS Performance Case Study: Jira Setup Studio

The Jira Setup Studio started with repeated `sx` objects inside each dashboard
component. Those objects mixed layout with visual skinning: colors, gradients,
glass panels, custom borders, and one-off text tones. That made the components
harder to scan and encouraged Emotion to generate repeated CSS for the same
surface patterns.

The refactor keeps component files focused on structure. Local `sx` should be
reserved for layout decisions such as grid columns, gaps, spacing, flex
behavior, sizing, overflow, and responsive alignment. Visual color decisions
inherit from the application theme instead of being restated in Jira components.

Reusable Jira structure lives in `app/admin/dashboard/jira/_theme`. The scoped
theme exports a tiny semantic class vocabulary for panels, interactive panels,
empty states, choice cards, accordions, drop zones, JSON previews, hierarchy
branches, and progress density. These classes avoid a utility sprawl while
letting common CSS be emitted once under the Jira route shell.

Future UI refactors should follow this order:

1. Prefer MUI component props and the application theme.
2. Keep route-specific layout close to the component that owns the layout.
3. Promote only repeated structural styles to `_theme`.
4. Avoid hardcoded colors, decorative gradients, and per-render dynamic CSS.
5. Measure bundle, render, and CSS output before adding heavier abstractions.

## Environment

Copy `.env.example` for local development and fill in the values needed for
the features you are running. Do not commit real `.env` files or generated
secrets.

Core app values:

```env
AUTH_SECRET=
MONGODB_URI=
```

Optional MongoDB connection tuning values are shared with the Jira automation
backend defaults:

```env
MONGODB_MAX_POOL_SIZE=20
MONGODB_MIN_POOL_SIZE=0
MONGODB_MAX_IDLE_TIME_MS=60000
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000
MONGODB_CONNECT_TIMEOUT_MS=10000
MONGODB_SOCKET_TIMEOUT_MS=45000
```

The app caches the Mongoose connection promise per server instance so repeated
server actions and API routes reuse the same pool instead of opening a new
connection path for each Jira credential or content request.

Public URL helpers read these values:

```env
NEXT_PUBLIC_NODE_ENV=development
NEXT_PUBLIC_DEVELOPMENT_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_TEST_URL=
NEXT_PUBLIC_PRODUCTION_URL=
NEXT_PUBLIC_DEVELOPMENT_API_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_TEST_API_URL=
NEXT_PUBLIC_PRODUCTION_API_URL=
```

Jira automation server values are server-only and must not use
`NEXT_PUBLIC_`:

```env
JIRA_AUTOMATION_DEV_SERVER_URL=
JIRA_AUTOMATION_PRODUCTION_SERVER_URL=
# JIRA_AUTOMATION_SERVER_URL=
JIRA_AUTOMATION_SERVER_TOKEN=
JIRA_REQUEST_TIMEOUT_MS=15000
JIRA_CREDENTIAL_ENCRYPTION_KEY=
```

`JIRA_AUTOMATION_SERVER_URL` is a legacy fallback when the selected dev or
production URL is blank. `JIRA_REQUEST_TIMEOUT_MS` defaults to `15000`.
The Jira dashboard root hydrates project and setup-summary lists after the
protected shell renders; those list reads use a six-second upstream timeout so a
slow automation server returns an in-page warning instead of blocking the route.
`JIRA_CREDENTIAL_ENCRYPTION_KEY` must be a base64-encoded 32-byte key for
encrypting Jira credentials stored in MongoDB:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

The OpenAI discovery provider is configured in the separate Jira automation server project with `OPENAI_GENERAL_IQ_MODEL` and `OPENAI_HIGH_IQ_MODEL`, not in this Next.js app.

Jira setup runs use per-admin Jira credentials stored encrypted in MongoDB. Use
`npm.cmd run jira:credentials:seed -- --dry-run` to preview blank records,
`npm.cmd run jira:credentials:seed` to create blank records for existing users,
and `npm.cmd run jira:credentials:encrypt -- --user-id=<userId> --site-url=<url> --email=<email> --api-token=<token> --account-id=<accountId>`
to generate safe MongoDB CLI update values.

Other integration values:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_RESEND_API_KEY=
NEXT_PUBLIC_TINY_MCE_API_KEY=
```

The current codebase still reads Resend and one Cloudinary secret through
`NEXT_PUBLIC_` names for compatibility. Keep only placeholders in
`.env.example`; moving those secrets behind server-only names should be handled
as a separate hardening change.

Optional Jira Playwright E2E values:

```env
JIRA_E2E_BASE_URL=http://127.0.0.1:3000
JIRA_E2E_SETUP_ID=
JIRA_E2E_STORAGE_STATE=
JIRA_E2E_UNAUTHORIZED_SETUP_ID=
PLAYWRIGHT_START_SERVER=1
```

## Install

```bash
npm install
```

## Development

```bash
npm.cmd run dev
```

On shells where `npm` is available directly, `npm run dev` is equivalent.

## Build And Run

```bash
npm.cmd run build
npm.cmd run start
```

## Test

```bash
npm.cmd test
npx.cmd tsc --noEmit
```

Playwright E2E tests are available with:

```bash
npm.cmd run test:e2e
```

The Jira E2E suite is skipped unless the required seeded setup and storage-state environment variables are provided.
