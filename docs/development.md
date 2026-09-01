# Development

## Local setup

```bash
nvm use            # Node 22 (.nvmrc)
npm install
cp .env.example .env
npm run dev
```

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b` type-check + production build
- `npm run preview` — preview the production build
- `npm run lint` — ESLint (typescript-eslint, jsx-a11y, react-hooks, prettier)
- `npm run format` / `npm run format:check` — Prettier
- `npm run typecheck` — project-references type check
- `npm run test` / `npm run test:run` — Vitest watch / single run
- `npm run verify` — lint + typecheck + tests + build (the handoff gate)
- `npm run feature -- <name>` — scaffold `src/features/<name>/`

## Environment

`.env.example` is the canonical contract; copy it to `.env`. `VITE_*` vars are
validated by `src/config/env.ts` at import time. Set `VITE_ENABLE_AXE=true`
to run axe accessibility checks in dev. Never store secrets in `VITE_*` — see
`SECURITY.md`.

## Feature workflow

1. `npm run feature -- <name>` — scaffold the module.
2. Add route constants in `src/app/router/routes.ts` and wire the page in
   `src/app/router/router.tsx` (lazy import).
3. Add API modules in `features/<name>/api`, Query hooks in `hooks/`, schemas
   in `validations/`.
4. Export the public surface from `features/<name>/index.ts`.

## Testing

Unit/component tests run on Vitest + Testing Library + jsdom
(`vitest.config.ts`, `vitest.setup.ts`). Colocate tests next to the file under
test with a `.test.ts(x)` suffix. Reference examples:

- `src/lib/fileTransfer.test.ts` — pure utility tests
- `src/components/ui/Button.test.tsx` — rendering + interaction tests

E2E: install Playwright per project when browser coverage is needed.

## Git hooks

Husky pre-commit runs lint-staged: ESLint --fix and Prettier on staged
`ts/tsx`, Prettier on staged `js/mjs/json/css/md`. The hook activates after
`npm install` in a git-initialized clone.

## Docker

```bash
make env       # create .env from .env.example (first time)
make build     # build the image
make up        # start (regenerates runtime env from container env)
make restart   # restart (regenerates runtime env)
make logs      # tail logs
make clean     # stop and remove the image
```

Build: `node:22-alpine` + `npm ci`; runtime: `nginx:1.27-alpine` with gzip,
SPA fallback, immutable asset caching, and security headers. On start, the
container rewrites `/usr/share/nginx/html/env.js` from its environment, so
changing `VITE_*` in `.env` + `make up` reconfigures the app without a rebuild.

## CI

`.gitlab-ci.yml` runs `test_app` (`npm ci` + `npm run verify` on
node:22-alpine with an npm cache) and `build_image` (docker build; pushes to
`$HUB_URL/$APP_NAME:$APP_VERSION` on the default branch or tags).
