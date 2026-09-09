---
title: "The line-clamp that wasn't: debugging a CSS bug in shadcn/ui"
description: 'A dead Tailwind utility, a flexbox min-width:auto trap, and how compiling the exact class strings proved the root cause before I wrote the fix.'
date: 2026-09-09
tags: [css, tailwind, shadcn, debugging, flexbox]
lang: en
---

Setting a long selected value into a shadcn/ui `Select` with a fixed width makes the text blow straight through the trigger button. Someone had filed [issue #8157](https://github.com/shadcn-ui/ui/issues/8157) with screenshots, a contributor had already "verified" it, and an 11-month-old PR sat unreviewed because it patched the demos instead of the component. This is the story of finding the real root cause in one evening, and the two CSS mechanics hiding under a one-line fix.

## The obvious suspect was wrong

The trigger component styles its value slot like this:

```tsx
className={cn(
  "flex w-fit items-center justify-between gap-2 whitespace-nowrap ...",
  "*:data-[slot=select-value]:line-clamp-1",
  "*:data-[slot=select-value]:flex",
  // ...
)}
```

`line-clamp-1` is right there. Ellipsis should appear. It doesn't. The instinct is to say "Tailwind is broken". Resist that instinct.

## Mechanic #1: the cascade kills the clamp

Both utilities set `display` on the same element:

```css
/* line-clamp-1 (sorted first)  */
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;

/* flex (sorted after) */
display: flex;
```

Same specificity, so **source order wins**, `display: flex` clobbers `display: -webkit-box`, and the clamp silently becomes dead code. Line-clamping in Tailwind only works when no other `display` utility targets the same element.

## Mechanic #2: flex items don't shrink by default

With the clamp dead, the value slot is an ordinary flex item. Flex items have `min-width: auto`: they refuse to shrink below their content's intrinsic width. So the slot stays as wide as "A very long selected framework label", pokes out of the trigger, and the trigger's own `overflow: hidden` guillotines it mid-glyph. No ellipsis, broken layout.

## Proving it without a browser

I had no headless Chrome in that environment, so I proved the mechanism with the **repo's own toolchain** instead: compiled the exact class strings with `@tailwindcss/cli@4.3.0` and read the generated CSS. The output showed the value slot receiving `display: -webkit-box` and then `display: flex`, in that order. Mechanism confirmed deterministically.

You don't always need a browser to verify CSS. You need the compiler and the cascade rules.

## The fix

Let the item shrink, and the _existing_ `overflow: hidden` (from the clamp utility) contains it again, and when `-webkit-box` is in effect (user overrides `flex`), the ellipsis finally works:

```diff
  "*:data-[slot=select-value]:line-clamp-1",
  "*:data-[slot=select-value]:flex",
+ "*:data-[slot=select-value]:min-w-0",
  "*:data-[slot=select-value]:items-center",
```

I deliberately did **not** add `flex-1`; that would change spacing behavior in triggers with multiple value-slot children. Minimal diff, no behavioral surprises: default `w-fit` triggers don't change at all, because they already size to content.

The change went into all four registry sources ([PR #11832](https://github.com/shadcn-ui/ui/pull/11832)), the Combobox demo got a `<span className="truncate">`, and the PR body walked through the cascade proof so reviewers wouldn't have to re-derive it.

## Lessons

1. **Two utilities, one property, equal specificity → later wins.** Utility classes are just CSS; Tailwind's class sorting has opinions about order.
2. **`min-width: auto` is the default for flex items**: `min-w-0` is the escape hatch. This trap is decades old and still bites.
3. **Dead code lies.** `line-clamp-1` looked correct and did nothing. Verify behavior, not presence.
4. **Patch the component, not the demo.** The earlier PR fixed example files; every user who copied the real component stayed broken. Fixes belong at the class of failure.
5. **Compile your assumptions.** Ten minutes with the actual Tailwind build beats an hour of guessing.
