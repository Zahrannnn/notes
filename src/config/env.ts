import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1).default('Vite React TS Starter'),
  VITE_SITE_URL: z.string().url().default('https://notes.mzahran.tech'),
  VITE_GISCUS_REPO_ID: z.string().optional(),
  VITE_GISCUS_CATEGORY_ID: z.string().optional(),
  VITE_ENABLE_AXE: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
});

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: Record<string, string | undefined>;
  }
}

// Runtime values (window.__RUNTIME_CONFIG__, written by env.sh in the Docker
// image) win over build-time values so deployments can be reconfigured
// without rebuilding. Empty strings from env.sh are ignored.
function readRawEnv(): Record<string, unknown> {
  const runtimeConfig =
    typeof window !== 'undefined' && window.__RUNTIME_CONFIG__
      ? Object.fromEntries(
          Object.entries(window.__RUNTIME_CONFIG__).filter(
            (entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1] !== '',
          ),
        )
      : {};

  return { ...import.meta.env, ...runtimeConfig };
}

const parsedEnv = envSchema.safeParse(readRawEnv());

if (!parsedEnv.success) {
  // Fail fast so misconfigured deployments do not make unsafe API calls.
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

export const env = parsedEnv.data;
