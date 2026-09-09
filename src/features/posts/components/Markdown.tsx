import { useMemo } from 'react';
import type { PluggableList } from 'unified';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeShiki from '@shikijs/rehype';
import rehypeSlug from 'rehype-slug';

type MarkdownProps = {
  content: string;
  dir?: 'ltr' | 'rtl';
};

/**
 * Renders post markdown with Shiki (build-time-friendly highlighting via the
 * rehype plugin), GFM tables/checklists, and heading anchors.
 */
export function Markdown({ content, dir = 'ltr' }: MarkdownProps) {
  const rehypePlugins: PluggableList = useMemo(
    () => [
      [rehypeShiki, { theme: 'github-dark-default', addLanguageAnnotation: true }] as const,
      rehypeSlug,
    ],
    [],
  );

  return (
    <div
      dir={dir}
      className="prose-notes"
      // Styles are theme-scoped in prose-notes.css; no inline styling here.
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypePlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
