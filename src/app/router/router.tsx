import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { RouteErrorBoundary } from '@/components/feedback/RouteErrorBoundary';
import { RouteFallback } from '@/components/feedback/RouteFallback';
import { AppLayout } from '@/layouts/AppLayout';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const PostPage = lazy(() =>
  import('@/features/posts/pages/PostPage').then((module) => ({
    default: module.PostPage,
  })),
);
const TagPage = lazy(() =>
  import('@/features/posts/pages/TagPage').then((module) => ({
    default: module.TagPage,
  })),
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((module) => ({ default: module.AboutPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
);

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: routes.home, element: withSuspense(<HomePage />) },
      { path: routes.post, element: withSuspense(<PostPage />) },
      { path: routes.tag, element: withSuspense(<TagPage />) },
      { path: routes.about, element: withSuspense(<AboutPage />) },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
