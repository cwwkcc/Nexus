// packages/api/src/modules/news/__tests__/router.test.ts
//
// Was asserting `adminList` resolves to `[]` on DB failure, but the
// original listNews() had no try/catch at all — this test could never
// actually have passed against a real connection failure (there is no
// DATABASE_URL / live Postgres in this test run). Fixed the implementation
// to match this test's intent (see service.ts's listNews/getBySlug/
// getFeatured/getRelated) rather than weaken the assertion, and updated the
// expected shape to {items, pagination} now that list/adminList paginate.

import assert from 'node:assert/strict';
import test from 'node:test';

import { createContext } from '../../../context.js';
import type { SessionContext } from '../../../init.js';
import { createCallerFactory, router } from '../../../trpc.js';
import { newsRouter } from '../router.js';

const adminSession: SessionContext = { userId: 'test-admin', email: 'admin@cwwkcc.lk', role: 'admin' };

test('news adminList degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(adminSession));

  const result = await caller.news.adminList({ locale: 'en', page: 1, pageSize: 20 });
  assert.deepEqual(result, {
    items: [],
    pagination: { total: 0, page: 1, pageSize: 20, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  });
});

test('news list (public) degrades gracefully when the database is unavailable', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.news.list({ locale: 'en', page: 1, pageSize: 20 });
  assert.equal(result.items.length, 0);
  assert.equal(result.pagination.total, 0);
});

test('news bySlug degrades to null when the database is unavailable', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.news.bySlug({ locale: 'en', slug: 'does-not-exist' });
  assert.equal(result, null);
});

test('news getFeatured degrades to an empty array when the database is unavailable', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  const result = await caller.news.getFeatured({ locale: 'en', limit: 3 });
  assert.deepEqual(result, []);
});

test('news create is rejected for an unauthenticated caller', async () => {
  const testRouter = router({ news: newsRouter });
  const createCaller = createCallerFactory(testRouter);
  const caller = createCaller(createContext(null));

  await assert.rejects(() =>
    caller.news.create({
      locale: 'en',
      slug: 'test-article',
      title: 'Test article',
      content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Body' }] }] },
      category: 'academic',
      status: 'draft',
      featured: false,
    }),
  );
});
