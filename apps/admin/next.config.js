//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const { sharedNextConfig } = require('@nexus/config/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  ...sharedNextConfig,
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
