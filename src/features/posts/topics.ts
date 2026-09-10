/**
 * Editorial topic tracks — what the blog covers and where it's heading.
 * "Trending" topics the author is actively learning get pinned to the top of
 * the home page even before they have posts, so the roadmap is public.
 * A pinned topic graduates out of `pinned` once it has 2+ published posts.
 */

export type Topic = {
  tag: string; // must match the post tags exactly (lowercase on tag pages)
  label: string;
  description: string;
  pinned?: boolean; // learning-in-progress: show even with 0 posts
};

export const TOPICS: Topic[] = [
  {
    tag: 'agentic-frontend',
    label: 'Agentic Frontend',
    description:
      'UI plans, streaming UI, agent-owned interfaces — what I am learning right now, in public.',
    pinned: true,
  },
  {
    tag: 'css',
    label: 'CSS Mechanics',
    description: 'Cascade, flexbox traps, and the why behind the fixes.',
  },
  {
    tag: 'performance',
    label: 'Performance',
    description: 'TTFB, streaming, and the numbers behind perceived speed.',
  },
  {
    tag: 'shadcn',
    label: 'shadcn/ui',
    description: 'Contributing to the component layer everyone ships.',
  },
];

export function getTrendingTopics(): Topic[] {
  return TOPICS.filter((t) => t.pinned);
}
