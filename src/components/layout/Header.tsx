import { NavLink } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const navItems = [
  { to: routes.home, label: 'Notes' },
  { to: routes.about, label: 'About' },
];

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4"
        aria-label="Main navigation"
      >
        <NavLink
          to={routes.home}
          className="text-lg font-bold tracking-tight text-slate-50 hover:text-sky-300"
        >
          notes<span className="text-sky-400">.mzahran.tech</span>
        </NavLink>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-slate-800 text-sky-300'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="https://mzahran.tech"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
          >
            Portfolio ↗
          </a>
          <a
            href="https://resume.mzahran.tech"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
          >
            Resume ↗
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
