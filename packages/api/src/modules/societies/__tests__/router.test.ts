// packages/api/src/modules/societies/__tests__/router.test.ts
//
// Same conventions as modules/staff/events's own router.test.ts files —
// DB-failure degradation for every public/admin read, RBAC gating for
// create/delete.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { societiesRouter } from '../router.js';
import { SocietyCreateInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('societies list (public) degrades to [] when the database is unavailable', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.societies.list({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('societies bySlug (public) degrades to null when the database is unavailable', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.societies.bySlug({ locale: 'en', slug: 'does-not-exist' });
  assert.equal(result, null);
});

test('societies adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.societies.adminList({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('societies adminGetById throws when the database is unavailable', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  // No try/catch in getById (see service.ts) — an admin edit page needs
  // to know a lookup genuinely failed, not silently render an empty form.
  await assert.rejects(() => caller.societies.adminGetById({ id: 'does-not-exist' }));
});

test('societies create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.societies.create({
      locale: 'en',
      slug: 'science-society',
      name: 'Science Society',
      category: 'academic',
      isFeatured: false,
    }),
  );
});

test('societies delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ societies: societiesRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.societies.delete({ id: 'does-not-matter' }), /permission/i);
});

test('societies create rejects an invalid slug', () => {
  assert.throws(() =>
    SocietyCreateInput.parse({
      locale: 'en',
      slug: 'Not A Valid Slug!',
      name: 'Science Society',
      category: 'academic',
      isFeatured: false,
    }),
  );
});
