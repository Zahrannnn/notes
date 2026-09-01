import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { env } from '@/config/env';
import { toApiError } from '@/lib/apiError';

export function createHttpClient(baseURL?: string, timeoutMs = env.VITE_API_TIMEOUT_MS) {
  const client = axios.create({
    baseURL,
    timeout: timeoutMs,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    // Prefer secure, httpOnly cookies. If bearer tokens are required, inject them here from
    // an in-memory/session source rather than hardcoding or storing secrets in the frontend.
    const token: string | null = null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  );

  return client;
}

export const apiClient = createHttpClient(env.VITE_API_BASE_URL);

/** Cached clients for multi-service setups: `getHttpClient('billing', url)`. */
const clients = new Map<string, AxiosInstance>();

export function getHttpClient(key: string, baseURL?: string) {
  if (!clients.has(key)) {
    clients.set(key, createHttpClient(baseURL));
  }

  return clients.get(key)!;
}
