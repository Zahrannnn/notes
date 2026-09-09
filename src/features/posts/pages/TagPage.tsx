import { Link, useParams } from 'react-router-dom';
import { routes, postPath } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { getPostsByTag } from '@/features/posts';

export function TagPage() {
  const { tag = '' } = useParams<{ tag: string }>();
  const posts = getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
      <SEO title={`#${tag}`} description={`Notes tagged #${tag}`} />
      <h1 className="text-2xl font-bold text-slate-50">
        #{tag} <span className="text-slate-500">({posts.length})</span>
      </h1>
      <ul className="mt-8 divide-y divide-slate-800">
        {posts.map((p) => (
          <li key={p.slug} className="py-5">
            <Link to={postPath(p.slug)} className="group block">
              <span className="font-semibold text-sky-300 group-hover:underline">{p.title}</span>
              <span className="mt-1 block text-sm text-slate-400">{p.description}</span>
              <time className="mt-1 block text-xs text-slate-500" dateTime={p.date}>
                {p.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>
      {posts.length === 0 && <p className="text-slate-400">Nothing here yet.</p>}
      <Link to={routes.home} className="mt-8 inline-block text-sm text-sky-300 hover:underline">
        ← All posts
      </Link>
    </div>
  );
}
