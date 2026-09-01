import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Route-level error boundary for react-router (`errorElement`).
 * Handles loader/action errors and render errors thrown inside matched routes.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong';
  const message = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred.';

  return (
    <div role="alert" className="mx-auto grid max-w-md gap-4 px-4 py-16 text-center">
      <AlertTriangle className="mx-auto size-10 text-amber-500" aria-hidden="true" />
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
      <div className="mx-auto flex gap-2">
        <Button variant="secondary" onClick={() => navigate(0)}>
          <RotateCcw className="size-4" aria-hidden="true" />
          Reload
        </Button>
        <Button asChild>
          <Link to={routes.home}>Back home</Link>
        </Button>
      </div>
    </div>
  );
}
