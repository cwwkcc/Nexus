import nx from '@nx/eslint-plugin';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    // No tailwind.config.js of its own — apps/web and apps/admin share the
    // same nexusPreset, so this gives eslint-plugin-tailwindcss the real
    // theme instead of stock Tailwind. Revisit if the presets ever diverge.
    settings: {
      tailwindcss: {
        config: `${import.meta.dirname}/../../apps/web/tailwind.config.js`,
      },
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}', '{projectRoot}/vite.config.{js,ts,mjs,mts}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    ignores: ['**/out-tsc'],
  },
];
