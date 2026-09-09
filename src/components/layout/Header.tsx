import { NavLink } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const navItems = [
  { to: routes.home, label: 'Notes' },
  { to: routes.about, label: 'About' },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4"
        aria-label="Main navigation"
      >
        <NavLink
          to={routes.home}
          className="text-lg font-bold tracking-tight text-slate-950 hover:text-gold-ink dark:text-slate-50 dark:hover:text-gold"
        >
          notes<span className="text-gold-ink dark:text-gold">.mzahran.tech</span>
        </NavLink>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-slate-200 text-gold-ink dark:bg-slate-800 dark:text-gold'
                    : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://mzahran.tech"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
          >
            Portfolio ↗
          </a>
          <a
            href="https://resume.mzahran.tech"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200/60 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
          >
            Resume ↗
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
