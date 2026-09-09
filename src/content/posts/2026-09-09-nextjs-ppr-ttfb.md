---
title: '800ms to 50ms: what PPR actually changed'
description: "First instinct: cache the API harder. The TTFB didn't move. The page never needed to be built at request time."
date: 2026-09-09
tags: [nextjs, performance, ppr, streaming]
lang: en
---

A page on one of my projects had a TTFB around 800ms.

First instinct: the API was slow. So I cached harder. Memoized, pre-warmed, tuned revalidation.

The TTFB didn't move.

## The problem wasn't the data. It was the shape of the page.

One slow data fetch was pinning the whole response. Server waits for fetch, waits for render, then sends one HTML string. Everyone waits for the slowest part before seeing anything.

800ms of that, every request.

## The mechanism, one line each

PPR (Partial Prerendering) splits the page at Suspense boundaries.

The static shell gets prerendered at build time and served instantly.

Dynamic holes stream into that shell as their data resolves.

The slow fetch no longer blocks the page. It blocks only its own hole.

## The numbers

TTFB: 800ms to under 50ms.

The dynamic section still takes exactly as long as it took. Same fetch, same latency.

Nobody perceives it. The shell is interactive, the Skeleton holds the hole, and the data lands when it lands.

## The rules I ship with now

1. Under 100ms: state feels instant. Above that, you owe the user a Skeleton.
2. A Suspense boundary is a deployment unit of slowness. Place them where the waiting should live.
3. Cache data with intent. Cache the shell with PPR. They solve different problems.
4. Measure TTFB and the stream separately. One number hides the other.

## The reframe

First question for any slow page: did it ever need to be built at request time?

For most marketing-grade surfaces, the honest answer is no. Static shell, streamed holes, and the slow part stops being everyone's problem.

Migration notes and the actual diff are on the repo. Full breakdown coming to this blog.
