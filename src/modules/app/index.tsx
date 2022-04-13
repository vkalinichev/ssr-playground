import { api } from '@core/api';
import { useQuery } from '@core/hooks';
import { useEffect } from '@core/react';
import { Post } from '@post';
import React, { useState } from 'react';
import { HydrationIndicator } from 'ui/HydrationIndicator';
import './global.css';
import styles from './index.module.css';

export function App() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className={styles.root}>
      <h1>
        SSR Example <HydrationIndicator hydrated={hydrated} />
      </h1>

      <hr />

      <One />
    </div>
  );
}

function One() {
  const { data } = useQuery({
    fetch: () => api.getFirst(),
    key: '/posts/1',
    ssr: true,
  });

  return <Post data={data}>{data && <Two />}</Post>;
}

function Two() {
  const { data } = useQuery({
    fetch: () => api.getSecond(),
    key: '/posts/2',
  });

  return <Post data={data}>{data && <Three />}</Post>;
}

function Three() {
  const { data } = useQuery({
    fetch: () => api.getThird(),
    key: '/posts/3',
  });

  return <Post data={data}>{data && <Four />}</Post>;
}

function Four() {
  const { data } = useQuery({
    fetch: () => api.getFourth(),
    key: '/posts/4',
  });

  return <Post data={data}>{data && <Five />}</Post>;
}

function Five() {
  const { data } = useQuery({
    fetch: () => api.getFifth(),
    key: '/posts/5',
  });

  return <Post data={data} />;
}
