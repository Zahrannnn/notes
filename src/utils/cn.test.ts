import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins class names and skips falsy values', () => {
    expect(cn('a', undefined, null, 'c')).toBe('a c');
  });

  it('lets later Tailwind classes win conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('keeps unrelated classes from different groups', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });
});
