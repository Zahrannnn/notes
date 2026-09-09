# notes.mzahran.tech

Engineering notes by **Mohamed Osama Zahran** — debugging stories, open-source journeys,
and frontend mechanics. English + Arabic (RTL). Live at **https://notes.mzahran.tech**.

Built on the [vite-boilerplate](https://github.com/Zahrannnn/vite-boilerplate) with a
content pipeline: **Markdown posts + react-markdown + Shiki + giscus**.

## Write a post

Drop a `.md` file into `src/content/posts/` — the filename is the slug
(e.g. `2026-09-09-shadcn-select-overflow.md` → `/posts/2026-09-09-shadcn-select-overflow`).

Frontmatter (validated at build time — a bad post fails the build loudly):

```markdown
---
title: "The line-clamp that wasn't"
description: 'One-line summary used in lists, meta tags, and previews.'
date: 2026-09-09
tags: [css, tailwind, shadcn]
lang: en # en | ar (ar renders RTL)
---
```

Arabic posts (`lang: ar`) render RTL automatically and get `ar-EG` date formatting.

## Features

- Build-time content pipeline: frontmatter validated with Zod, reading time computed
- Shiki syntax highlighting (lazy-loaded language chunks)
- Tag pages (`/tags/<tag>`), reading time, related posts
- giscus comments (GitHub Discussions) — see "Enable comments"
- Full SEO per page via react-helmet-async
- Dark/light theme with no-flash boot script, WCAG 2.2 AA patterns, reduced-motion aware

## Enable comments (one time)

1. Enable Discussions on this repo + create a **Comments** category
2. Install https://github.com/apps/giscus
3. Generate IDs at https://giscus.app (repo `Zahrannnn/notes`, category `Comments`)
4. Put `VITE_GISCUS_REPO_ID` + `VITE_GISCUS_CATEGORY_ID` in your env (.env / Hostinger env.js)

Until configured, the comments slot shows a hint instead — the site works fine without it.

## Development

```bash
npm install
npm run dev      # local dev
npm run verify   # lint + typecheck + test + build  (required before pushing)
```

## Deploy (Hostinger via git)

1. hPanel → Subdomains → `notes.mzahran.tech`
2. Push `main`, then on the server (or via hPanel Git): clone, `npm ci && npm run build`,
   point the subdomain doc root at `dist/` (nginx config in `nginx.conf` handles SPA
   fallbacks for `/posts/*` routes)
3. Enable SSL

## Architecture

Feature-first (inherited from the boilerplate contract, see `AGENTS.md`):

- `src/features/posts/` — content pipeline (`api/posts.ts`), renderer (`components/`),
  pages (`pages/PostPage`, `pages/TagPage`)
- `src/content/posts/*.md` — the actual posts (source of truth)
- App-only infrastructure (auth/redux/query/api) was stripped for this content site
