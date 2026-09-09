import { Link } from 'react-router-dom';
import { postPath, tagPath } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { getAllTags, getPostMetas } from '@/features/posts';

export function HomePage() {
  const metas = getPostMetas();
  const tags = getAllTags();

  return (
    <>
      <SEO
        title="Notes"
        description="Engineering notes by Mohamed Osama Zahran: CSS mechanics, open source, and building in public."
      />

      <section className="mx-auto max-w-3xl px-4 pt-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Engineering notes
        </h1>
        <p className="mt-3 max-w-[65ch] text-lg text-slate-600 dark:text-slate-400">
          Debugging stories, open-source journeys, and frontend mechanics by Mohamed Osama Zahran.
          English and Arabic.
        </p>
        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link key={tag} to={tagPath(tag)} className="tag-pill">
                #{tag} <span className="opacity-60">{count}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 pt-10">
        <h2 className="sr-only">All posts</h2>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {metas.map((post) => (
            <li key={post.slug} className="py-7">
              <Link to={postPath(post.slug)} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-950 group-hover:text-gold-ink dark:text-slate-100 dark:group-hover:text-gold">
                    {post.title}
                  </h3>
                  <time className="text-sm text-slate-500" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(
                      post.lang === 'ar' ? 'ar-EG' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      },
                    )}
                  </time>
                </div>
                <p className="mt-2 max-w-[65ch] text-slate-600 dark:text-slate-400">
                  {post.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {post.lang === 'ar' && <span dir="rtl">العربية</span>}
                  <span>{post.readingTimeMinutes} min</span>
                  {post.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-gold-ink dark:text-gold">
                      #{t}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {metas.length === 0 && (
          <p className="text-slate-600 dark:text-slate-400">
            No posts yet: drop a .md file in src/content/posts.
          </p>
        )}
      </section>
    </>
  );
}
