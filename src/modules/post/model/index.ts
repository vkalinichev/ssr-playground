import { PostShape } from '@post';
import { postApi } from '@post/api';
import { useQuery } from 'react-query';

export function usePost(id: string) {
  return useQuery<PostShape | undefined, Error>({
    queryKey: ['posts', id],
    queryFn: () => postApi.getPost(id),
  });
}
