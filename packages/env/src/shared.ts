// packages/env/src/shared.ts
//
// The original sketch for this package (and @nexus/tokens' sibling doc)
// listed APP_NAME/APP_URL as example "shared" variables — neither exists
// anywhere in this repo's .env.example or codebase, so they're not
// included here. NODE_ENV is the only variable that's genuinely shared
// across client and server today; this file stays this thin until a real
// shared variable shows up (at which point add it here, not to
// server.ts or client.ts).

import { z } from 'zod';

import { parseEnv } from './validation.js';

const sharedEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type SharedEnv = z.infer<typeof sharedEnvSchema>;

export const sharedEnv: SharedEnv = parseEnv(sharedEnvSchema, { NODE_ENV: process.env.NODE_ENV }, 'shared');
