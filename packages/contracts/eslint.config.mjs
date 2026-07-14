// packages/contracts/eslint.config.mjs
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['src/primitives/**/*.ts'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/primitives',
              from: ['./src/blocks', './src/domains', './src/editorial', './src/shared', './src/system', './src/registry'],
              message: 'primitives/ is the foundation layer of @nexus/contracts — it must not depend on blocks/, domains/, editorial/, shared/, system/, or registry/. If primitives/ needs something from one of those folders, that code belongs in the importing layer instead, not here.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
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
