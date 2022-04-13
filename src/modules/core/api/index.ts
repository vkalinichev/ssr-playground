import { isSsr } from '@core/utils';
import { PostShape } from '@post';
import axios from 'axios';
// @ts-expect-error node api
import https from 'https';

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  decompress: false,
  httpsAgent: isSsr() ? new https.Agent({ keepAlive: true }) : undefined,
});

async function get<T>(path: string): Promise<T> {
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
