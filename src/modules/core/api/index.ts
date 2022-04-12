import { isSsr } from '@core/utils';
import { PostShape } from '@post';
import axios from 'axios';

const delay = (ms: number) => {
  ms = isSsr() ? ms / 2 : ms;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

async function get<T>(path: string): Promise<T> {
  await delay(500);
  const response = await axiosClient.get<T>(path);
  return response.data;
}

// @ts-expect-error sdf
const initialCache = !isSsr() && window.__data ? window.__data : [];
export const ssrCache = new Map<string, any>(initialCache);
export const ssrPromises: Promise<unknown>[] = [];

function apiClient<T>(endpoint: string): T | undefined | Promise<T | undefined> {
  if (ssrCache.has(endpoint)) {
    return ssrCache.get(endpoint);
  }
  const promise = get<T>(endpoint).then((result) => {
    if (isSsr()) {
      ssrCache.set(endpoint, result);
    }
    return result;
  });

  if (isSsr()) {
    ssrPromises.push(promise);
    return undefined;
  }
  return promise;
}

export const api = {
  getFirst: () => apiClient<PostShape>('/posts/1'),
  getSecond: () => apiClient<PostShape>('/posts/2'),
  getThird: () => apiClient<PostShape>('/posts/3'),
  getFourth: () => apiClient<PostShape>('/posts/4'),
  getFifth: () => apiClient<PostShape>('/posts/5'),
};
