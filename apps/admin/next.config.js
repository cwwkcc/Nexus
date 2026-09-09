// apps/admin/next.config.js
const path = require('node:path');
const { loadEnvFile } = require('node:process');

loadEnvFile(path.resolve(__dirname, '../../.env'));

for (const key of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SENTRY_DSN']) {
  if (!process.env[key]) delete process.env[key];
}

const { createAdminConfig } = require('@nexus/config/next');
const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  ...createAdminConfig(),
  nx: {},
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
