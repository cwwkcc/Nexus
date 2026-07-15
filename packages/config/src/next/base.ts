// packages/config/src/next/base.ts
import type { NextConfig } from 'next';

import { r2RemotePatterns } from './images.js';
import { defaultRedirects } from './redirects.js';

// @nexus/env added: metadata.ts (this package) now imports
// @nexus/env/client, which contains literal `process.env.NEXT_PUBLIC_*`
// references. Workspace packages get bundled by webpack regardless of
// this list, but transpilePackages is what's needed for genuinely new
// syntax/JSX to get processed correctly. @nexus/env ships plain
// pre-compiled JS with no JSX, so this addition is precautionary rather
// than a confirmed fix — worth a quick smoke test (check that
// `NEXT_PUBLIC_SITE_URL` resolves to a real value, not undefined, in the
// actual built browser bundle) rather than assuming it's necessary.
const BASE_TRANSPILE_PACKAGES = ['@nexus/ui', '@nexus/api', '@nexus/contracts', '@nexus/config', '@nexus/env'];
const BASE_OPTIMIZE_IMPORTS = ['@nexus/ui', 'framer-motion', 'lucide-react'];

interface CreateNextConfigOptions {
  transpilePackages?: string[];
  optimizePackageImports?: string[];
  overrides?: NextConfig;
}

export function createNextConfig(options: CreateNextConfigOptions = {}): NextConfig {
  const { transpilePackages = [], optimizePackageImports = [], overrides = {} } = options;

  return {
    transpilePackages: [...new Set([...BASE_TRANSPILE_PACKAGES, ...transpilePackages])],
    experimental: {
      optimizePackageImports: [...new Set([...BASE_OPTIMIZE_IMPORTS, ...optimizePackageImports])],
    },
    images: { remotePatterns: r2RemotePatterns() },
    redirects: defaultRedirects,
    webpack: (config) => {
      config.resolve.extensionAlias = {
        ...config.resolve.extensionAlias,
        '.js': ['.js', '.ts', '.tsx'],
        '.jsx': ['.jsx', '.tsx'],
      };
      return config;
    },
    ...overrides,
  };
}
