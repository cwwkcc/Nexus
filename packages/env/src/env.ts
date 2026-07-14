import { z } from 'zod';

/**
 * Server-side environment variables (never exposed to browser)
 */
export const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Auth.js
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),

  // Cloudflare R2
  R2_ACCOUNT_ID: z.string().min(1, 'R2_ACCOUNT_ID is required'),
  R2_ACCESS_KEY_ID: z.string().min(1, 'R2_ACCESS_KEY_ID is required'),
  R2_SECRET_ACCESS_KEY: z.string().min(1, 'R2_SECRET_ACCESS_KEY is required'),
  R2_BUCKET_NAME: z.string().min(1, 'R2_BUCKET_NAME is required'),
  R2_PUBLIC_URL: z.string().url('R2_PUBLIC_URL must be a valid URL'),

  // Resend (Email)
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),

  // Break-glass Account
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL must be a valid email'),
  ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required'),

  // Optional
  SENTRY_DSN: z.string().url().optional(),
  UMAMI_WEBSITE_ID: z.string().optional(),
});

/**
 * Public environment variables (exposed to browser via NEXT_PUBLIC_*)
 */
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL').default('https://cwwkcc.lk'),
  NEXT_PUBLIC_ADMIN_URL: z.string().url('NEXT_PUBLIC_ADMIN_URL must be a valid URL').default('https://admin.cwwkcc.lk'),
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
});

/**
 * Combined environment variable schema
 */
export const envSchema = serverEnvSchema.merge(publicEnvSchema);

/**
 * Type inference for environment variables
 */
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables against the schema
 * Throws descriptive errors if validation fails
 *
 * @example
 * ```ts
 * import { validateEnv } from '@nexus/env';
 *
 * const env = validateEnv();
 * console.log(env.DATABASE_URL);
 * ```
 */
export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n');
    throw new Error(`Environment variable validation failed:\n${errors}`);
  }

  return result.data;
}

/**
 * Validate server-only environment variables
 */
export function validateServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n');
    throw new Error(`Server environment variable validation failed:\n${errors}`);
  }

  return result.data;
}

/**
 * Validate public environment variables
 */
export function validatePublicEnv(): PublicEnv {
  const result = publicEnvSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join('\n');
    throw new Error(`Public environment variable validation failed:\n${errors}`);
  }

  return result.data;
}
