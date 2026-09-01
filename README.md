<div align="center">
  <img src="public/favicon.svg" width="72" alt="CORELIA Vite Starter logo" />
  <h1>CORELIA Vite Starter</h1>
  <p>A Vite + React starter for CORELIA apps that don't need a server.</p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white" alt="Vitest 4" />
  <img src="https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white" alt="Node 22" />
</p>

Features live in folders, forms are validated with Zod, tests and Docker and CI
are already wired up. When a project does need SSR, use the
`corelia-next-boilerplate` template instead: the conventions match, so moving
between the two is not a rewrite.

## What's inside

- Vite 8 and React 19 on strict TypeScript, with `@/` imports and project references.
- Feature folders under `src/features/<name>` that own their API calls, hooks, UI, and schemas. A scaffolder creates new ones: `npm run feature -- <name>`.
- Zod at the edges. Env vars and forms are validated, and Axios errors reach components as one plain `ApiError` shape instead of leaking Axios internals.
- Light, dark, and system themes with no flash on load. Tailwind v4 with CVA-based primitives.
- Accessibility groundwork: skip links, visible focus, `jsx-a11y` lint rules, optional axe checks in dev.
- Vitest + Testing Library with example tests, husky pre-commit, and a single `npm run verify` gate.
- Deployment defaults: pinned Alpine Docker images, Nginx security headers, runtime env injection, GitLab CI.

## Quick start

```bash
nvm use              # Node 22 (.nvmrc)
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173.

> [!IMPORTANT]
> `.env.example` is the env contract. Nothing that starts with `VITE_` is a
> secret; it all ends up in the browser bundle. Real secrets belong on the
> server. More in [SECURITY.md](SECURITY.md).

## Scripts

| Script                            | Purpose                                      |
| --------------------------------- | -------------------------------------------- |
| `npm run dev`                     | Vite dev server                              |
| `npm run build`                   | Type-check, then production build            |
| `npm run preview`                 | Preview the production build                 |
| `npm run lint`                    | ESLint (typescript-eslint, jsx-a11y, hooks)  |
| `npm run format` / `format:check` | Prettier                                     |
| `npm run typecheck`               | `tsc -b` project-references check            |
| `npm run test` / `test:run`       | Vitest watch / single run                    |
| `npm run verify`                  | lint, typecheck, tests, build in one command |
| `npm run feature -- <name>`       | Scaffold a feature module                    |

Husky runs lint-staged at pre-commit: ESLint --fix and Prettier on staged files.

## Architecture

```text
src/
  app/            # providers, router, store, query client
  components/     # ui primitives, layout, common, feedback
  features/       # domain features, the core of the codebase
  layouts/        # route layouts (App / Auth / Dashboard)
  lib/            # API client, error normalization, file transfer
  pages/          # route pages composed from feature exports
  config/         # env validation
```

A feature keeps its endpoint functions in `api/`, Query hooks in `hooks/`,
Zod schemas in `validations/`, and exports its public surface through one
barrel `index.ts`. Other features import from there and nowhere else. Full
rules in [docs/architecture.md](docs/architecture.md).

### Who owns what

| Concern                         | Owner                                 |
| ------------------------------- | ------------------------------------- |
| Server data                     | TanStack Query (devtools in dev only) |
| Forms                           | React Hook Form + Zod                 |
| State that must outlive a route | Redux Toolkit                         |
| Everything else                 | React local state                     |

Redux is wired up but most screens won't touch it. Start with local state and
Query; promote to Redux only when state genuinely has to survive navigation.

One convention worth keeping: wrap mutations in a feature hook (see
`src/features/auth/hooks/useLoginMutation.ts`) so toasts, redirects, and cache
invalidation stay consistent. Presentational components call the hook, never
`useMutation` directly.

## Environment

```env
VITE_APP_NAME=Vite React TS Starter
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_API_TIMEOUT_MS=10000
VITE_ENABLE_AXE=false
```

Env is checked by Zod at import time and the app refuses to boot on bad values.
In Docker, `env.sh` rewrites `env.js` from container variables at startup, so
changing `VITE_*` in `.env` and running `make up` is enough. No rebuild.

## Deployment

```bash
make env       # create .env from the example, first time only
make build     # build the image
make up        # start, regenerates runtime env
```

The build stage is `node:22-alpine` with `npm ci`; the serving stage is
`nginx:1.27-alpine` with gzip, security headers, and long-lived caching for
hashed assets. Vendor libraries are split into their own chunks so app changes
don't invalidate them.

CI/CD: merge requests run the verify gate. A merge to `main` publishes the
image as an immutable `sha-…` tag and deploys it to production through a
gitlab-runner on the server, followed by a `/healthz` smoke test. Rollback is
one click in GitLab environments. Server and runner setup: [docs/deploy.md](docs/deploy.md).

## Documentation

| Document                                     | Contents                                      |
| -------------------------------------------- | --------------------------------------------- |
| [docs/architecture.md](docs/architecture.md) | Layers, features, shared code, state, theming |
| [docs/development.md](docs/development.md)   | Setup, env, feature CLI, hooks, Docker, CI    |
| [docs/deploy.md](docs/deploy.md)             | Server, runner, and pipeline setup; rollback  |
| [SECURITY.md](SECURITY.md)                   | CSP, XSS, tokens, secrets guidance            |
| [AGENTS.md](AGENTS.md)                       | Workflow rules for agent-assisted edits       |
