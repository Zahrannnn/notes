# Design System — mzahran.tech family

Companion to PRODUCT.md. Sections 1–9 describe the **portfolio (mzahran.tech) system**, extracted from its code. The final section, **Adaptation for notes.mzahran.tech**, defines how this blog draws from that system. Keep this file updated alongside visual changes.

## 1. Principles

- Type-led editorial: Amiamie display type and huge scale do the design work; decoration is minimal.
- Alternating light/dark chapters: sections alternate between warm off-white (--color-primary) and black, each with rounded top corners — a recurring "page turn" rhythm.
- One accent: gold (#cfa355) is the only accent color — dashes, pins, counters, icons, progress.
- Transform-only motion: GSAP drives everything; only transform and opacity animate.
- Reduced motion is a first-class mode: every animated section branches via gsap.matchMedia() and (prefers-reduced-motion).

## 2. Color

| Token               | Value                                                        | De-facto usage                                                                  |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| --color-primary     | #e5e5e0                                                      | Light chapter background (body default), resume paper cards use #f7f7f2         |
| Ink / text on light | black                                                        | Body default                                                                    |
| Text on dark        | white with opacity steps (/90 · /60 · /55 · /45 · /40 · /35) | Dark chapters; white/25 hairlines                                               |
| --color-gold        | #cfa355                                                      | The single accent: dashes, pins, counters, quote glyphs, focus rings, star icon |
| --color-DarkLava    | #393632                                                      | Dark warm gray (404 page text, ghost text stroke)                               |
| --color-SageGray    | #8b8b73                                                      | 404 page accents                                                                |
| Paper               | #f7f7f2                                                      | Resume card surface                                                             |

Section ink rules: light chapters use text-black (+ black/45–55 secondary), dark chapters use text-white (+ white/40–60).

## 3. Typography

| Family                          | Usage                                          |
| ------------------------------- | ---------------------------------------------- |
| Amiamie (300/400/900 + italics) | Display, quotes, titles, body on the portfolio |
| Amiamie Round (400)             | Counters, small labels, tabular numbers        |
| Rowdies (Google Fonts)          | 404 page only                                  |

Scale & case: kickers/labels wide-tracked (0.25–0.5em) uppercase 9–12px; chapter titles uppercase 68→152px; quotes sentence-case in Light weight.

## 4. Layout rhythm (portfolio)

Single page; chapters alternate light/dark, each cutting into the previous with rounded-t-4xl. Never two same-color rounded sections adjacent. px-10 gutters.

## 5. Radius & elevation

Sections rounded-t-4xl; cards rounded-xl; pills rounded-full. Shadows deep on dark (0_30px_80px_-20px rgba(0,0,0,.7) class). Hairlines 1px black/15 or white/15.

## 6. Motion system (portfolio)

GSAP 3.15 + ScrollTrigger + SplitText, useGSAP scoped, gsap.matchMedia() for reduced motion. Ease vocabulary: circ.out (header rise), power3.out (reveals), power2.inOut (flips), back.out(1.15–2.5) (pops), none (scrubs), sine.inOut (idle float). Hover sweep: origin-left scale-x layer, text inverts.

## 7. Component recipes (portfolio)

Chapter header (kicker + split-word title + right-aligned description), kinetic scrubbed lines, works rows with floating previews, quote lines with gold attribution, paper resume card with 3D tilt, macOS PDF window, ink-fill pills, ghost outline type at 10–24vw.

## 8. Iconography & assets

Iconify at runtime (mdi:star-four-points brand glyph, lucide set). Favicon: inline SVG "MZ" monogram (gold on black).

## 9. Copy conventions

- Kickers/labels: uppercase, wide tracking, short fragments.
- No em dashes anywhere. Commas, colons, periods, parentheses.
- Counters: zero-padded tabular (01 / 12).

---

## 10. Adaptation for notes.mzahran.tech (this repo)

The blog inherits the family identity but is a **reading surface**, not a marketing page. What carries over and what deliberately differs:

### Inherited

- **Gold (#cfa355) is the single accent**: tags, links, focus rings, hover states. Replaces the earlier sky-blue.
- **Gold-ink (#8a6420)** is the light-mode variant of the accent (gold on white fails contrast for text); dark mode uses pure gold.
- **No em dashes** in any UI copy or post prose.
- Dark-first feel with a proper light mode; both themes are first-class.
- "MZ monogram, gold on black" favicon family; ↗ for external links.

### Deliberately different (reading surface)

- **Body/prose type stays Inter** (not Amiamie): long-form legibility beats brand display type. Amiamie is a display face licensed to the portfolio; do not pull it here.
- **Measure capped at ~72ch** for post bodies (`max-w-[72ch]`), softer than the portfolio's full-bleed chapters.
- **No GSAP/chapter machinery**: motion is limited to color/underline transitions and the boilerplate PageTransition, all reduced-motion safe.
- **Code blocks stay dark in both themes** (github-dark-default Shiki theme): intentional editor-adjacent contrast inside light pages; not a bug.
- Neutrals: slate scale (cool) rather than the portfolio's warm off-white/black chapters; the gold accent ties the family together.

### Tokens (src/styles/index.css @theme)

| Token            | Value                     | Usage                                               |
| ---------------- | ------------------------- | --------------------------------------------------- |
| --color-gold     | #cfa355                   | Accent in dark mode                                 |
| --color-gold-ink | #8a6420                   | Accent in light mode (AA-safe on light backgrounds) |
| --focus-ring     | gold-ink / gold via .dark | :focus-visible outline                              |

### Component rules

- Tag pills: `.tag-pill` component class (gold-ink/light, gold/dark, border + tinted bg + hover).
- Prose: `.prose-notes` is fully theme-aware via CSS variables (text, headings, lines, links, code bg, quotes) keyed on `html.dark`.
- Headings/meta on pages must always pair light+dark classes (`text-slate-950 dark:text-slate-50` pattern). A bare `text-slate-50` heading is a bug — it vanishes in light mode.
