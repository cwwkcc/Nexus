// packages/api/src/config.ts

// Single place this package reads process.env. Everything downstream
// (context, middleware, services) consumes `ApiConfig` through
// `ctx.config` instead of touching `process.env` directly. This replaces

export interface ApiConfig {
  /** Comparison target for the temporary admin-secret auth stub — see
   *  middleware/auth.ts. Trimmed; an empty string is treated as unset. */
  adminSecret: string | null;
  revalidate: {
    /** On-demand cache invalidation (F-195) — see modules/content/service.ts. */
    webAppUrl: string | null;
    secret: string | null;
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
    adminSecret: env.ADMIN_API_SECRET?.trim() || null,
    revalidate: {
      webAppUrl: env.WEB_APP_URL_INTERNAL?.trim() || null,
      secret: env.REVALIDATE_SECRET?.trim() || null,
    },
  };
}
