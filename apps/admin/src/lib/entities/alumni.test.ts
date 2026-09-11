// apps/admin/src/lib/alumni.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import { ALUMNI_STATUS_LABELS, getGraduationYears, statusOptions, type AdminAlumni } from './alumni.js';

function fixture(overrides: Partial<AdminAlumni>): AdminAlumni {
  return {
    id: overrides.id ?? 'test-id',
    name: 'Test Alumnus',
    graduationYear: '2020',
    stream: null,
    currentRole: null,
    currentOrg: null,
    portrait: null,
    quote: null,
    isFeatureworthy: false,
    status: 'PENDING',
    rejectionReason: null,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
    ...overrides,
  };
}

test('getGraduationYears returns unique years sorted most-recent first', () => {
  const alumni = [fixture({ id: 'a', graduationYear: '2018' }), fixture({ id: 'b', graduationYear: '2022' }), fixture({ id: 'c', graduationYear: '2018' }), fixture({ id: 'd', graduationYear: '2020' })];

  assert.deepEqual(getGraduationYears(alumni), ['2022', '2020', '2018']);
});

test('getGraduationYears returns an empty list for an empty input', () => {
  assert.deepEqual(getGraduationYears([]), []);
});

test('ALUMNI_STATUS_LABELS covers every AlumniStatus value', () => {
  assert.deepEqual(Object.keys(ALUMNI_STATUS_LABELS).sort(), ['APPROVED', 'PENDING', 'REJECTED']);
});

test('statusOptions leads with an "all statuses" option followed by every real status', () => {
  assert.equal(statusOptions[0]?.value, 'all');
  assert.deepEqual(
    statusOptions.slice(1).map((o) => o.value),
    ['PENDING', 'APPROVED', 'REJECTED'],
  );
});
