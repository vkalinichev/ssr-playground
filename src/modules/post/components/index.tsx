import { PostShape } from '@post';
import React from 'react';

type Props = {
  data: PostShape | undefined;
  renderChildren?: () => React.ReactNode;
};

export function Post({ renderChildren, data }: Props) {
  if (!data) {
    return <>...</>;
  }

  return (
    <>
      <hr />
      <h5>{data.title.slice(0, 20)}</h5>
      <p>{data.body.slice(0, 50)}</p>
      {renderChildren?.()}
    </>
  );
}
