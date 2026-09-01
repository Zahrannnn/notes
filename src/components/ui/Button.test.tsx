import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a native button and handles clicks', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies the selected variant', () => {
    render(<Button variant="secondary">Cancel</Button>);

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass('border-slate-300');
  });

  it('renders asChild by cloning the child element', () => {
    render(
      <Button asChild>
        <a href="/docs">Documentation</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link).toHaveClass('bg-brand-600');
  });
});
