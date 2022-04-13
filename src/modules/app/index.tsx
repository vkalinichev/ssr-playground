import { useEffect } from '@core/react';
import { Example } from '@example';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HydrationIndicator } from 'ui/HydrationIndicator';
import './global.css';
import styles from './index.module.css';

export function App() {
  const [queryClient] = React.useState(() => {
    return new QueryClient({ defaultOptions: { queries: { staleTime: 5_000 } } });
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.root}>
        <h1>
          SSR Example <HydrationIndicator hydrated={hydrated} />
        </h1>
        <hr />
        <Example />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
