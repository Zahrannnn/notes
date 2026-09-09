import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { router } from '@/app/router/router';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';

export function AppProviders() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
