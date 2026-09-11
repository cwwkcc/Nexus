// apps/admin/src/lib/gallery.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { moveAlbumId, slugify } from './gallery.js';

test('slugify normalizes album titles into URL-safe slugs', () => {
  assert.equal(slugify('  Sports Day 2026!  '), 'sports-day-2026');
  assert.equal(slugify('Prize Giving — 75th Anniversary'), 'prize-giving-75th-anniversary');
});

test('moveAlbumId moves an id to a new position', () => {
  assert.deepEqual(moveAlbumId(['a', 'b', 'c'], 'c', 0), ['c', 'a', 'b']);
  assert.deepEqual(moveAlbumId(['a', 'b', 'c'], 'a', 2), ['b', 'c', 'a']);
});

test('moveAlbumId clamps an out-of-range target index', () => {
  assert.deepEqual(moveAlbumId(['a', 'b', 'c'], 'a', 99), ['b', 'c', 'a']);
  assert.deepEqual(moveAlbumId(['a', 'b', 'c'], 'c', -5), ['c', 'a', 'b']);
});

test('moveAlbumId is a no-op for an id that is not present', () => {
  const ids = ['a', 'b', 'c'];
  assert.deepEqual(moveAlbumId(ids, 'not-there', 0), ids);
});
