// apps/web/next.config.js
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');
const { sharedNextConfig } = require('@nexus/config/next');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  ...sharedNextConfig,
  nx: {},
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
