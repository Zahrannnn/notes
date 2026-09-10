import { Link } from 'react-router-dom';
import { postPath, tagPath } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { getAllTags, getPostMetas, type Post } from '@/features/posts';
import { getTrendingTopics } from '@/features/posts/topics';

type PostMeta = Omit<Post, 'body'>;

function PostMetaRow({ post }: { post: PostMeta }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
      {post.lang === 'ar' && <span dir="rtl">العربية</span>}
      <span>{post.readingTimeMinutes} min</span>
      {post.tags.slice(0, 3).map((t) => (
        <span key={t} className="text-gold-ink dark:text-gold">
          #{t}
        </span>
      ))}
    </div>
  );
}

export function HomePage() {
  const metas = getPostMetas();
  const tags = getAllTags();
  const trending = getTrendingTopics();
  const [latest, ...rest] = metas;

  return (
    <>
      <SEO
        title="Notes"
        description="Engineering notes by Mohamed Osama Zahran — CSS mechanics, open source, and building in public."
      />

      <section className="mx-auto max-w-3xl px-4 pt-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
          Engineering notes
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Debugging stories, open-source journeys, and frontend mechanics — by Mohamed Osama Zahran.
          English and Arabic.
        </p>

        {trending.length > 0 && (
          <div className="mt-6 rounded-xl border border-gold-ink/30 bg-gold-ink/5 p-4 dark:border-gold/40 dark:bg-gold/10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gold-ink dark:text-gold">
              🔥 Currently learning
            </h2>
            <div className="mt-3 space-y-2">
              {trending.map((topic) => (
                <Link
                  key={topic.tag}
                  to={tagPath(topic.tag)}
                  className="group block rounded-lg px-2 py-1 transition-colors hover:bg-slate-900/5 dark:hover:bg-slate-800/60"
                >
                  <span className="font-semibold text-slate-950 group-hover:text-gold-ink dark:text-slate-50 dark:group-hover:text-gold">
                    {topic.label} ↗
                  </span>
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                    {topic.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
        {latest && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Latest note
            </p>
            <Link to={postPath(latest.slug)} className="group mt-3 block">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-gold-ink dark:text-slate-50 dark:group-hover:text-gold sm:text-3xl">
                {latest.title}
              </h2>
              <p className="mt-2 max-w-[65ch] text-slate-600 dark:text-slate-400">
                {latest.description}
              </p>
              <PostMetaRow post={latest} />
            </Link>
          </>
        )}

        {rest.length > 0 && (
          <>
            <hr className="mt-10 border-slate-200 dark:border-slate-800" />
            <h2 className="sr-only">More notes</h2>
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {rest.map((post) => (
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
                    <PostMetaRow post={post} />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {metas.length === 0 && (
          <p className="text-slate-400">No posts yet — drop a .md file in src/content/posts.</p>
        )}
      </section>
    </>
  );
}
