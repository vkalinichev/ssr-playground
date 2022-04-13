import { Post } from '@post';
import { usePost } from '@post/model';
import React from 'react';

const LIMIT = 5;

export function Example({ id = 1 }: { id?: number }) {
  const { data, status, isStale } = usePost(String(id));

  return (
    <Post data={data} isStale={isStale} status={status}>
      {data && id < LIMIT && <Example id={id + 1} />}
    </Post>
  );
}
