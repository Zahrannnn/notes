import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from '@/app/store/store';
import { queryClient } from '@/app/query/client';
import { QueryProvider } from '@/app/query/queryClient';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { useTheme } from '@/app/providers/theme-context';
import { router } from '@/app/router/router';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';

function ThemedToaster() {
  const { resolvedTheme } = useTheme();

  return <Toaster richColors position="top-right" theme={resolvedTheme} />;
}

export function AppProviders() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <QueryProvider client={queryClient}>
            <ThemeProvider>
              <RouterProvider router={router} />
              <ThemedToaster />
            </ThemeProvider>
          </QueryProvider>
        </ReduxProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
