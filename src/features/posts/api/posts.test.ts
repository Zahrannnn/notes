import { describe, expect, it } from 'vitest';
import { getPostMetas } from './posts';

describe('content pipeline', () => {
  it('discovers markdown posts', () => {
    const metas = getPostMetas();
    console.log(
      'POST COUNT:',
      metas.length,
      metas.map((m) => m.slug),
    );
    expect(metas.length).toBeGreaterThan(0);
    expect(metas.map((m) => m.slug)).toContain('2026-09-09-shadcn-select-overflow');
    expect(metas.map((m) => m.slug)).toContain('2026-09-09-nextjs-ppr-ttfb');
  });
});
