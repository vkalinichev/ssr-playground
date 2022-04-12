import { ssrCache } from '@core/api';
import { useEffect } from '@core/react';
import { isSsr } from '@core/utils';
import { useState } from 'react';

export function useQuery<T>(
  fn: () => T | Promise<T>,
  key: string,
  { ssr }: { ssr: boolean }
): { data: T | undefined } {
  const [data, setData] = useState<T | undefined>(() => ssrCache.get(key));

  useEffect(() => {
    if (data) {
      return;
    }
    const result = fn();

    if (result instanceof Promise) {
      result.then(setData);
    } else {
      setData(result);
    }
  }, []);

  if (isSsr() && ssr && !data) {
    const result = fn();

    if (!(result instanceof Promise)) {
      return { data: result };
    }
  }

  return { data };
}
