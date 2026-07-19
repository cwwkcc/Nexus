// packages/api/src/__tests__/config.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { loadApiConfig } from '../config.js';

test('loadApiConfig trims the admin secret', () => {
  const config = loadApiConfig({ ADMIN_API_SECRET: '  test-secret  ' } as NodeJS.ProcessEnv);
  assert.equal(config.adminSecret, 'test-secret');
});

test('loadApiConfig treats an unset or empty admin secret as null (bootstrap mode)', () => {
  assert.equal(loadApiConfig({} as NodeJS.ProcessEnv).adminSecret, null);
  assert.equal(loadApiConfig({ ADMIN_API_SECRET: '' } as NodeJS.ProcessEnv).adminSecret, null);
});

test('loadApiConfig resolves revalidate settings independently of the admin secret', () => {
  const config = loadApiConfig({
    WEB_APP_URL_INTERNAL: 'http://web:3000',
    REVALIDATE_SECRET: 'shh',
  } as NodeJS.ProcessEnv);

  assert.equal(config.revalidate.webAppUrl, 'http://web:3000');
  assert.equal(config.revalidate.secret, 'shh');
  assert.equal(config.adminSecret, null);
});
