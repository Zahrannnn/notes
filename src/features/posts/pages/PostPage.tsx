import { Link, useParams } from 'react-router-dom';
import { routes, postPath } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { ReadingProgress } from '@/components/common/ReadingProgress';
import { Button } from '@/components/ui/Button';
import { getPostBySlug, getPostMetas } from '@/features/posts';
import { Giscus } from '@/features/posts/components/Giscus';
import { Markdown } from '@/features/posts/components/Markdown';
import { LanguageToggle } from '@/features/posts/components/LanguageToggle';
import '@/features/posts/components/prose-notes.css';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const articleId = 'post-body';

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <SEO title="Post not found" />
        <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">
          404: post not found
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          It may have been renamed. Browse all posts instead.
        </p>
        <Button asChild className="mt-6">
          <Link to={routes.home}>All posts</Link>
        </Button>
      </div>
    );
  }

  const allSlugs = getPostMetas().map((p) => p.slug);

  const related = (() => {
    const shared = getPostMetas().filter(
      (p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)),
    );
    const fill = getPostMetas().filter((p) => p.slug !== post.slug && !shared.includes(p));
    return [...shared, ...fill].slice(0, 3);
  })();

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-10">
      <SEO title={post.title} description={post.description} />
      <ReadingProgress targetId={articleId} />
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(post.lang === 'ar' ? 'ar-EG' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="tag-pill"
            >
              #{tag}
            </Link>
          ))}
          <span className="ms-auto">
            <LanguageToggle slug={post.slug} allSlugs={allSlugs} lang={post.lang} />
          </span>
        </div>
      </header>

      <div id={articleId}>
        <Markdown content={post.body} dir={post.lang === 'ar' ? 'rtl' : 'ltr'} />
      </div>

      <section className="mt-14 border-t border-slate-200 pt-8 dark:border-slate-800">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Related notes
        </h2>
        <ul className="mt-4 space-y-3">
          {related.map((p) => (
            <li key={p.slug}>
              <Link
                to={postPath(p.slug)}
                className="group flex flex-wrap items-baseline justify-between gap-2"
              >
                <span className="font-medium text-gold-ink group-hover:underline dark:text-gold">
                  {p.title}
                </span>
                <time className="text-sm text-slate-500" dateTime={p.date}>
                  {p.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-slate-100/60 p-5 dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Written by{' '}
          <strong className="text-slate-950 dark:text-slate-100">Mohamed Osama Zahran</strong>,
          full-stack engineer at RICOH Europe. More notes and open-source work on{' '}
          <a
            className="text-gold-ink hover:underline dark:text-gold"
            href="https://github.com/Zahrannnn"
          >
            GitHub
          </a>{' '}
          and{' '}
          <a className="text-gold-ink hover:underline dark:text-gold" href="https://mzahran.tech">
            mzahran.tech
          </a>
          .
        </p>
      </section>

      <Giscus />
    </article>
  );
}
