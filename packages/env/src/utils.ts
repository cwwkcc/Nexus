// packages/env/src/utils.ts
//
// No isVercel() here — the original sketch for this package included one,
// but Nexus is self-hosted on Hetzner behind Caddy, not deployed to
// Vercel, so it'd never be true and has no caller. Same reasoning for
// skipping a "preview" environment preset: that's a Vercel deployment
// concept, and self-hosting only ever has development/production/test.
//
// Four scattered `process.env.NODE_ENV === 'development'` checks already
// exist in the app (Footer.tsx, both error.tsx boundaries, global-error.tsx)
// — worth swapping those to isDevelopment() once this package is wired up,
// so there's one source of truth instead of four string comparisons.

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function isCI(): boolean {
  return process.env.CI === 'true' || process.env.CI === '1';
}
