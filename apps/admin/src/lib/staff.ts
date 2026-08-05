// apps/admin/src/lib/staff.ts
//
// AdminStaff is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention news.ts uses, so it
// can't silently drift from the API. Unlike News, `staff.adminList` returns
// a plain array rather than a `{ items, ... }` page (see
// packages/api/src/modules/staff/validators.ts's doc comment on why the
// Staff Module skips pagination entirely).

import type { AppRouter } from '@nexus/api';
import { STAFF_ROLE_HIERARCHY, STAFF_ROLE_LABELS } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminStaff = RouterOutputs['staff']['adminList'][number];
export type StaffRole = AdminStaff['role'];

export interface StaffRoleGroup {
  role: StaffRole;
  label: string;
  members: AdminStaff[];
}

/**
 * There's no canonical department display-name list yet — DepartmentSchema
 * (@nexus/contracts) models a department's `name` as admin-editable data,
 * not a static enum-to-label map, and no Departments admin module exists
 * to author one (out of scope for F-165). This is a local, best-effort
 * humanization of the enum key (e.g. `'physical-education'` →
 * `'Physical Education'`), not a source of truth anything outside the
 * Staff module should import.
 */
export function titleCaseFromKey(key: string): string {
  return key
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Groups an already-fetched staff list by F-165's role hierarchy
 * (principal → support), in that order, omitting any role with no
 * members. `staff.adminList` already sorts within each group by `order`
 * ascending (packages/api/src/modules/staff/service.ts), so this only
 * buckets — it never re-sorts within a group.
 */
export function groupStaffByRole(staff: AdminStaff[]): StaffRoleGroup[] {
  return STAFF_ROLE_HIERARCHY.map((role) => ({
    role,
    label: STAFF_ROLE_LABELS[role],
    members: staff.filter((member) => member.role === role),
  })).filter((group) => group.members.length > 0);
}

/**
 * Moves `id` to `targetIndex` within its own list, returning a new array
 * of ids in the resulting order. Used to compute the `orderedIds` payload
 * a drag-and-drop reorder sends to `staff.reorder`, kept as a pure,
 * independently-testable function so StaffListClient.tsx's drag handlers
 * stay thin wiring around it rather than array-splicing logic of their
 * own. Returns `ids` unchanged if `id` isn't present.
 */
export function moveStaffId(ids: string[], id: string, targetIndex: number): string[] {
  const currentIndex = ids.indexOf(id);
  if (currentIndex === -1) {
    return ids;
  }

  const next = ids.filter((existing) => existing !== id);
  const clampedIndex = Math.max(0, Math.min(targetIndex, next.length));
  next.splice(clampedIndex, 0, id);
  return next;
}
