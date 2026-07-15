import nextEslintPluginNext from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';

import baseConfig from '../../eslint.config.mjs';

export default [
  { plugins: { '@next/next': nextEslintPluginNext } },
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    settings: {
      tailwindcss: {
        config: `${import.meta.dirname}/tailwind.config.js`,
      },
    },
  },
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
];
