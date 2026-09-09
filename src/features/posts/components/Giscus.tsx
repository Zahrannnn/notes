import { useEffect, useMemo, useRef } from 'react';
import { env } from '@/config/env';

type GiscusProps = {
  /** Enable after repo setup: see README "Enable comments" */
  enabled?: boolean;
};

const REPO = 'Zahrannnn/notes' as const;
const CATEGORY = 'Comments' as const;

/**
 * giscus wrapper (GitHub Discussions). Loads lazily after first paint and only
 * when enabled, so local dev without configuration stays clean. Theme follows
 * the app's <html class="dark"> toggle via giscus's own prefers-color-scheme.
 *
 * Setup (one time, repo owner):
 *   1. Enable Discussions on the repo + create the "Comments" category
 *   2. Install the giscus app: https://github.com/apps/giscus
 *   3. https://giscus.app → generate repoId/categoryId → set env:
 *      VITE_GISCUS_REPO_ID, VITE_GISCUS_CATEGORY_ID
 */
export function Giscus({ enabled = true }: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const repoId = env.VITE_GISCUS_REPO_ID;
  const categoryId = env.VITE_GISCUS_CATEGORY_ID;

  const configured = useMemo(() => Boolean(repoId && categoryId), [repoId, categoryId]);

  useEffect(() => {
    const container = ref.current;
    if (!enabled || !configured || !container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', REPO);
    script.setAttribute('data-repo-id', repoId!);
    script.setAttribute('data-category', CATEGORY);
    script.setAttribute('data-category-id', categoryId!);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute(
      'data-theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    );
    script.setAttribute('data-lang', 'en');

    container.appendChild(script);

    // Follow the app theme (html.dark) after mount via giscus's postMessage API.
    const observer = new MutationObserver(() => {
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app',
      );
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      container.replaceChildren();
    };
  }, [enabled, configured, repoId, categoryId]);

  if (!enabled) return null;

  if (!configured) {
    return (
      <p className="mt-10 rounded-lg border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
        Comments are ready to enable: set <code>VITE_GISCUS_REPO_ID</code> and{' '}
        <code>VITE_GISCUS_CATEGORY_ID</code> (see README "Enable comments").
      </p>
    );
  }

  return <div ref={ref} className="mt-10" />;
}
