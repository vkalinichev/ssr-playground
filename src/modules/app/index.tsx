import { api } from '@core/api';
import { useQuery } from '@core/hooks';
import { useEffect } from '@core/react';
import { Post, PostShape } from '@post';
import React, { useState } from 'react';
import styles from './index.module.css';
import './global.css';

export function App() {
  const [hydrated, setHydrated] = useState(false);
  const next = useQuery(() => api.getFirst(), '/posts/1', { ssr: true });

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className={styles.root}>
      <h1>
        SSR Example{' '}
        {hydrated ? (
          <span role='img' title='Hydrated'>
            🟢
          </span>
        ) : (
          <span role='img' title='Rendered on server'>
            🟡
          </span>
        )}
      </h1>

      <One data={next.data} />
    </div>
  );
}

type Props = {
  children?: () => React.ReactNode;
  data: PostShape | undefined;
};

function One({ data }: Props) {
  const next = useQuery(() => api.getSecond(), '/posts/2', { ssr: true });
  return <Post data={data} renderChildren={() => <Two {...next} />} />;
}

function Two({ data }: Props) {
  const next = useQuery(() => api.getThird(), '/posts/3', { ssr: true });
  return <Post data={data} renderChildren={() => <Three {...next} />} />;
}

function Three({ data }: Props) {
  const next = useQuery(() => api.getFourth(), '/posts/4', { ssr: true });
  return <Post data={data} renderChildren={() => <Four {...next} />} />;
}

function Four({ data }: Props) {
  const next = useQuery(() => api.getFifth(), '/posts/5', { ssr: true });
  return <Post data={data} renderChildren={() => <Five {...next} />} />;
}

function Five({ data }: Props) {
  return <Post data={data} />;
}
