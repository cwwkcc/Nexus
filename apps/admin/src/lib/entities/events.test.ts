// apps/admin/src/lib/events.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { categoryLabel, currentMonthParam, formatEventDate, monthLabel, shiftMonth, slugify } from './events.js';

test('slugify normalizes titles into URL-safe slugs', () => {
  assert.equal(slugify('  Sports Day 2026!  '), 'sports-day-2026');
  assert.equal(slugify('A/L Results — Congratulations'), 'al-results-congratulations');
});

test('categoryLabel maps a known key to its display label', () => {
  assert.equal(categoryLabel('sports'), 'Sports');
  assert.equal(categoryLabel('academic'), 'Academic');
});

test('categoryLabel falls back to the raw key for an unknown value', () => {
  assert.equal(categoryLabel('not-a-real-category'), 'not-a-real-category');
});

test('formatEventDate formats a plain ISO date without a timezone-driven off-by-one', () => {
  // 2026-01-01 must never render as "December 31, 2025" — the classic bug
  // when a UTC-midnight Date is read back with local getters in a
  // timezone west of UTC.
  assert.equal(formatEventDate('2026-01-01'), 'January 1, 2026');
  assert.equal(formatEventDate('2026-12-31'), 'December 31, 2026');
});

test('shiftMonth moves forward and backward across a year boundary', () => {
  assert.equal(shiftMonth('2026-12', 1), '2027-01');
  assert.equal(shiftMonth('2026-01', -1), '2025-12');
  assert.equal(shiftMonth('2026-06', 3), '2026-09');
});

test('monthLabel renders a human month/year label', () => {
  assert.equal(monthLabel('2026-09'), 'September 2026');
});

test('currentMonthParam returns a well-formed YYYY-MM string', () => {
  assert.match(currentMonthParam(), /^\d{4}-\d{2}$/);
});
