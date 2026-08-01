import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { newsRouter } from '../router.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };

test('news list is resilient when the database is unavailable', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.news.adminList({ locale: 'en' });
  assert.deepEqual(result, []);
});
