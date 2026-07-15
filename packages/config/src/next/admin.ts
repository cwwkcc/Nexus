// packages/config/src/next/admin.ts
import type { NextConfig } from 'next';

import { createNextConfig } from './base.js';

/**
 * apps/admin-specific config. Adds X-Robots-Tag: noindex — the admin panel
 * is a login-gated internal tool, not something that belongs in search
 * results. infra/caddy/Caddyfile currently sends identical headers to both
 * domains; this closes that gap at the app level too.
 */
export function createAdminConfig(overrides: NextConfig = {}): NextConfig {
  return createNextConfig({
    overrides: {
      async headers() {
        return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
      },
      ...overrides,
    },
  });
}
