// apps/admin/src/lib/archive.ts
//
// AdminArchive is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention achievements.ts uses, so it
// can't silently drift from the API. The archive module follows the same
// pattern as achievements: a list with pagination and filtering by category and year.

import type { AppRouter } from '@nexus/api';
import { ARCHIVE_CATEGORY_LABELS, ArchiveCategory } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminArchive = RouterOutputs['archive']['adminList']['items'][number];
export type ArchiveCategory = AdminArchive['category'];

export const categoryOptions = [{ value: 'all', label: 'All categories' }, ...ArchiveCategory.options.map((value) => ({ value, label: ARCHIVE_CATEGORY_LABELS[value as ArchiveCategory] }))];

/**
 * Extracts unique years from an archive list for the filter dropdown.
 * Sorted in descending order (most recent first).
 */
export function getYears(archive: AdminArchive[]): string[] {
  const years = new Set(archive.map((a) => a.year));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
}
