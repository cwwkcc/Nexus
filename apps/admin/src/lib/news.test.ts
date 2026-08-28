// apps/admin/src/lib/news.test.ts
//
// normalizeNewsArticle is gone (see news.ts's note), so this file only
// tests slugify now. filterNewsArticles and its fixture helper are gone
// too as of this pass — see news.ts's note on why.

import assert from 'node:assert/strict';
import test from 'node:test';

import { slugify } from './news.js';

test('slugify normalizes titles into URL-safe slugs', () => {
  assert.equal(slugify('  Sports Day 2026!  '), 'sports-day-2026');
  assert.equal(slugify('A/L Results — Congratulations'), 'al-results-congratulations');
});
