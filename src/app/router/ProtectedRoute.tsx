import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { useAppSelector } from '@/app/store/hooks';

export function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
