// packages/api/src/__tests__/auth.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../context.js';
import type { SessionContext } from '../init.js';
import { adminOnlyProcedure, adminProcedure, createCallerFactory, router } from '../trpc.js';

const editorSession: SessionContext = { userId: 'user_1', email: 'editor@cwwkcc.lk', role: 'editor' };
const adminSession: SessionContext = { userId: 'user_2', email: 'admin@cwwkcc.lk', role: 'admin' };

test('adminProcedure rejects a request with no session', async () => {
  const testRouter = router({ ping: adminProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(null));

  await assert.rejects(() => caller.ping(), { code: 'UNAUTHORIZED' });
});

test('adminProcedure accepts any signed-in role (editor)', async () => {
  const testRouter = router({ ping: adminProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(editorSession));

  assert.equal(await caller.ping(), 'ok');
});

test('adminProcedure accepts any signed-in role (admin)', async () => {
  const testRouter = router({ ping: adminProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(adminSession));

  assert.equal(await caller.ping(), 'ok');
});

test('adminOnlyProcedure rejects a signed-in editor', async () => {
  const testRouter = router({ ping: adminOnlyProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(editorSession));

  await assert.rejects(() => caller.ping(), { code: 'FORBIDDEN' });
});

test('adminOnlyProcedure rejects an unauthenticated request', async () => {
  const testRouter = router({ ping: adminOnlyProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(null));

  await assert.rejects(() => caller.ping(), { code: 'UNAUTHORIZED' });
});

test('adminOnlyProcedure accepts an admin', async () => {
  const testRouter = router({ ping: adminOnlyProcedure.query(() => 'ok') });
  const caller = createCallerFactory(testRouter)(createContext(adminSession));

  assert.equal(await caller.ping(), 'ok');
});
