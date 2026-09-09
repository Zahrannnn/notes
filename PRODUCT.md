# PRODUCT.md — notes.mzahran.tech

## Users

- **Primary:** Egyptian & MENA junior/mid frontend developers (some prefer Arabic) who arrive from Google, LinkedIn, or GitHub links to a specific debugging story. They scan for: does this post give me the root cause and the fix? Many read on phones.
- **Secondary:** International developers and hiring managers evaluating Mohamed's engineering communication; recruiters following links from his resume/portfolio.

## Product Purpose

A personal engineering notebook (blog) for Mohamed Osama Zahran: real debugging stories, CSS/UI mechanics, and open-source journeys. Each post = a real incident with the actual root cause and actual fix. It exists to (a) teach mechanics through war stories, (b) build Mohamed's public engineering reputation, (c) mirror his work in EN + AR (Egyptian-market audience + international reach).

## Brand & Tone

- Voice: first-person engineer telling a war story. Plain-spoken, precise, a little dry humor. Reads like a message from a senior colleague, not a course or a content-farm article.
- Every claim is earned: real incidents, real links (issues, PRs), no invented metrics. "Here's what happened, here's the mechanism, here's the fix."
- Anti-references (what this must NOT look/sound like):
  - Dev.to / Medium content-farm template (generic hero, "🚀 10 Tips", emoji headers, "In today's fast-paced world…")
  - AI-slop purple-gradient SaaS landing styling
  - Corporate-doc tone ("We are pleased to announce")
  - Em dashes anywhere in the UI copy or post prose
- The blog's own design should feel like the writing: dark editor-adjacent quiet, typography-led, no decoration that doesn't inform.

## Register

product (a reading surface in service of the writing; design serves the text, brand comes from restraint + typography, not decoration)

## Strategic Principles

1. **Reading experience is the product.** Max ~70ch measure, comfortable line height, code that doesn't break layout, zero mid-read clutter.
2. **EN + AR as first-class citizens.** Arabic posts are not an afterthought: real RTL layout, `ar-EG` dates, no "translated by machine" feel.
3. **Craft = credibility.** A frontend engineer's blog must itself demonstrate frontend craft: a11y (WCAG 2.2 AA), no-flash theming, fast loads, semantic HTML. The site is the portfolio piece.
4. **No content-farm patterns.** No related-posts carousels, no newsletter nag, no fake engagement CTAs. giscus comments are the only social layer.
5. **Maintenance honesty.** Infrastructure stays boring: `npm run verify` green before anything ships, pinned images, feature-first architecture per AGENTS.md.
