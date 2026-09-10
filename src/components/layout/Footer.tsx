import { Link } from 'react-router-dom';
import { routes, postPath } from '@/app/router/routes';
import { getPostMetas } from '@/features/posts';
import { APP_NAME, SITE_URLS } from '@/constants/app';

const identityLinks = [
  { href: SITE_URLS.portfolio, label: 'Portfolio', external: true },
  { href: SITE_URLS.resume, label: 'Resume', external: true },
  { href: SITE_URLS.github, label: 'GitHub', external: true },
  { href: SITE_URLS.linkedin, label: 'LinkedIn', external: true },
  { href: SITE_URLS.email, label: 'info@mzahran.tech', external: false },
];

export function Footer() {
  const latest = getPostMetas().slice(0, 3);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link
            to={routes.home}
            className="flex items-center gap-2.5 font-bold tracking-tight text-slate-950 transition-colors hover:text-gold-ink dark:text-slate-50 dark:hover:text-gold"
          >
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden="true"
              className="size-7 rounded-lg border border-slate-200 dark:border-slate-800"
            />
            <span className="text-lg">
              notes<span className="text-gold-ink dark:text-gold">.mzahran.tech</span>
            </span>
          </Link>
          <p className="mt-3 max-w-[38ch] text-sm text-slate-500">
            Real debugging stories and build-in-public write-ups by Mohamed Osama Zahran, in English
            and Arabic.
          </p>
        </div>

        <nav aria-label="Latest notes">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Latest notes
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {latest.map((p) => (
              <li key={p.slug}>
                <Link
                  to={postPath(p.slug)}
                  className="text-slate-600 transition-colors hover:text-gold-ink dark:text-slate-400 dark:hover:text-gold"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Elsewhere
          </p>
          <nav aria-label="Identity links">
            <ul className="mt-3 space-y-2 text-sm">
              {identityLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-gold-ink dark:text-slate-400 dark:hover:text-gold"
                  >
                    {item.label}
                    {item.external && <span aria-hidden="true">↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Mohamed Osama Zahran. All rights reserved.</span>
          <span>{APP_NAME}, built in public with React, TypeScript, and Tailwind.</span>
        </div>
      </div>
    </footer>
  );
}
