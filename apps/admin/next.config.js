//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  transpilePackages: ['@nexus/ui', '@nexus/api', '@nexus/contracts'],
  experimental: {
    optimizePackageImports: ['@nexus/ui', 'framer-motion', 'lucide-react'],
  },
  // See apps/web/next.config.js for why this is needed: our workspace
  // packages use nodenext-style `.js` import specifiers that point at
  // `.ts` source files. Webpack needs this alias to resolve them.
  // Requires running with `next dev --webpack` / `next build --webpack`
  // (Turbopack doesn't support this yet: vercel/next.js#82945).
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
