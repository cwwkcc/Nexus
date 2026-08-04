// packages/api/src/config.ts

// Single place this package reads process.env. Everything downstream
// (context, middleware, services) consumes `ApiConfig` through
// `ctx.config` instead of touching `process.env` directly.
//
// `adminSecret` (the former `x-admin-secret` bootstrap stub) is gone as of
// Task 6.3 — real Auth.js sessions replace it entirely, see init.ts's
// `SessionContext` and middleware/auth.ts.

export interface ApiConfig {
  revalidate: {
    /** On-demand cache invalidation (F-195) — see modules/content/service.ts. */
    webAppUrl: string | null;
    secret: string | null;
  };
  /**
   * Cloudflare R2 (S3-compatible), used only by modules/media (F-067/F-120).
   * All five are required together in any environment that actually serves
   * uploads — `null` here means "not configured", and modules/media/
   * r2-client.ts throws a clear config error rather than letting the AWS
   * SDK fail confusingly deep inside a signed-request call.
   */
  r2: {
    accountId: string | null;
    accessKeyId: string | null;
    secretAccessKey: string | null;
    bucketName: string | null;
    publicUrl: string | null;
  };
}

/**
 * Deliberately NOT memoised into a module-level singleton — this must read
 * process.env fresh on every call. context.ts calls it once per request, so
 * this is no more expensive than the original code's inline process.env
 * reads, and it means changing an env var (or, in tests, mutating
 * process.env between cases) takes effect immediately rather than only on
 * process restart.
 */
export function loadApiConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  return {
    revalidate: {
      webAppUrl: env.WEB_APP_URL_INTERNAL?.trim() || null,
      secret: env.REVALIDATE_SECRET?.trim() || null,
    },
    r2: {
      accountId: env.R2_ACCOUNT_ID?.trim() || null,
      accessKeyId: env.R2_ACCESS_KEY_ID?.trim() || null,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY?.trim() || null,
      bucketName: env.R2_BUCKET_NAME?.trim() || null,
      publicUrl: env.R2_PUBLIC_URL?.trim().replace(/\/+$/, '') || null,
    },
  };
}
