// apps/admin/src/lib/extracurriculars.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { achievementLevelLabel, categoryLabel } from './extracurriculars.js';

test('categoryLabel maps a known key to its display label', () => {
  assert.equal(categoryLabel('performing-arts'), 'Performing Arts');
  assert.equal(categoryLabel('leadership'), 'Leadership');
});

test('categoryLabel falls back to the raw key for an unknown value', () => {
  assert.equal(categoryLabel('not-a-real-category'), 'not-a-real-category');
});

test('achievementLevelLabel maps a known key to its display label', () => {
  assert.equal(achievementLevelLabel('national'), 'National');
  assert.equal(achievementLevelLabel('district'), 'District');
});

test('achievementLevelLabel falls back to the raw key for an unknown value', () => {
  assert.equal(achievementLevelLabel('galactic'), 'galactic');
});
