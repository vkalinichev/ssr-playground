/// <reference types="vite/client" />

import type { ReactNode } from 'react';
import type { QueryClient } from 'react-query/core';

declare module 'react-query' {
  export interface QueryClientProviderProps {
    children: ReactNode;
    client: QueryClient;
    contextSharing?: boolean;
  }
}
