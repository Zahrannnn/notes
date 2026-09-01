# Architecture

Client-side SPA architecture. Read `README.md` first for the stack overview.

## Top-Level Layout

```text
src/
  app/            # providers, router, store, query client — app wiring
  components/     # ui primitives, layout, common, feedback
  features/       # domain feature modules
  layouts/        # route layouts (AppLayout, AuthLayout, DashboardLayout)
  lib/            # API client, error normalization, file transfer
  pages/          # route pages composed from feature exports
  config/         # env validation
  constants/      # app-wide constants
  hooks/          # cross-feature hooks
  styles/         # Tailwind entry, theme tokens
  types/          # shared TypeScript types
  utils/          # small reusable utilities (cn, formatError)
```

Dependency direction: `app` → `features`/`pages` → shared (`components`,
`lib`, `hooks`, `utils`, `types`). Shared code must never import from
`features/` or `pages/`.

## Feature Modules

Scaffold with `npm run feature -- <name>`. Every feature uses the skeleton:

```text
src/features/<feature>/
  README.md
  types.ts
  index.ts
  api/
  components/
  constants/
  hooks/
  store/
  utils/
  validations/
```

Feature rules:

- Export public APIs through `index.ts`; other features import only from there.
- Keep feature-local types in `types.ts`.
- Put endpoint functions and adapters in `api/`.
- Put TanStack Query hooks and stateful orchestration in `hooks/`. Mutations
  standardize toast feedback and redirect/invalidation (see
  `features/auth/hooks/useLoginMutation.ts`).
- Put presentational UI in `components/`.
- Put Zod schemas in `validations/`.
- Add feature-local Redux state in `store/` only for durable cross-page state.

## Shared Code

Use `src/components`, `src/lib`, `src/hooks`, and `src/utils` only for
genuinely shared code. Do not move feature-specific tables, cards, hooks, or
endpoint functions into shared just because a second feature might someday
need them.

UI primitives in `src/components/ui` are CVA-based and styled with Tailwind
`dark:` variants. Compose pages from primitives plus `Card`, `Badge`, and
`Skeleton`; use `cn()` (`src/utils/cn.ts`) for conditional classes.

## Routing

- `src/app/router/routes.ts` is the single route-constant source.
- `src/app/router/router.tsx` declares the data router with lazy pages and
  `RouteErrorBoundary` per route branch.
- `ProtectedRoute` guards authed branches from Redux auth state and redirects
  to `/login` preserving the origin.
- Top-level render errors outside the router are caught by `ErrorBoundary` in
  `AppProviders`.

## Data And State

- Axios handles REST transport (`src/lib/apiClient.ts`: `apiClient`,
  `createHttpClient`, `getHttpClient` for multi-service apps).
- All request failures are normalized to `ApiError` in `src/lib/apiError.ts`.
- TanStack Query owns server state; defaults live in `src/app/query/client.ts`.
- React Hook Form + Zod own forms.
- Redux Toolkit is available for durable client app state only.
- File uploads/downloads compose `src/lib/fileTransfer.ts` inside feature hooks.

## Environment

`src/config/env.ts` validates env with Zod at import time, merging
`window.__RUNTIME_CONFIG__` (runtime, written by the Docker entrypoint) over
build-time `import.meta.env`. Missing or malformed values fail fast in dev.

## Theming

`ThemeProvider` (light/dark/system) persists to `localStorage`, syncs with
`prefers-color-scheme`, and is applied pre-paint by an inline script in
`index.html`. Tailwind dark mode uses the class strategy
(`@custom-variant dark`). Respect reduced-motion via the global CSS reset.
