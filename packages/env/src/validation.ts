// packages/env/src/validation.ts

import type { z } from 'zod';

/**
 * Parses `source` against `schema`, throwing a single formatted error
 * listing every failing variable if validation fails. Used by shared.ts,
 * server.ts, and client.ts so each one doesn't repeat its own
 * safeParse/format/throw boilerplate.
 */
export function parseEnv<T extends z.ZodTypeAny>(schema: T, source: Record<string, string | undefined>, label: 'shared' | 'server' | 'client'): z.infer<T> {
  const result = schema.safeParse(source);

  if (!result.success) {
    const formatted = result.error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
    throw new Error(`❌ Invalid ${label} environment variables:\n${formatted}\n\n` + `Check your .env file against .env.example.`);
  }

  return result.data;
}
