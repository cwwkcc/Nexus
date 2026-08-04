// packages/api/src/modules/media/__tests__/router.test.ts
//
// Like packages/api/src/modules/news/__tests__/router.test.ts, this cannot
// actually run in a sandbox with no generated Prisma Client (`@nexus/db`
// imports `../generated/prisma/client.js`, produced by `prisma generate`
// against a real DATABASE_URL) — it fails at module resolution before any
// test body executes. Written and reviewed against the real service.ts
// logic; needs `pnpm db:generate` against a real Postgres to actually run.
// See docs/Completion Plan.md's M4 notes.
//
// Doesn't attempt to test requestUpload/confirmUpload here — those need
// live R2 credentials (a real presigned URL, a real staged object to
// download and process), which is exactly the kind of thing this file's
// sibling tests intentionally *don't* depend on. That's integration-test
// territory for a real environment, not something to fake with mocks that
// would just be testing the mocks.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { mediaRouter } from '../router.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };
const editorSession: SessionContext = { userId: 'test-editor', email: 'editor@cwwkcc.lk', role: 'editor' };

test('media list degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ media: mediaRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.media.list({ folder: 'all', page: 1, pageSize: 20 });
  assert.deepEqual(result, {
    items: [],
    pagination: { total: 0, page: 1, pageSize: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  });
});

test('media list is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ media: mediaRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() => caller.media.list({ folder: 'all', page: 1, pageSize: 20 }));
});

test('media requestUpload is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ media: mediaRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.media.requestUpload({
      fileName: 'photo.jpg',
      fileType: 'image/jpeg',
      fileSize: 1024,
      folder: 'images',
    }),
  );
});

test('media delete is rejected for an Editor (hard delete is Admin-only, per the RBAC matrix)', async () => {
  const testRouter = router({ media: mediaRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () => caller.media.delete({ id: 'does-not-exist' }),
    (err: unknown) => err instanceof Error && 'code' in err && (err as { code: string }).code === 'FORBIDDEN',
  );
});

test('media bulkDelete is rejected for an Editor (hard delete is Admin-only, per the RBAC matrix)', async () => {
  const testRouter = router({ media: mediaRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(editorSession));

  await assert.rejects(
    () => caller.media.bulkDelete({ ids: ['does-not-exist'] }),
    (err: unknown) => err instanceof Error && 'code' in err && (err as { code: string }).code === 'FORBIDDEN',
  );
});
