# setup-vite Agent Workflow

## Before Editing

- Read `README.md`, `docs/architecture.md`, and `docs/development.md`.
- Check existing feature ownership before creating shared code.
- Treat this repo as feature-first: `src/features/<feature>` owns its UI, hooks,
  API boundaries, constants, validations, utilities, and types.

## Implementation Rules

- Keep route files in `src/pages` thin; they compose feature exports.
- Cross-feature imports go through each feature `index.ts`.
- Put UI primitives in `src/components/ui`, styled with Tailwind `dark:`
  variants; compose with `cn()` from `src/utils/cn.ts`.
- Put cross-feature infrastructure in `src/lib`, `src/hooks`, `src/utils`.
- Components inside `features/*/components` should be presentational unless
  they are the feature shell.
- Use Axios for REST transport and TanStack Query for server state.
- Wrap mutations in feature hooks that standardize toasts and invalidation —
  never call `useMutation` raw inside presentational components.
- Use React Hook Form + Zod for forms.
- Use Redux Toolkit only for durable client app state.
- Keep WCAG 2.2 AA basics: labels, focus visibility, keyboard access, semantic
  regions, contrast, and reduced motion.
- New env vars: add to `.env.example`, document in `README.md`, validate in
  `src/config/env.ts`.

## Feature Creation

- Prefer the CLI: `npm run feature -- <name>`.
- The CLI refuses existing feature names.
- Keep the generated skeleton until real files replace `.gitkeep`.
- Export only intentional public APIs from `index.ts`.

## Verification

- Run `npm run verify` before claiming implementation is complete.
- Run `npm run lint` when lint-sensitive files change.
- If Docker, nginx, or CI files change, explain whether Docker validation was run.
- Docker base images are pinned (`node:22-alpine` build, `nginx:1.27-alpine`
  runtime) and must stay pinned; keep `npm ci` in the build stage.
