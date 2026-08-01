// packages/api/src/modules/content/__tests__/router.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { contentEntryRouter } from '../router.js';

// adminGetByScope requires a signed-in session as of Task 6.3 — this test
// is about DB-unavailability behavior, not auth, so it authenticates as any
// valid admin rather than exercising (or bypassing) the auth gate itself.
const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };

test('content entry reads degrade gracefully when the database is unavailable', async () => {
  const testRouter = router({ contentEntry: contentEntryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.contentEntry.adminGetByScope({
    scope: 'page:home',
    locale: 'en',
  });

  assert.deepEqual(result, {});
});
