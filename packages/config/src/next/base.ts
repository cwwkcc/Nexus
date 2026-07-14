// packages/config/src/next/base.ts

import type { NextConfig } from 'next';

import { r2RemotePatterns } from './images';

const BASE_TRANSPILE_PACKAGES = ['@nexus/ui', '@nexus/api', '@nexus/contracts', '@nexus/config'];
const BASE_OPTIMIZE_IMPORTS = ['@nexus/ui', 'framer-motion', 'lucide-react'];

interface CreateNextConfigOptions {
  transpilePackages?: string[];
  optimizePackageImports?: string[];
  /** Spread last — wins over everything above. */
  overrides?: NextConfig;
}

/**
 * @example
 * // apps/web/next.config.js
 * const { createNextConfig } = require('@nexus/config/next');
 * module.exports = createNextConfig();
 */
export function createNextConfig(options: CreateNextConfigOptions = {}): NextConfig {
  const { transpilePackages = [], optimizePackageImports = [], overrides = {} } = options;

  return {
    transpilePackages: [...new Set([...BASE_TRANSPILE_PACKAGES, ...transpilePackages])],
    experimental: {
      optimizePackageImports: [...new Set([...BASE_OPTIMIZE_IMPORTS, ...optimizePackageImports])],
    },
    images: {
      remotePatterns: r2RemotePatterns(),
    },
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
