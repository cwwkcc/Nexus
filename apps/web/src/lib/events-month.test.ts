// apps/web/src/lib/events-month.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { currentMonthParam, monthLabel, shiftMonth } from './events-month.js';

test('shiftMonth moves forward and backward across a year boundary', () => {
  assert.equal(shiftMonth('2026-12', 1), '2027-01');
  assert.equal(shiftMonth('2026-01', -1), '2025-12');
});

test('monthLabel renders a locale-appropriate month/year label', () => {
  assert.equal(monthLabel('2026-09', 'en'), 'September 2026');
  // Sinhala/Tamil labels use non-Latin month names — just assert they
  // differ from the English label and don't throw, rather than pinning an
  // exact string (see events-i18n.ts's own caveat on unreviewed
  // translations).
  assert.notEqual(monthLabel('2026-09', 'si'), monthLabel('2026-09', 'en'));
  assert.notEqual(monthLabel('2026-09', 'ta'), monthLabel('2026-09', 'en'));
});

test('currentMonthParam returns a well-formed YYYY-MM string', () => {
  assert.match(currentMonthParam(), /^\d{4}-\d{2}$/);
});
