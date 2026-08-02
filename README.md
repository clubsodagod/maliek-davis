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

Copy `.env.example` for local development and fill in the values needed for the features you are running.

Jira automation server values are server-only and must not use `NEXT_PUBLIC_`:

```env
JIRA_AUTOMATION_DEV_SERVER_URL=
JIRA_AUTOMATION_PRODUCTION_SERVER_URL=
JIRA_AUTOMATION_SERVER_TOKEN=
JIRA_REQUEST_TIMEOUT_MS=15000
```

The OpenAI discovery provider is configured in the separate Jira automation server project with `OPENAI_GENERAL_IQ_MODEL` and `OPENAI_HIGH_IQ_MODEL`, not in this Next.js app.

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
