// packages/api/src/modules/announcements/__tests__/router.test.ts
//
// Same conventions as every other M4 module's own router.test.ts — DB-
// failure degradation, RBAC gating for create/delete, plus a couple of
// checks pinning down validators.ts's own contract (variant enum,
// datetime format).

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { announcementsRouter } from '../router.js';
import { AnnouncementCreateInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('announcements getActive (public) degrades to null when the database is unavailable', async () => {
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.announcements.getActive({ locale: 'en' });
  assert.equal(result, null);
});

test('announcements adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.announcements.adminList({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('announcements adminGetById throws when the database is unavailable', async () => {
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  await assert.rejects(() => caller.announcements.adminGetById({ id: 'does-not-exist' }));
});

test('announcements create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.announcements.create({
      locale: 'en',
      variant: 'info',
      message: 'School closed tomorrow for a public holiday.',
      isActive: true,
    }),
  );
});

test('announcements delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.announcements.delete({ id: 'does-not-matter' }), /permission/i);
});

test('announcements deactivate is allowed for a signed-in Editor (not admin-only)', async () => {
  // deactivate stays on adminMutation (any signed-in Editor or Admin) —
  // this asserts it fails with the stub's own thrown "no live database"
  // error, not a permission error, proving the RBAC gate isn't what
  // rejected it.
  const testRouter = router({ announcements: announcementsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () => caller.announcements.deactivate({ id: 'does-not-matter' }),
    (err: unknown) => !(err instanceof Error && /permission/i.test(err.message)),
  );
});

test('announcements create rejects an unsupported variant', () => {
  assert.throws(() =>
    AnnouncementCreateInput.parse({
      locale: 'en',
      variant: 'success', // valid on the unrelated page-block AnnouncementSchema, not here
      message: 'Test',
      isActive: true,
    }),
  );
});

test('announcements create rejects a malformed publishAt', () => {
  assert.throws(() =>
    AnnouncementCreateInput.parse({
      locale: 'en',
      variant: 'info',
      message: 'Test',
      publishAt: '12-09-2026',
      isActive: true,
    }),
  );
});

test('announcements create defaults variant to info and isActive to true', () => {
  const parsed = AnnouncementCreateInput.parse({
    locale: 'en',
    message: 'Test announcement',
  });
  assert.equal(parsed.variant, 'info');
  assert.equal(parsed.isActive, true);
});
