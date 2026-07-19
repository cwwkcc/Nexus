// packages/api/src/modules/content/__tests__/router.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { contentEntryRouter } from '../router.js';

test('content entry reads degrade gracefully when the database is unavailable', async () => {
  const testRouter = router({ contentEntry: contentEntryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext());

  const result = await caller.contentEntry.adminGetByScope({
    scope: 'page:home',
    locale: 'en',
  });

  assert.deepEqual(result, {});
});
