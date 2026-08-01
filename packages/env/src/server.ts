// packages/env/src/server.ts

// The `server-only` import below is a real, structural guard, not just a
// naming convention: if anything reachable from a 'use client' component
// ends up importing this module, Next's build fails with a clear error
// instead of silently bundling `process.env.DATABASE_URL` (which would
// just be `undefined` in the browser, since only NEXT_PUBLIC_* vars get
// inlined) and throwing a confusing Zod error at runtime in the browser
// console. Previously nothing enforced this beyond discipline.
//
// Parsed once, at module load, not on every call — `validateServerEnv()`
// used to re-run Zod validation from scratch every time a consumer called
// it. `serverEnv` here is a plain parsed object; import it and read
// `serverEnv.DATABASE_URL` directly.
//
// ADMIN_EMAIL/ADMIN_PASSWORD (F-064, break-glass account) are required
// here, meaning the whole app fails to boot if they're ever unset —
// including after the account's already been seeded. Worth deciding
// whether that's actually the intended lifecycle, or whether those two
// belong in a narrower schema owned by the seed script instead.

import 'server-only';
import { z } from 'zod';

import { parseEnv } from './validation.js';

const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Auth.js
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),

  // Google OAuth (F-073) — deferred to M1b. Optional for now: M1a wires
  // Auth.js against the Credentials-based break-glass account only (F-078),
  // and the app must be able to boot in dev/staging before Google Cloud
  // Console access exists. Becomes required again once M1b adds the real
  // Google provider — track that as a release gate, the same way
  // ADMIN_API_SECRET's removal below closed out the previous one.
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),

  // Cloudflare R2
  R2_ACCOUNT_ID: z.string().min(1, 'R2_ACCOUNT_ID is required'),
  R2_ACCESS_KEY_ID: z.string().min(1, 'R2_ACCESS_KEY_ID is required'),
  R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2_SECRET_ACCESS_KEY is required'),
  R2_BUCKET_NAME: z.string().min(1, 'R2_BUCKET_NAME is required'),
  R2_PUBLIC_URL: z.string().url('R2_PUBLIC_URL must be a valid URL'),

  // Resend (Email)
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),

  // On-demand revalidation auth (apps/web /api/revalidate). Required, not
  // optional — the route compares `secret !== process.env.REVALIDATE_SECRET`,
  // and if the var is unset, a request that omits `secret` entirely sends
  // `undefined !== undefined`, which passes. An unset REVALIDATE_SECRET
  // was a silent, open revalidation endpoint; requiring it here means the
  // app now fails to boot instead of shipping that gap.
  REVALIDATE_SECRET: z.string().min(1, 'REVALIDATE_SECRET is required'),

  // Break-glass account (F-064)
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email'),
  ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required'),

  // Optional — not shipped yet
  SENTRY_DSN: z.string().url().optional(), // F-085
  UMAMI_WEBSITE_ID: z.string().optional(), // F-087
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export const serverEnv: ServerEnv = parseEnv(
  serverEnvSchema,
  {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    SENTRY_DSN: process.env.SENTRY_DSN,
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID,
  },
  'server',
);
