import { Link, useParams } from 'react-router-dom';
import { routes, postPath } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { Button } from '@/components/ui/Button';
import { getPostBySlug, getPostMetas } from '@/features/posts';
import { Giscus } from '@/features/posts/components/Giscus';
import { Markdown } from '@/features/posts/components/Markdown';
import '@/features/posts/components/prose-notes.css';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <SEO title="Post not found" />
        <h1 className="text-3xl font-bold text-slate-50">404 — post not found</h1>
        <p className="mt-3 text-slate-400">It may have been renamed. Browse all posts instead.</p>
        <Button asChild className="mt-6">
          <Link to={routes.home}>All posts</Link>
        </Button>
      </div>
    );
  }

  const others = getPostMetas()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-24 pt-10">
      <SEO title={post.title} description={post.description} />
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(post.lang === 'ar' ? 'ar-EG' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-slate-300">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-sky-900 bg-sky-950/40 px-3 py-1 text-xs font-medium text-sky-300 hover:bg-sky-900/40"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <Markdown content={post.body} dir={post.lang === 'ar' ? 'rtl' : 'ltr'} />

      <section className="mt-14 border-t border-slate-800 pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          More notes
        </h2>
        <ul className="mt-4 space-y-3">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                to={postPath(p.slug)}
                className="group flex flex-wrap items-baseline justify-between gap-2"
              >
                <span className="font-medium text-sky-300 group-hover:underline">{p.title}</span>
                <time className="text-sm text-slate-500" dateTime={p.date}>
                  {p.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Giscus />
    </article>
  );
}
