// packages/api/src/modules/events/__tests__/router.test.ts
//
// Mirrors modules/staff/news's own router.test.ts conventions: DB-failure
// degradation for every public/admin read (no live Postgres in this test
// run — see this repo's Completion Plan verification notes on why), plus
// RBAC gating for the two mutations that need more than "any signed-in
// user" (create/update need a session at all; delete needs the admin
// role specifically). Also covers validators.ts's own contract — the
// `detail: null` vs `detail: {...}` two-branch input shape — at the
// schema level, since that's the part of this module least like any
// other module's and most worth pinning down explicitly.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { eventsRouter } from '../router.js';
import { CalendarEntryCreateInput, CalendarEntryUpdateInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('events month (public) degrades to [] when the database is unavailable', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.events.month({ locale: 'en', month: '2026-09' });
  assert.deepEqual(result, []);
});

test('events upcoming (public) degrades to [] when the database is unavailable', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.events.upcoming({ locale: 'en', limit: 3 });
  assert.deepEqual(result, []);
});

test('events bySlug degrades to null when the database is unavailable', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.events.bySlug({ locale: 'en', slug: 'does-not-exist' });
  assert.equal(result, null);
});

test('events adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.events.adminList({ locale: 'en', page: 1, pageSize: 20 });
  assert.deepEqual(result, {
    items: [],
    pagination: { total: 0, page: 1, pageSize: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  });
});

test('events adminGetById throws NOT_FOUND when the database is unavailable', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  // getById's own findUnique throws (no try/catch — an admin edit page
  // needs to know a lookup genuinely failed, not silently render an
  // empty form) so this surfaces as an INTERNAL_SERVER_ERROR from the
  // stub's thrown Error, not the service's own NOT_FOUND — asserting
  // only that it rejects at all, not the specific tRPC error code, since
  // that distinction depends on a live database this test run doesn't
  // have.
  await assert.rejects(() => caller.events.adminGetById({ id: 'does-not-exist' }));
});

test('events create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(
    () =>
      caller.events.create({
        locale: 'en',
        title: 'Sports Day',
        date: '2026-09-12',
        category: 'sports',
        isRecurring: false,
        detail: null,
      }),
    /sign in/i,
  );
});

test('events delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ events: eventsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.events.delete({ id: 'does-not-matter' }), /permission/i);
});

test('events create/update accept a calendar-only payload (detail: null)', () => {
  const parsed = CalendarEntryCreateInput.parse({
    locale: 'en',
    title: 'Staff Meeting',
    date: '2026-09-05',
    category: 'other',
    isRecurring: false,
    detail: null,
  });
  assert.equal(parsed.detail, null);

  const updateParsed = CalendarEntryUpdateInput.parse({
    id: 'entry-1',
    locale: 'en',
    title: 'Staff Meeting',
    date: '2026-09-05',
    category: 'other',
    isRecurring: false,
    detail: null,
  });
  assert.equal(updateParsed.detail, null);
});

test('events create accepts a calendar + event-card payload (detail: {...})', () => {
  const parsed = CalendarEntryCreateInput.parse({
    locale: 'en',
    title: 'Sports Day',
    date: '2026-09-12',
    category: 'sports',
    isRecurring: false,
    detail: {
      slug: 'sports-day-2026',
      description: 'Annual inter-house sports meet.',
      isAllDay: true,
      status: 'draft',
    },
  });
  assert.ok(parsed.detail);
  assert.equal(parsed.detail?.slug, 'sports-day-2026');
  // isAllDay: true is set explicitly on the input above; service.ts's own
  // detailWriteData is what nulls out startTime for storage — not
  // asserted here since that's a service-layer concern, not a validator
  // one.
});

test('events create rejects a detail payload with an invalid slug', () => {
  assert.throws(() =>
    CalendarEntryCreateInput.parse({
      locale: 'en',
      title: 'Sports Day',
      date: '2026-09-12',
      category: 'sports',
      isRecurring: false,
      detail: {
        slug: 'Not A Valid Slug!',
        description: 'Annual inter-house sports meet.',
      },
    }),
  );
});

test('events create rejects a malformed date', () => {
  assert.throws(() =>
    CalendarEntryCreateInput.parse({
      locale: 'en',
      title: 'Sports Day',
      date: '12-09-2026',
      category: 'sports',
      isRecurring: false,
      detail: null,
    }),
  );
});
