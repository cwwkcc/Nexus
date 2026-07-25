// packages/env/src/client.ts

// No `server-only` import here — this file is meant to be safe to import
// from client components. Only NEXT_PUBLIC_-prefixed variables belong in
// this schema; anything else belongs in server.ts.

import { z } from 'zod';

import { parseEnv } from './validation.js';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL'),
  NEXT_PUBLIC_ADMIN_URL: z.string().url('NEXT_PUBLIC_ADMIN_URL must be a valid URL'),
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(), // F-087, not shipped yet
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export const clientEnv: ClientEnv = parseEnv(
  clientEnvSchema,
  {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
  'client',
);
