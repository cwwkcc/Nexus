import assert from 'node:assert/strict';
import test from 'node:test';

import { filterNewsArticles, normalizeNewsArticle } from './news.js';

test('normalizeNewsArticle provides safe defaults', () => {
  const item = normalizeNewsArticle({
    title: '  Example Title  ',
    slug: '  example-title  ',
    excerpt: '',
    category: 'Academic',
    publishedAt: '2026-08-01',
    status: 'draft',
    featured: true,
    content: 'Body copy',
    imageUrl: '',
  });

  assert.equal(item.title, 'Example Title');
  assert.equal(item.slug, 'example-title');
  assert.equal(item.category, 'Academic');
  assert.equal(item.status, 'draft');
  assert.equal(item.featured, true);
});

test('filterNewsArticles matches search and status filters', () => {
  const articles = [normalizeNewsArticle({ title: 'School wins derby', slug: 'school-wins-derby', excerpt: '', category: 'Sports', publishedAt: '2026-08-01', status: 'published', featured: false, content: 'Test body', imageUrl: '' }), normalizeNewsArticle({ title: 'Academic open day', slug: 'academic-open-day', excerpt: '', category: 'Academic', publishedAt: '2026-08-02', status: 'draft', featured: true, content: 'Test body', imageUrl: '' })];

  const result = filterNewsArticles(articles, { query: 'derby', status: 'published', category: 'all' });

  assert.deepEqual(result, [articles[0]]);
});
