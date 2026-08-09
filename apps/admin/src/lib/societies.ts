// apps/admin/src/lib/societies.ts
//
// AdminSociety is inferred directly from the real router output, the same
// convention news.ts/staff.ts/events.ts use.

import type { AppRouter } from '@nexus/api';
import { SOCIETY_CATEGORY_META } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminSociety = RouterOutputs['societies']['adminList'][number];

/** Same normalization events.ts's own slugify uses — kept as a separate
 * local copy, matching this codebase's established per-module
 * convention. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function categoryLabel(category: string): string {
  return SOCIETY_CATEGORY_META.find((meta) => meta.key === category)?.label ?? category;
}
