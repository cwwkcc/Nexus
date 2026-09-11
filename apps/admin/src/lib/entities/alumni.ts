// apps/admin/src/lib/alumni.ts
//
// AdminAlumni is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention staff.ts uses, so it
// can't silently drift from the API. The alumni module follows the same
// pattern as staff: a list with pagination and filtering by status,
// graduation year, and profession.

import type { AppRouter } from '@nexus/api';
import { AlumniStatusEnum } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminAlumni = RouterOutputs['alumni']['adminList']['items'][number];
export type AlumniStatus = AdminAlumni['status'];

export const ALUMNI_STATUS_LABELS: Record<AlumniStatus, string> = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

export const statusOptions = [{ value: 'all', label: 'All statuses' }, ...AlumniStatusEnum.options.map((value) => ({ value, label: ALUMNI_STATUS_LABELS[value as AlumniStatus] }))];

/**
 * Extracts unique graduation years from an alumni list for the filter dropdown.
 * Sorted in descending order (most recent first).
 */
export function getGraduationYears(alumni: AdminAlumni[]): string[] {
  const years = new Set(alumni.map((a) => a.graduationYear));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}
