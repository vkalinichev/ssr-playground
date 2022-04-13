import { isSsr, randomInt } from '@core/utils';
import axios from 'axios';
// @ts-expect-error node api
import https from 'https';

const delay = (ms: number) => {
  ms = isSsr() ? ms / 2 : ms;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  decompress: false,
  httpsAgent: isSsr() ? new https.Agent({ keepAlive: true }) : undefined,
});

async function get<T>(path: string): Promise<T> {
  await delay(randomInt(0, 1000));
  const response = await axiosClient.get<T>(path);
  return response.data;
}

export function apiClient<T>(endpoint: string): T | Promise<T> {
  return get<T>(endpoint);
}
