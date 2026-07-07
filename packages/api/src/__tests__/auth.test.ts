import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../context.js';
import { adminProcedure, createCallerFactory, router } from '../trpc.js';
import { contentEntryRouter } from '../routers/content-entry.js';

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

test('content entry reads degrade gracefully when the database is unavailable', async () => {
  const testRouter = router({
    contentEntry: contentEntryRouter,
  });

  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext());

  const result = await caller.contentEntry.getByScope({
    scope: 'page:home',
    locale: 'en',
  });

  assert.deepEqual(result, {});
});
