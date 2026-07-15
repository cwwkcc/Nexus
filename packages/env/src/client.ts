// packages/env/src/client.ts
//
// The old schema had `.default('https://cwwkcc.lk')` /
// `.default('https://admin.cwwkcc.lk')` baked in for these two. That
// meant a forgotten NEXT_PUBLIC_SITE_URL in any environment — including
// production — would silently fall back to a hardcoded literal instead of
// failing loudly, which defeats the point of validating that it's set.
// It was also undocumented: NEXT_PUBLIC_SITE_URL doesn't appear in either
// .env.example file today, so a fresh dev had no way to discover it
// existed. Removed the defaults and added it to the root .env.example
// instead — see that file's diff.
//
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
