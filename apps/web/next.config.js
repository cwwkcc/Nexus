// apps/web/next.config.js
const path = require('node:path');
const { loadEnvFile } = require('node:process');

loadEnvFile(path.resolve(__dirname, '../../.env'));

for (const key of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SENTRY_DSN']) {
  if (!process.env[key]) delete process.env[key];
}

const { createWebConfig } = require('@nexus/config/next');
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  ...createWebConfig(),
  nx: {},
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
