import { apiClient } from '@core/api';
import { randomBool, randomInt } from '@core/utils';
import { PostShape } from '@post';

export const postApi = {
  getPost(id: string) {
    return apiClient<PostShape>(`/posts/${randomBool(0.1) ? randomInt(0, 64) : id}`);
  },
};
