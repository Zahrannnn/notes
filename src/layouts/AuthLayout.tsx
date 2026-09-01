import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10 dark:bg-slate-900">
      <a className="skip-link" href="#auth-content">
        Skip to content
      </a>
      <section id="auth-content" className="w-full max-w-md">
        <Outlet />
      </section>
    </main>
  );
}
