// apps/admin/src/lib/societies.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { categoryLabel, slugify } from './societies.js';

test('slugify normalizes society names into URL-safe slugs', () => {
  assert.equal(slugify('  Science Society  '), 'science-society');
  assert.equal(slugify('Kannangara ICT Society (KITS)'), 'kannangara-ict-society-kits');
});

test('categoryLabel maps a known key to its display label', () => {
  assert.equal(categoryLabel('technology'), 'Technology');
  assert.equal(categoryLabel('arts'), 'Arts');
});

test('categoryLabel falls back to the raw key for an unknown value', () => {
  assert.equal(categoryLabel('not-a-real-category'), 'not-a-real-category');
});
