// packages/api/src/modules/extracurriculars/__tests__/router.test.ts
//
// Same conventions as modules/societies/gallery's own router.test.ts
// files — DB-failure degradation for every public/admin read, RBAC
// gating for create/delete, plus a couple of checks on validators.ts's
// own achievements-array contract (the `id`-present-means-update /
// `id`-absent-means-create convention, and date-format validation).

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { extracurricularsRouter } from '../router.js';
import { ExtracurricularActivityCreateInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('extracurriculars list (public) degrades to [] when the database is unavailable', async () => {
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.extracurriculars.list({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('extracurriculars adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.extracurriculars.adminList({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('extracurriculars adminGetById throws when the database is unavailable', async () => {
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  // No try/catch in getById (see service.ts) — an admin edit page needs
  // to know a lookup genuinely failed, not silently render an empty form.
  await assert.rejects(() => caller.extracurriculars.adminGetById({ id: 'does-not-exist' }));
});

test('extracurriculars create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.extracurriculars.create({
      locale: 'en',
      name: 'Cricket',
      category: 'sports',
      description: 'The school\u2019s senior cricket team.',
      isActive: true,
      achievements: [],
    }),
  );
});

test('extracurriculars delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.extracurriculars.delete({ id: 'does-not-matter' }), /permission/i);
});

test('extracurriculars update (isActive toggle) is allowed for a signed-in Editor (not admin-only)', async () => {
  // update stays on adminMutation (any signed-in Editor or Admin) — this
  // asserts it fails with the stub's own thrown "no live database" error,
  // not a permission error, proving the RBAC gate isn't what rejected it.
  // This is the mechanism behind F-179's "active/inactive status": an
  // Editor retires a team through the normal update form, not a
  // dedicated admin-only action.
  const testRouter = router({ extracurriculars: extracurricularsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () =>
      caller.extracurriculars.update({
        id: 'does-not-matter',
        locale: 'en',
        name: 'Cricket',
        category: 'sports',
        description: 'The school\u2019s senior cricket team.',
        isActive: false,
        achievements: [],
      }),
    (err: unknown) => !(err instanceof Error && /permission/i.test(err.message)),
  );
});

test('extracurriculars create rejects a malformed achievement date', () => {
  assert.throws(() =>
    ExtracurricularActivityCreateInput.parse({
      locale: 'en',
      name: 'Cricket',
      category: 'sports',
      description: 'The school\u2019s senior cricket team.',
      isActive: true,
      achievements: [{ title: 'Zonal Champions', level: 'district', date: '14th March 2026' }],
    }),
  );
});

test('extracurriculars create accepts achievements without an id (new) alongside ones with one (existing)', () => {
  const parsed = ExtracurricularActivityCreateInput.parse({
    locale: 'en',
    name: 'Cricket',
    category: 'sports',
    description: 'The school\u2019s senior cricket team.',
    isActive: true,
    achievements: [
      { id: 'existing-achievement-1', title: 'Zonal Champions', level: 'district', date: '2026-03-14' },
      { title: 'Provincial Runners-Up', level: 'provincial', date: '2026-04-02' },
    ],
  });
  assert.equal(parsed.achievements[0]?.id, 'existing-achievement-1');
  assert.equal(parsed.achievements[1]?.id, undefined);
});

test('extracurriculars create rejects an invalid category', () => {
  assert.throws(() =>
    ExtracurricularActivityCreateInput.parse({
      locale: 'en',
      name: 'Cricket',
      category: 'athletics',
      description: 'The school\u2019s senior cricket team.',
      isActive: true,
      achievements: [],
    }),
  );
});
