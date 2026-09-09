import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Markdown } from './Markdown';

describe('Markdown renderer', () => {
  it('renders fenced code as highlighted HTML (async shiki)', { timeout: 30000 }, async () => {
    const { container } = render(<Markdown content={'```tsx\nconst a = 1\n```'} />);
    await new Promise((r) => setTimeout(r, 8000));
    const pre = container.querySelector('pre');
    expect(pre, container.innerHTML.slice(0, 300)).not.toBeNull();
    // Shiki inlines colors as styles — that is the highlight proof.
    expect(pre?.querySelector('span[style]')).not.toBeNull();
  });

  it('renders plain markdown without fences', async () => {
    const { container } = render(<Markdown content={'# Hello\n\nWorld'} />);
    await new Promise((r) => setTimeout(r, 3000));
    expect(container.querySelector('h1')?.textContent).toBe('Hello');
  });
});
