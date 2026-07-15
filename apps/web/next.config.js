// apps/web/next.config.js
const { createWebConfig } = require('@nexus/config/next');
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  ...createWebConfig(),
  nx: {},
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
