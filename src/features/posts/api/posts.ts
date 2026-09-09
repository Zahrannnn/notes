import { z } from 'zod';

/**
 * Content module: every .md file under src/content/posts becomes a post.
 * Vite eagerly inlines the raw markdown at build time (query: '?raw'),
 * so metadata for the index is available synchronously and post bodies
 * are code-split only when rendered.
 */

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be YYYY-MM-DD'),
  tags: z.array(z.string()).default([]),
  lang: z.enum(['en', 'ar']).default('en'),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type Post = Frontmatter & {
  slug: string;
  readingTimeMinutes: number;
  body: string;
};

/** Minimal YAML subset: key: value, arrays as [a, b], optional quotes. */
function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { frontmatter: {}, body: raw };
  const body = raw.slice(match[0].length);
  const fm: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([\w-]+):\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      fm[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      fm[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return { frontmatter: fm, body };
}

function readingTimeMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const modules = import.meta.glob<string>('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function buildPosts(): Post[] {
  const posts: Post[] = [];
  for (const [filePath, raw] of Object.entries(modules)) {
    const slug = filePath.split('/').pop()!.replace(/\.md$/, '');
    const { frontmatter, body } = parseFrontmatter(raw);
    const parsed = frontmatterSchema.safeParse(frontmatter);
    if (!parsed.success) {
      // Fail loudly at build/dev time — a malformed post must not ship.
      throw new Error(`Post "${slug}" has invalid frontmatter: ${parsed.error.message}`);
    }
    posts.push({ slug, ...parsed.data, body, readingTimeMinutes: readingTimeMinutes(body) });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const posts: Post[] = buildPosts();

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostMetas(): Omit<Post, 'body'>[] {
  return posts.map((post) => {
    const { body: _body, ...meta } = post;
    void _body;
    return meta;
  });
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  const needle = tag.toLowerCase();
  return posts.filter((p) => p.tags.some((t) => t.toLowerCase() === needle));
}
