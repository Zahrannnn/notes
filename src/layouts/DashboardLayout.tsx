import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[16rem_1fr]">
      <aside className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Workspace
        </h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          Protected dashboard route example.
        </p>
      </aside>
      <div>
        <Outlet />
      </div>
    </section>
  );
}
