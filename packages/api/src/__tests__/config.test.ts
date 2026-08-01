// packages/api/src/__tests__/config.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { loadApiConfig } from '../config.js';

test('loadApiConfig resolves revalidate settings from the environment', () => {
  const config = loadApiConfig({
    WEB_APP_URL_INTERNAL: 'http://web:3000',
    REVALIDATE_SECRET: 'shh',
  } as NodeJS.ProcessEnv);

  assert.equal(config.revalidate.webAppUrl, 'http://web:3000');
  assert.equal(config.revalidate.secret, 'shh');
});

test('loadApiConfig treats unset revalidate settings as null', () => {
  const config = loadApiConfig({} as NodeJS.ProcessEnv);

  assert.equal(config.revalidate.webAppUrl, null);
  assert.equal(config.revalidate.secret, null);
});
