import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import type { QueryClient } from '@tanstack/react-query';

type QueryProviderProps = PropsWithChildren<{
  client: QueryClient;
}>;

export function QueryProvider({ children, client }: QueryProviderProps) {
  return (
    <QueryClientProvider client={client}>
      {children}
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
