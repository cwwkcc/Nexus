/**
 * Shared Next.js configuration
 *
 * This configuration is shared between apps/web and apps/admin to reduce
 * duplication and ensure consistency across applications.
 */

import type { NextConfig } from 'next';

/**
 * Shared Next.js configuration
 *
 * @example
 * ```js
 * // apps/web/next.config.js
 * const { sharedNextConfig } = require('@nexus/config/next');
 *
 * const nextConfig = {
 *   ...sharedNextConfig,
 *   // app-specific additions
 * };
 * ```
 */
export const sharedNextConfig: NextConfig = {
  transpilePackages: ['@nexus/ui', '@nexus/api', '@nexus/contracts', '@nexus/config'],
  experimental: {
    optimizePackageImports: ['@nexus/ui', 'framer-motion', 'lucide-react'],
  },
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    return config;
  },
};
