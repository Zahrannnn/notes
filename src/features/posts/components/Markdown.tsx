import { useEffect, useState } from 'react';
import { defaultSchema } from 'rehype-sanitize';
import { codeToHtml } from 'shiki';

type MarkdownProps = {
  content: string;
  dir?: 'ltr' | 'rtl';
};

/**
 * Renders post markdown.
 *
 * Why pre-highlighting: react-markdown v10 processes the tree synchronously
 * (unified runSync), while Shiki v4 highlighting is async. Feeding the Shiki
 * rehype plugin into that pipeline throws "`runSync` finished async".
 * So we highlight fenced fences first (async, Shiki native API), then hand
 * react-markdown plain, already-highlighted HTML via rehype-raw.
 */
function splitFences(md: string): { text: string; fences: string[] } {
  const fences: string[] = [];
  const text = md.replace(/^```\w*\n[\s\S]*?^```$/gim, (full) => {
    fences.push(full);
    return `\n<!--shiki-fence-${fences.length - 1}-->\n`;
  });
  return { text, fences };
}

// placeholder to avoid unused symbol complaints in some lint configs

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'span', 'div'],
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] ?? []), 'style', 'dir'],
    code: [...(defaultSchema.attributes?.code ?? []), 'style', 'class'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'style', 'class'],
    span: [...(defaultSchema.attributes?.span ?? []), 'class', 'style'],
  },
};

export function Markdown({ content, dir = 'ltr' }: MarkdownProps) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { text, fences } = splitFences(content);

      // Highlight each fence with Shiki (async, native API).
      const highlighted = await Promise.all(
        fences.map(async (fence) => {
          const m = /^```(\w+)?\n([\s\S]*?)\n?```$/.exec(fence);
          const lang = (m?.[1] ?? 'text').toLowerCase();
          const code = m?.[2] ?? '';
          try {
            return await codeToHtml(code, { lang, theme: 'github-dark-default' });
          } catch {
            return await codeToHtml(code, { lang: 'text', theme: 'github-dark-default' });
          }
        }),
      );

      // Swap placeholders back for the HTML.
      const withCode = text.replace(
        /<!--shiki-fence-(\d+)-->/g,
        (_, i) => highlighted[Number(i)] ?? '',
      );

      // markdown -> HTML (no shiki here, sync pipeline is fine)
      const { unified } = await import('unified');
      const remarkParse = (await import('remark-parse')).default;
      const remarkGfmP = (await import('remark-gfm')).default;
      const remarkRehype = (await import('remark-rehype')).default;
      const rehypeRawP = (await import('rehype-raw')).default;
      const rehypeSanitizeP = (await import('rehype-sanitize')).default;
      const rehypeSlugP = (await import('rehype-slug')).default;
      const rehypeStringify = (await import('rehype-stringify')).default;

      const file = await unified()
        .use(remarkParse)
        .use(remarkGfmP)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRawP)
        .use(rehypeSanitizeP, sanitizeSchema)
        .use(rehypeSlugP)
        .use(rehypeStringify)
        .process(withCode);

      return String(file);
    }

    render()
      .then((out) => {
        if (!cancelled) setHtml(out);
      })
      .catch((e) => {
        console.error('markdown render failed', e);
        if (!cancelled) setHtml(`<pre>${content.replace(/</g, '&lt;')}</pre>`);
      });

    return () => {
      cancelled = true;
    };
  }, [content]);

  if (html === null) {
    return (
      <div dir={dir} className="prose-notes animate-pulse text-slate-500">
        Loading post…
      </div>
    );
  }

  return <div dir={dir} className="prose-notes" dangerouslySetInnerHTML={{ __html: html }} />;
}
