import React from 'react';
import {
  QueryClientProvider,
  type QueryClientConfig,
  QueryClient,
} from '@tanstack/react-query';
import {type ReactNode} from 'react';

const MINUTE = 1000 * 60;

const DEFAULT_OPTIONS: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 15 * MINUTE,
    },
  },
};

const queryClient = new QueryClient(DEFAULT_OPTIONS);

const QueryProvider = ({children}: {children: ReactNode}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export {QueryProvider, queryClient, DEFAULT_OPTIONS};
