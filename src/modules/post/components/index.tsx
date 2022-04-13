import { PostShape } from '@post';
import React, { ReactNode } from 'react';

type Props = {
  data: PostShape | undefined;
  children?: ReactNode;
};

export function Post({ children, data }: Props) {
  if (!data) {
    return <>...</>;
  }

  return (
    <>
      <h5>{data.title.slice(0, 20)}</h5>
      <p>{data.body.slice(0, 50)}</p>
      <hr />
      {children}
    </>
  );
}
