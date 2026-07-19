// packages/api/src/__tests__/auth.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../context.js';
import { adminProcedure, createCallerFactory, router } from '../trpc.js';

test('server-side callers can authenticate with the configured admin secret', async () => {
  process.env.ADMIN_API_SECRET = 'test-secret';

  const testRouter = router({
    ping: adminProcedure.query(() => 'ok'),
  });

  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext());

  assert.equal(await caller.ping(), 'ok');
});

test('admin procedures are accessible without a configured secret in bootstrap mode', async () => {
  delete process.env.ADMIN_API_SECRET;

  const testRouter = router({
    ping: adminProcedure.query(() => 'ok'),
  });

  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext());

  assert.equal(await caller.ping(), 'ok');
});

test('HTTP requests without the header are rejected once a secret is configured', async () => {
  process.env.ADMIN_API_SECRET = 'test-secret';

  const testRouter = router({
    ping: adminProcedure.query(() => 'ok'),
  });

  const createCaller = createCallerFactory(testRouter);
  // A real Headers object with no x-admin-secret set — this is the "HTTP
  // caller forgot the header" case, distinct from createContext() with no
  // argument at all (the direct server caller case, tested above).
  const caller = createCaller(createContext(new Headers()));

  await assert.rejects(() => caller.ping(), { code: 'UNAUTHORIZED' });
});

test('HTTP requests with the correct header are accepted', async () => {
  process.env.ADMIN_API_SECRET = 'test-secret';

  const testRouter = router({
    ping: adminProcedure.query(() => 'ok'),
  });

  const createCaller = createCallerFactory(testRouter);
  const headers = new Headers({ 'x-admin-secret': 'test-secret' });
  const caller = createCaller(createContext(headers));

  assert.equal(await caller.ping(), 'ok');
});

test('HTTP requests with the wrong header are rejected', async () => {
  process.env.ADMIN_API_SECRET = 'test-secret';

  const testRouter = router({
    ping: adminProcedure.query(() => 'ok'),
  });

  const createCaller = createCallerFactory(testRouter);
  const headers = new Headers({ 'x-admin-secret': 'wrong-secret' });
  const caller = createCaller(createContext(headers));

  await assert.rejects(() => caller.ping(), { code: 'UNAUTHORIZED' });
});
