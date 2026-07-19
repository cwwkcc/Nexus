// packages/env/src/__tests__/utils.test.ts
//
// process.env.NODE_ENV is typed `readonly` by Next.js's global ProcessEnv
// augmentation (next/types/global.d.ts), so TS blocks assignment/delete
// on it here too, outside any Next app. Casting to a plain Record
// sidesteps that — type-only, no runtime effect.

import assert from 'node:assert/strict';
import test from 'node:test';

import { isCI, isDevelopment, isProduction, isTest } from '../utils.js';

const env = process.env as Record<string, string | undefined>;

test('isProduction/isDevelopment/isTest reflect NODE_ENV exactly', () => {
  env.NODE_ENV = 'production';
  assert.equal(isProduction(), true);
  assert.equal(isDevelopment(), false);
  assert.equal(isTest(), false);

  env.NODE_ENV = 'development';
  assert.equal(isProduction(), false);
  assert.equal(isDevelopment(), true);
  assert.equal(isTest(), false);

  env.NODE_ENV = 'test';
  assert.equal(isProduction(), false);
  assert.equal(isDevelopment(), false);
  assert.equal(isTest(), true);

  delete env.NODE_ENV;
});

test('isCI is true for "true" or "1", false otherwise', () => {
  env.CI = 'true';
  assert.equal(isCI(), true);

  env.CI = '1';
  assert.equal(isCI(), true);

  env.CI = 'false';
  assert.equal(isCI(), false);

  delete env.CI;
  assert.equal(isCI(), false);
});
