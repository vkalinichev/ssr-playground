import { PostShape } from '@post';
import React, { ReactNode } from 'react';
import { Indicator, Intent } from 'ui/Indicator';

type Status = 'idle' | 'loading' | 'error' | 'success';

type Props = {
  data: PostShape | undefined;
  children?: ReactNode;
  status: Status;
  isStale: boolean;
};

const intentByStatus: Record<Status, Intent> = {
  error: 'negative',
  idle: 'neutral',
  loading: 'info',
  success: 'positive',
};

export function Post({ children, data, status, isStale }: Props) {
  if (!data) {
    return <>...</>;
  }

  return (
    <>
      <h5>
        <Indicator intent={isStale ? 'warning' : intentByStatus[status]} />{' '}
        {data.title.slice(0, 20)}
      </h5>
      <p>{data.body.slice(0, 50)}</p>
      <hr />
      {children}
    </>
  );
}
