export function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-64 max-w-6xl items-center px-4" role="status">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Loading page...
      </span>
    </div>
  );
}
