// apps/admin/src/lib/announcements.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { fromDateTimeLocalValue, statusLabel, toDateTimeLocalValue, variantLabel } from './announcements.js';

test('variantLabel maps a known variant to its display label', () => {
  assert.equal(variantLabel('warning'), 'Warning');
  assert.equal(variantLabel('error'), 'Error');
});

test('variantLabel falls back to the raw value for an unknown variant', () => {
  assert.equal(variantLabel('success'), 'success');
});

test('toDateTimeLocalValue/fromDateTimeLocalValue round-trip without drifting', () => {
  const iso = '2026-09-01T14:30:00.000Z';
  const local = toDateTimeLocalValue(iso);
  const backToIso = fromDateTimeLocalValue(local);
  // A round trip through the same local timezone must land on the exact
  // same instant, regardless of what timezone this test happens to run
  // in.
  assert.equal(new Date(backToIso).getTime(), new Date(iso).getTime());
});

test('statusLabel reports "Active now" when the server says so', () => {
  assert.equal(
    statusLabel({
      isActive: true,
      isCurrentlyVisible: true,
      publishAt: new Date(Date.now() - 1000).toISOString(),
      expiresAt: null,
    }),
    'Active now',
  );
});

test('statusLabel reports "Deactivated" for an inactive row regardless of dates', () => {
  assert.equal(
    statusLabel({
      isActive: false,
      isCurrentlyVisible: false,
      publishAt: new Date(Date.now() - 1000).toISOString(),
      expiresAt: null,
    }),
    'Deactivated',
  );
});

test('statusLabel reports "Scheduled" for a future publishAt', () => {
  assert.equal(
    statusLabel({
      isActive: true,
      isCurrentlyVisible: false,
      publishAt: new Date(Date.now() + 100_000).toISOString(),
      expiresAt: null,
    }),
    'Scheduled',
  );
});

test('statusLabel reports "Expired" for a past expiresAt', () => {
  assert.equal(
    statusLabel({
      isActive: true,
      isCurrentlyVisible: false,
      publishAt: new Date(Date.now() - 100_000).toISOString(),
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    }),
    'Expired',
  );
});
