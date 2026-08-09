// packages/api/src/modules/staff/__tests__/router.test.ts
//
// Same DB-unavailable convention as modules/news/__tests__/router.test.ts —
// no DATABASE_URL / live Postgres in this test run, so every read must
// degrade to an empty result rather than throw, and every admin-only write
// must be rejected before it ever reaches the (unavailable) database.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { staffRouter } from '../router.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('staff byRole (public) degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.staff.byRole({ role: 'principal' });
  assert.deepEqual(result, []);
});

test('staff byId (public) degrades to null when the database is unavailable', async () => {
  // Added for Societies (Task 7.6, F-148) — see service.ts's own doc
  // comment on why this needed a separate public-safe lookup.
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.staff.byId({ id: 'does-not-matter' });
  assert.equal(result, null);
});

test('staff adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.staff.adminList({});
  assert.deepEqual(result, []);
});

test('staff byRole is rejected for an unsupported role value', async () => {
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() => caller.staff.byRole({ role: 'archivist' as never }));
});

test('staff create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.staff.create({
      name: 'Test Person',
      role: 'teacher',
      title: 'Test Title',
    }),
  );
});

test('staff delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ staff: staffRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.staff.delete({ id: 'does-not-matter' }), /permission/i);
});
