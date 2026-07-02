// apps/web/next.config.js
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} */
const nextConfig = {
  nx: {},
  transpilePackages: [
    '@nexus/ui',
    '@nexus/api',
    '@nexus/contracts',
    '@nexus/config',
  ],
  // serverExternalPackages removed entirely
  experimental: {
    optimizePackageImports: ['@nexus/ui', 'framer-motion', 'lucide-react'],
  },
  // Our workspace packages (api, contracts, database) are written with
  // TypeScript's `nodenext` module resolution, which requires relative
  // imports to use a `.js` extension even though the actual files are
  // `.ts` (e.g. `import x from './root.js'` when only `root.ts` exists).
  // This is valid Node/TS behavior and works fine with `tsx`/`ts-node`,
  // but Webpack needs to be told explicitly to try `.ts`/`.tsx` when it
  // sees a `.js` specifier that doesn't exist on disk.
  //
  // NOTE: this only works when Next.js is run WITHOUT Turbopack
  // (`next dev --webpack` / `next build --webpack`). Turbopack does not
  // yet support this aliasing — see https://github.com/vercel/next.js/issues/82945
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    return config;
  },
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
