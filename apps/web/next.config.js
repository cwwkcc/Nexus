// apps/web/next.config.js
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: {},
  transpilePackages: ['@nexus/ui', '@nexus/api', '@nexus/validation'],
  experimental: {
    optimizePackageImports: ['@nexus/ui', 'framer-motion', 'lucide-react'],
  },
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
