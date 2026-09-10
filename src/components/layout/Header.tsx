import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { postPath, routes } from '@/app/router/routes';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { getPostMetas } from '@/features/posts';
import { SITE_URLS } from '@/constants/app';

const navItems = [
  { to: routes.home, label: 'Notes' },
  { to: routes.about, label: 'About' },
];

const externalItems = [
  { href: SITE_URLS.portfolio, label: 'Portfolio' },
  { href: SITE_URLS.resume, label: 'Resume' },
  { href: SITE_URLS.github, label: 'GitHub' },
  { href: SITE_URLS.linkedin, label: 'LinkedIn' },
];

/**
 * Editorial masthead: monogram + wordmark, quiet route links, and an
 * "Index" pill that unfolds a full-width typographic sheet (the nav).
 * Motion: transform/opacity only; the global reduced-motion rule disables it.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const latest = getPostMetas()[0];

  // Close on navigation, restore focus to the toggle.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    // Focus the first big link via its container (NavLink ref typing is unstable across versions).
    const firstLink = document.querySelector<HTMLAnchorElement>('#index-sheet a[href="/"]');
    firstLink?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const closeAndRefocus = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-x-6 px-4 py-3"
        aria-label="Main navigation"
      >
        <NavLink
          to={routes.home}
          className="flex items-center gap-2.5 rounded-md font-bold tracking-tight text-slate-950 transition-colors hover:text-gold-ink dark:text-slate-50 dark:hover:text-gold"
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
        </NavLink>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold-ink dark:text-gold'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="index-sheet"
            onClick={() => setOpen((v) => !v)}
            className="ms-2 rounded-full border border-gold-ink/60 px-4 py-1.5 text-sm font-medium text-gold-ink transition-colors hover:bg-gold-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-gold/60 dark:text-gold dark:hover:bg-gold/10"
          >
            Index
          </button>
        </div>
      </nav>

      {open && (
        <>
          {/* scrim */}
          <div
            className="fixed inset-0 top-[57px] z-30 bg-slate-950/40 dark:bg-black/60"
            aria-hidden="true"
            onClick={closeAndRefocus}
          />
          {/* the sheet */}
          <div
            id="index-sheet"
            aria-label="Site index"
            className="nav-drop absolute inset-x-0 top-full z-40 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:grid-cols-[1fr_auto] sm:gap-16">
              <div className="space-y-6">
                {navItems.map((item, i) => (
                  <div
                    key={item.to}
                    className="nav-item flex items-center gap-4"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-0.5 w-8 shrink-0 bg-gold-ink dark:bg-gold"
                    />
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-4xl font-bold tracking-tight transition-colors sm:text-6xl ${
                          isActive
                            ? 'text-gold-ink dark:text-gold'
                            : 'text-slate-950 hover:text-gold-ink dark:text-slate-50 dark:hover:text-gold'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </div>
                ))}
              </div>

              <div
                className="nav-item flex flex-col justify-between gap-8"
                style={{ animationDelay: '120ms' }}
              >
                <nav aria-label="Elsewhere" className="space-y-2.5">
                  {externalItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-slate-600 transition-colors hover:text-gold-ink dark:text-slate-400 dark:hover:text-gold"
                    >
                      {item.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </nav>
                <ThemeToggle />
              </div>
            </div>

            {latest && (
              <div className="border-t border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-6xl px-4 py-3 text-sm">
                  <span className="text-slate-500">Latest note: </span>
                  <NavLink
                    to={postPath(latest.slug)}
                    className="text-gold-ink hover:underline dark:text-gold"
                  >
                    {latest.title}
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
