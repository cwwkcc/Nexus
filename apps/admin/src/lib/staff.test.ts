// apps/admin/src/lib/staff.test.ts

import assert from 'node:assert/strict';
import test from 'node:test';

import type { AdminStaff } from './staff.js';
import { groupStaffByRole, moveStaffId } from './staff.js';

function fixture(overrides: Partial<AdminStaff>): AdminStaff {
  return {
    id: overrides.id ?? 'test-id',
    name: 'Test Person',
    role: 'teacher',
    title: 'Test Title',
    department: null,
    portfolio: null,
    tenure: null,
    quote: null,
    bio: null,
    portrait: null,
    contactEmail: null,
    joinedYear: null,
    order: 0,
    createdAt: '2026-08-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z',
    ...overrides,
  };
}

test('groupStaffByRole buckets by F-165 role hierarchy, skipping empty roles', () => {
  const staff = [fixture({ id: 'teacher-1', role: 'teacher' }), fixture({ id: 'principal-1', role: 'principal' }), fixture({ id: 'teacher-2', role: 'teacher' })];

  const groups = groupStaffByRole(staff);

  assert.deepEqual(
    groups.map((g) => g.role),
    ['principal', 'teacher'],
  );
  assert.equal(groups[0].members.length, 1);
  assert.equal(groups[1].members.length, 2);
});

test("groupStaffByRole preserves each group's existing order", () => {
  const staff = [fixture({ id: 'second', role: 'teacher', order: 1 }), fixture({ id: 'first', role: 'teacher', order: 0 })];

  const groups = groupStaffByRole(staff);

  assert.deepEqual(
    groups[0].members.map((m) => m.id),
    ['second', 'first'],
  );
});

test('groupStaffByRole returns no groups for an empty list', () => {
  assert.deepEqual(groupStaffByRole([]), []);
});

test('moveStaffId moves an id earlier in the list', () => {
  const result = moveStaffId(['a', 'b', 'c'], 'c', 0);
  assert.deepEqual(result, ['c', 'a', 'b']);
});

test('moveStaffId moves an id later in the list', () => {
  const result = moveStaffId(['a', 'b', 'c'], 'a', 2);
  assert.deepEqual(result, ['b', 'c', 'a']);
});

test('moveStaffId clamps an out-of-range target index', () => {
  const result = moveStaffId(['a', 'b', 'c'], 'a', 99);
  assert.deepEqual(result, ['b', 'c', 'a']);
});

test('moveStaffId is a no-op for an id that is not present', () => {
  const ids = ['a', 'b', 'c'];
  assert.deepEqual(moveStaffId(ids, 'z', 0), ids);
});
