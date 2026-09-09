import { describe, expect, it } from 'vitest';
import { findTwinSlug } from '../twinSlugs';

describe('findTwinSlug', () => {
  const slugs = [
    '2026-09-09-shadcn-select-overflow',
    '2026-09-09-shadcn-select-overflow-ar',
    '2026-09-09-nextjs-ppr-ttfb',
    '2026-09-09-nextjs-ppr-ttfb-ar',
  ];

  it('links EN post to its AR twin', () => {
    expect(findTwinSlug('2026-09-09-nextjs-ppr-ttfb', slugs)).toBe('2026-09-09-nextjs-ppr-ttfb-ar');
  });

  it('links AR post back to its EN twin', () => {
    expect(findTwinSlug('2026-09-09-nextjs-ppr-ttfb-ar', slugs)).toBe('2026-09-09-nextjs-ppr-ttfb');
  });

  it('returns undefined when no twin exists', () => {
    expect(findTwinSlug('2026-09-09-solo-post', slugs)).toBeUndefined();
    expect(findTwinSlug('2026-09-09-solo-post-ar', slugs)).toBeUndefined();
  });
});
