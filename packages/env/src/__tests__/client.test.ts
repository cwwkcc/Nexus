// packages/env/src/__tests__/client.test.ts
//
// Same cache-busting approach as shared.test.ts. Note: server.ts can't be
// tested this way — it imports `server-only`, which throws outside Next's
// RSC-aware build pipeline (see server.ts's own comment / the README).

import assert from 'node:assert/strict';
import test from 'node:test';

async function freshClientEnv() {
  const mod = await import(`../client.js?t=${Date.now()}-${Math.random()}`);
  return mod.clientEnv;
}

test('clientEnv parses valid NEXT_PUBLIC_* values', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://cwwkcc.lk';
  process.env.NEXT_PUBLIC_ADMIN_URL = 'https://admin.cwwkcc.lk';
  delete process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  const clientEnv = await freshClientEnv();

  assert.equal(clientEnv.NEXT_PUBLIC_SITE_URL, 'https://cwwkcc.lk');
  assert.equal(clientEnv.NEXT_PUBLIC_ADMIN_URL, 'https://admin.cwwkcc.lk');
  assert.equal(clientEnv.NEXT_PUBLIC_UMAMI_WEBSITE_ID, undefined);

  delete process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.NEXT_PUBLIC_ADMIN_URL;
});

test('an unset NEXT_PUBLIC_SITE_URL fails loudly instead of falling back to a hardcoded URL', async () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_ADMIN_URL = 'https://admin.cwwkcc.lk';

  await assert.rejects(freshClientEnv(), /NEXT_PUBLIC_SITE_URL/);

  delete process.env.NEXT_PUBLIC_ADMIN_URL;
});

test('a non-URL value is rejected', async () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'not-a-url';
  process.env.NEXT_PUBLIC_ADMIN_URL = 'https://admin.cwwkcc.lk';

  await assert.rejects(freshClientEnv(), /NEXT_PUBLIC_SITE_URL/);

  delete process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.NEXT_PUBLIC_ADMIN_URL;
});
