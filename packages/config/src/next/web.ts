// packages/config/src/next/web.ts
import type { NextConfig } from 'next';

import { createNextConfig } from './base.js';

/** apps/web-specific config. No divergence from base yet — this is the extension point. */
export function createWebConfig(overrides: NextConfig = {}): NextConfig {
  return createNextConfig({ overrides });
}
