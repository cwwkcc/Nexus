// packages/api/src/modules/alumni/__tests__/router.test.ts
//
// Same DB-unavailable convention as every other M4 module's own
// router.test.ts — no DATABASE_URL / live Postgres in this test run, so
// every read must degrade to an empty result rather than throw, and every
// admin-only write must be rejected before it ever reaches the
// (unavailable) database.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { alumniRouter } from '../router.js';
import { AlumniSubmitInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('alumni list (public) degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.alumni.list({ page: 1, pageSize: 20 });
  assert.deepEqual(result.items, []);
  assert.equal(result.pagination.total, 0);
});

test('alumni submit (public) does not throw when the database is unavailable, and reports failure', async () => {
  // Unlike every other write path in this module (and every mutation in
  // every other M4 module), submitProfile deliberately swallows a genuine
  // save failure and reports `{ success: false }` rather than throwing —
  // see that function's own header note in service.ts on why a
  // public-facing write endpoint shouldn't leak a 500 to an anonymous
  // caller. This test pins that behaviour down: a caller with no live
  // database still gets a clean `{ success: false }`, not a thrown error.
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.alumni.submit({
    name: 'Test Alumnus',
    graduationYear: '2020',
  });
  assert.equal(result.success, false);
});

test('alumni adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.alumni.adminList({ page: 1, pageSize: 20 });
  assert.deepEqual(result.items, []);
});

test('alumni adminGetById throws when the database is unavailable', async () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  await assert.rejects(() => caller.alumni.adminGetById({ id: 'does-not-exist' }));
});

test('alumni create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.alumni.create({
      name: 'Test Alumnus',
      graduationYear: '2020',
    }),
  );
});

test('alumni delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.alumni.delete({ id: 'does-not-matter' }), /permission/i);
});

test('alumni setStatus (moderation) is allowed for a signed-in Editor (not admin-only)', async () => {
  // setStatus/bulkSetStatus stay on adminMutation (any signed-in Editor or
  // Admin) — approving/rejecting a submission is the RBAC matrix's
  // `publish` grant, which Editors hold on `alumni` (see
  // packages/contracts/src/system/rbac/matrix.ts's own note on why this
  // module is shaped like `events`, not `staff`). This asserts the call
  // fails with the stub's own thrown "no live database" error, not a
  // permission error, proving the RBAC gate isn't what rejected it.
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () => caller.alumni.setStatus({ id: 'does-not-matter', status: 'APPROVED' }),
    (err: unknown) => !(err instanceof Error && /permission/i.test(err.message)),
  );
});

test('alumni submit rejects a payload missing a required field', () => {
  assert.throws(() =>
    AlumniSubmitInput.parse({
      graduationYear: '2020',
      // name omitted
    }),
  );
});

test('alumni submit input schema strips fields a public caller must not set', () => {
  // AlumniSubmitInput.pick()s off AlumniInputSchema, so status/
  // isFeatureworthy/rejectionReason/portrait were never picked in the
  // first place — a plain z.object() also silently drops any unrecognized
  // key by default, so even a caller who sends them anyway loses them at
  // the parse boundary, before submitProfile's own server-side
  // enforcement (see that function's header note) ever runs.
  const parsed = AlumniSubmitInput.parse({
    name: 'Test Alumnus',
    graduationYear: '2020',
    status: 'APPROVED',
    isFeatureworthy: true,
    rejectionReason: 'not applicable',
    portrait: { src: 'x', alt: 'x' },
  });

  assert.equal('status' in parsed, false);
  assert.equal('isFeatureworthy' in parsed, false);
  assert.equal('rejectionReason' in parsed, false);
  assert.equal('portrait' in parsed, false);
});

test('alumni bulkSetStatus requires at least one id', () => {
  const testRouter = router({ alumni: alumniRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  assert.rejects(() => caller.alumni.bulkSetStatus({ ids: [], status: 'APPROVED' }));
});
