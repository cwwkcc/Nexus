// packages/api/src/modules/gallery/__tests__/router.test.ts
//
// Same conventions as modules/societies/staff/events' own router.test.ts
// files — DB-failure degradation for every public/admin read, RBAC
// gating for create/delete, plus a couple of checks on validators.ts's
// own photo-array contract (required alt text, the `id`-present-means-
// update / `id`-absent-means-create convention).

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { galleryRouter } from '../router.js';
import { GalleryAlbumCreateInput } from '../validators.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('gallery list (public) degrades to [] when the database is unavailable', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.gallery.list({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('gallery bySlug (public) degrades to null when the database is unavailable', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.gallery.bySlug({ locale: 'en', slug: 'does-not-exist' });
  assert.equal(result, null);
});

test('gallery adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.gallery.adminList({ locale: 'en' });
  assert.deepEqual(result, []);
});

test('gallery adminGetById throws when the database is unavailable', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  await assert.rejects(() => caller.gallery.adminGetById({ id: 'does-not-exist' }));
});

test('gallery create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.gallery.create({
      locale: 'en',
      slug: 'sports-day-2026',
      title: 'Sports Day 2026',
      year: 2026,
      order: 0,
      photos: [],
    }),
  );
});

test('gallery delete is rejected for a signed-in Editor (admin-role only)', async () => {
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(() => caller.gallery.delete({ id: 'does-not-matter' }), /permission/i);
});

test('gallery reorder is allowed for a signed-in Editor (not admin-only)', async () => {
  // reorder stays on adminMutation (any signed-in Editor or Admin) —
  // this asserts it fails with the stub's own thrown "no live database"
  // error, not a permission error, proving the RBAC gate isn't what
  // rejected it.
  const testRouter = router({ gallery: galleryRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () => caller.gallery.reorder({ locale: 'en', orderedIds: ['a', 'b'] }),
    (err: unknown) => !(err instanceof Error && /permission/i.test(err.message)),
  );
});

test('gallery create rejects a photo with empty alt text', () => {
  assert.throws(() =>
    GalleryAlbumCreateInput.parse({
      locale: 'en',
      slug: 'sports-day-2026',
      title: 'Sports Day 2026',
      year: 2026,
      order: 0,
      photos: [{ src: 'https://cdn.example.com/photo.webp', alt: '' }],
    }),
  );
});

test('gallery create accepts photos without an id (new) alongside photos with one (existing)', () => {
  const parsed = GalleryAlbumCreateInput.parse({
    locale: 'en',
    slug: 'sports-day-2026',
    title: 'Sports Day 2026',
    year: 2026,
    order: 0,
    photos: [
      { id: 'existing-photo-1', src: 'https://cdn.example.com/a.webp', alt: 'Students at the starting line' },
      { src: 'https://cdn.example.com/b.webp', alt: 'The winning relay team' },
    ],
  });
  assert.equal(parsed.photos[0]?.id, 'existing-photo-1');
  assert.equal(parsed.photos[1]?.id, undefined);
});

test('gallery create rejects a malformed year', () => {
  assert.throws(() =>
    GalleryAlbumCreateInput.parse({
      locale: 'en',
      slug: 'sports-day-2026',
      title: 'Sports Day 2026',
      year: 1750,
      order: 0,
      photos: [],
    }),
  );
});
