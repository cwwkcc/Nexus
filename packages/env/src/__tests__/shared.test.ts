// packages/env/src/__tests__/shared.test.ts
//
// shared.ts parses NODE_ENV eagerly at import time — cache-bust the
// specifier so each test gets a fresh evaluation. NODE_ENV is also typed
// `readonly` by Next's global augmentation (see utils.test.ts), so it's
// mutated through the same Record-cast alias.

import assert from 'node:assert/strict';
import test from 'node:test';

const env = process.env as Record<string, string | undefined>;

async function freshSharedEnv() {
  const mod = await import(`../shared.js?t=${Date.now()}-${Math.random()}`);
  return mod.sharedEnv;
}

test('sharedEnv defaults NODE_ENV to development when unset', async () => {
  delete env.NODE_ENV;
  const { NODE_ENV } = await freshSharedEnv();
  assert.equal(NODE_ENV, 'development');
});

test('sharedEnv accepts a valid NODE_ENV value', async () => {
  env.NODE_ENV = 'production';
  const { NODE_ENV } = await freshSharedEnv();
  assert.equal(NODE_ENV, 'production');
  delete env.NODE_ENV;
});

test('sharedEnv rejects an invalid NODE_ENV value', async () => {
  env.NODE_ENV = 'staging';
  await assert.rejects(freshSharedEnv(), /Invalid shared environment variables/);
  delete env.NODE_ENV;
});
