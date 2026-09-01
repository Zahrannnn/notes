import { NavLink } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { logout } from '@/features/auth/store/authSlice';

const navItems = [
  { to: routes.home, label: 'Home' },
  { to: routes.about, label: 'About' },
  { to: routes.dashboard, label: 'Dashboard' },
];

export function Header() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <nav
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4"
        aria-label="Main navigation"
      >
        <NavLink to={routes.home} className="text-lg font-bold text-slate-950 dark:text-slate-50">
          Starter
        </NavLink>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-brand-100'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          {isAuthenticated ? (
            <Button variant="secondary" onClick={() => dispatch(logout())}>
              Sign out
            </Button>
          ) : (
            <Button asChild>
              <NavLink to={routes.login}>Sign in</NavLink>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
