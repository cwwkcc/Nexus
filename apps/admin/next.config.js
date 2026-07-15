// apps/admin/next.config.js
const { createAdminConfig } = require('@nexus/config/next');
const { composePlugins, withNx } = require('@nx/next');

const nextConfig = {
  ...createAdminConfig(),
  nx: {},
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
