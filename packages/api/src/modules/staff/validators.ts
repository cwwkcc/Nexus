// packages/api/src/modules/staff/validators.ts
//
// Staff Module (M4 — Task 7.4, F-165) input/output validation.
//
// Unlike NewsArticle, Staff has no draft/published status (see
// schema.prisma's Staff model doc comment) — every row is public as soon
// as it's created, so there's no NewsStatusInput-equivalent enum here.
// create/update are still split the same two ways News's are (see
// service.ts's note): a typo'd id on create silently overwriting an
// unrelated row, and a missing id on update silently inserting a
// duplicate, are both real footguns either shape alone would reopen.

import { AvatarSchema, DepartmentKeyEnum, StaffRoleEnum } from '@nexus/contracts';
import { z } from 'zod';

const StaffFields = {
  name: z.string().trim().min(1).max(120),
  role: StaffRoleEnum,
  title: z.string().trim().min(1).max(160),
  department: DepartmentKeyEnum.optional(),
  portfolio: z.string().trim().max(200).optional().nullable(),
  tenure: z.string().trim().max(80).optional().nullable(),
  quote: z.string().trim().max(500).optional().nullable(),
  bio: z.string().trim().max(4000).optional().nullable(),
  // A full CDN URL (an already-uploaded MediaAsset's `.url`), matching
  // NewsArticleCreateInput.imageUrl's established convention — see
  // schema.prisma's Staff model doc comment for why this module follows
  // that precedent rather than storing an R2 key directly.
  portraitUrl: z.string().url().optional().nullable(),
  portraitAlt: z.string().trim().max(200).optional().nullable(),
  contactEmail: z.string().trim().email().optional().nullable(),
  joinedYear: z.string().trim().max(20).optional().nullable(),
};

/** Always inserts, appended to the end of its role's group — service.ts
 * assigns the next `order` value rather than trusting a client-supplied
 * one. Rejects an `id` outright rather than silently updating. */
export const StaffCreateInput = z.object({
  ...StaffFields,
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. `order`
 * isn't editable here — only `reorder` (drag-and-drop) changes it, so a
 * plain name/title edit can never accidentally shuffle display order. */
export const StaffUpdateInput = z.object({
  id: z.string().min(1),
  ...StaffFields,
});

export const StaffOutput = z.object({
  id: z.string(),
  name: z.string(),
  role: StaffRoleEnum,
  title: z.string(),
  department: DepartmentKeyEnum.nullable(),
  portfolio: z.string().nullable(),
  tenure: z.string().nullable(),
  quote: z.string().nullable(),
  bio: z.string().nullable(),
  portrait: AvatarSchema.nullable(),
  contactEmail: z.string().nullable(),
  joinedYear: z.string().nullable(),
  order: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const StaffListOutput = z.array(StaffOutput);

/** Public — the Administration page's principal/deputy/assistant/head-
 * prefect sections each query one role group via this. Returned ordered
 * by `order` ascending (see service.ts's byRole). */
export const StaffByRoleInput = z.object({
  role: StaffRoleEnum,
});

export const StaffGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Admin list — deliberately unpaginated (see service.ts's adminList doc
 * comment): a single school's staff roster is small enough that grouping
 * the whole thing by role hierarchy client-side, with page-level pagination
 * on top, would add complexity without a real problem to solve. */
export const StaffAdminListInput = z.object({
  query: z.string().trim().max(200).optional(),
  role: z
    .union([StaffRoleEnum, z.literal('all')])
    .optional()
    .default('all'),
  department: z
    .union([DepartmentKeyEnum, z.literal('all')])
    .optional()
    .default('all'),
});

export const StaffDeleteInput = z.object({
  id: z.string().min(1),
});

/** Sets `order` to each id's index in `orderedIds`, scoped to one `role`
 * group at a time (schema.prisma's Staff model doc comment explains why
 * per-role, not global). The client sends the *entire*, already-reordered
 * list of ids for that group after a drag-and-drop, rather than a single
 * from/to index pair — this replaces the whole group's ordering in one
 * transaction, so a stale client can't corrupt ordering by racing a
 * partial update against another editor's concurrent reorder. */
export const StaffReorderInput = z.object({
  role: StaffRoleEnum,
  orderedIds: z.array(z.string().min(1)).min(1).max(200),
});
