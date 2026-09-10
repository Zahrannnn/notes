import { NavLink } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { SITE_URLS } from '@/constants/app';

const navItems = [
  { to: routes.home, label: 'Notes' },
  { to: routes.about, label: 'About' },
];

const externalItems = [
  { href: SITE_URLS.portfolio, label: 'Portfolio' },
  { href: SITE_URLS.resume, label: 'Resume' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-slate-200 text-gold-ink dark:bg-slate-800 dark:text-gold'
      : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
  }`;

const externalLinkClass =
  'rounded-md px-3 py-2 text-sm text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-100';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3"
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

        <div className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}

          <span
            aria-hidden="true"
            className="mx-2 hidden h-5 w-px bg-slate-300 sm:inline-block dark:bg-slate-700"
          />

          {externalItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={externalLinkClass}
            >
              {item.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
