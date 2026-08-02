// apps/admin/src/lib/news.test.ts
//
// normalizeNewsArticle is gone (see news.ts's note), so this file now only
// tests slugify + filterNewsArticles, against fixtures shaped like the
// real AdminNewsArticle (Tiptap `content`, lowercase category keys,
// `author`) instead of the old mock shape.

import assert from 'node:assert/strict';
import test from 'node:test';

import type { AdminNewsArticle } from './news.js';
import { filterNewsArticles, slugify } from './news.js';

function fixture(overrides: Partial<AdminNewsArticle>): AdminNewsArticle {
  return {
    id: overrides.id ?? 'test-id',
    locale: 'en',
    slug: 'test-article',
    title: 'Test article',
    excerpt: null,
    content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Body' }] }] },
    category: 'general',
    author: null,
    status: 'draft',
    featured: false,
    imageUrl: null,
    publishedAt: null,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
    ...overrides,
  };
}

test('slugify normalizes titles into URL-safe slugs', () => {
  assert.equal(slugify('  Sports Day 2026!  '), 'sports-day-2026');
  assert.equal(slugify('A/L Results — Congratulations'), 'al-results-congratulations');
});

test('filterNewsArticles matches search and status filters', () => {
  const articles = [fixture({ id: '1', title: 'School wins derby', slug: 'school-wins-derby', category: 'sports', status: 'published' }), fixture({ id: '2', title: 'Academic open day', slug: 'academic-open-day', category: 'academic', status: 'draft' })];

  const result = filterNewsArticles(articles, { query: 'derby', status: 'published', category: 'all' });

  assert.deepEqual(result, [articles[0]]);
});

test('filterNewsArticles matches by category', () => {
  const articles = [fixture({ id: '1', category: 'sports' }), fixture({ id: '2', category: 'academic' })];

  const result = filterNewsArticles(articles, { category: 'academic' });

  assert.deepEqual(result, [articles[1]]);
});
