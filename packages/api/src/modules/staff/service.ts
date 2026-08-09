// packages/api/src/modules/staff/service.ts
//
// All Staff Prisma access lives here — router.ts validates input and calls
// these functions instead of touching ctx.db directly, mirroring
// modules/news/service.ts's split.
//
// Ordering: `order` is scoped per role group (schema.prisma's Staff model
// doc comment explains why). `createStaff` appends a new row to the end of
// its role's group; `updateStaff` deliberately never touches `order` at
// all — a plain edit (name, title, quote, ...) leaves display position
// exactly where it was. If an edit *changes* `role`, the row keeps its old
// numeric `order` value, which now belongs to a different group and may
// collide with an existing member there — a cosmetic tie in display
// order, not a data-integrity problem (no unique constraint on
// (role, order)), and one drag on the new group's list resolves it. A full
// fix (re-appending to the new group atomically) would need a
// read-then-write transaction on every edit just to cover a rare case;
// not worth the extra complexity for a single-school admin roster.

import { triggerRevalidation } from '@nexus/config';
import { STAFF_ROLE_HIERARCHY, type DepartmentKeyEnumData, type StaffRoleEnumData } from '@nexus/contracts';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { staffErrors } from './errors.js';
import type { StaffAdminListInput, StaffByRoleInput, StaffCreateInput, StaffDeleteInput, StaffGetByIdInput, StaffReorderInput, StaffUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type StaffCreate = z.infer<typeof StaffCreateInput>;
export type StaffUpdate = z.infer<typeof StaffUpdateInput>;
export type StaffByRoleQuery = z.infer<typeof StaffByRoleInput>;
export type StaffGetById = z.infer<typeof StaffGetByIdInput>;
export type StaffAdminListQuery = z.infer<typeof StaffAdminListInput>;
export type StaffDelete = z.infer<typeof StaffDeleteInput>;
export type StaffReorder = z.infer<typeof StaffReorderInput>;

type StaffRow = Awaited<ReturnType<typeof Db.staff.findFirstOrThrow>>;

function serialize(staff: StaffRow) {
  return {
    id: staff.id,
    name: staff.name,
    role: staff.role as StaffRoleEnumData,
    title: staff.title,
    department: (staff.department as DepartmentKeyEnumData | null) ?? null,
    portfolio: staff.portfolio ?? null,
    tenure: staff.tenure ?? null,
    quote: staff.quote ?? null,
    bio: staff.bio ?? null,
    portrait: staff.portraitUrl ? { src: staff.portraitUrl, alt: staff.portraitAlt ?? staff.name } : null,
    contactEmail: staff.contactEmail ?? null,
    joinedYear: staff.joinedYear ?? null,
    order: staff.order,
    createdAt: staff.createdAt.toISOString(),
    updatedAt: staff.updatedAt.toISOString(),
  };
}

/** Public — Administration page's principal/deputy/assistant/head-prefect
 * sections each query one role group via this (see
 * apps/web/src/server/content/administration.ts). Degrades to `[]` on DB
 * failure rather than 500ing the whole page — same convention as
 * newsService's public reads. */
export async function byRole(db: typeof Db, input: StaffByRoleQuery) {
  try {
    const staff = await db.staff.findMany({
      where: { role: input.role },
      orderBy: { order: 'asc' },
    });
    return staff.map(serialize);
  } catch (err) {
    console.error('[staffService.byRole] falling back to [] —', err);
    return [];
  }
}

/** Public — added for Societies (Task 7.6, F-148): the Society detail
 * page's advisor StaffCard needs to look up one specific staff member by
 * id, which `byRole` (a role-group listing) can't do. Distinct from the
 * admin-only `getById` below: this one degrades to `null` on a missing
 * row or DB failure rather than throwing NOT_FOUND — a society whose
 * advisor was since removed from the roster should render its page
 * without that section, not 500 the whole page, matching every other
 * public read's degrade-gracefully convention (e.g. eventsService.getBySlug). */
export async function publicById(db: typeof Db, input: StaffGetById) {
  try {
    const staff = await db.staff.findUnique({ where: { id: input.id } });
    return staff ? serialize(staff) : null;
  } catch (err) {
    console.error('[staffService.publicById] falling back to null —', err);
    return null;
  }
}

/** Admin edit-by-id. */
export async function getById(db: typeof Db, input: StaffGetById) {
  const staff = await db.staff.findUnique({ where: { id: input.id } });
  if (!staff) {
    throw staffErrors.notFound(input.id);
  }
  return serialize(staff);
}

/**
 * Admin list view (F-165 "list sorted by role hierarchy"). Deliberately
 * unpaginated — see validators.ts's doc comment — and sorted in
 * application code rather than a Prisma `orderBy`, since Postgres has no
 * native way to sort a plain `role` string column by
 * `STAFF_ROLE_HIERARCHY`'s custom order (a `CASE WHEN` raw-SQL orderBy
 * would work but adds real complexity for a dataset small enough that an
 * in-memory sort is free). Degrades to `[]` on DB failure — same
 * convention as every other admin list read in this codebase.
 */
export async function adminList(db: typeof Db, input: StaffAdminListQuery) {
  const where: Record<string, unknown> = {};

  if (input.role && input.role !== 'all') {
    where.role = input.role;
  }

  if (input.department && input.department !== 'all') {
    where.department = input.department;
  }

  if (input.query && input.query.trim()) {
    where.OR = [{ name: { contains: input.query, mode: 'insensitive' } }, { title: { contains: input.query, mode: 'insensitive' } }, { portfolio: { contains: input.query, mode: 'insensitive' } }];
  }

  try {
    const staff = await db.staff.findMany({ where });
    return staff.map(serialize).sort((a, b) => {
      const roleDiff = STAFF_ROLE_HIERARCHY.indexOf(a.role) - STAFF_ROLE_HIERARCHY.indexOf(b.role);
      return roleDiff !== 0 ? roleDiff : a.order - b.order;
    });
  } catch (err) {
    console.error('[staffService.adminList] falling back to [] —', err);
    return [];
  }
}

export async function createStaff(db: typeof Db, config: ApiConfig, input: StaffCreate) {
  const payload = {
    name: input.name,
    role: input.role,
    title: input.title,
    department: input.department ?? null,
    portfolio: input.portfolio ?? null,
    tenure: input.tenure ?? null,
    quote: input.quote ?? null,
    bio: input.bio ?? null,
    portraitUrl: input.portraitUrl ?? null,
    portraitAlt: input.portraitAlt ?? null,
    contactEmail: input.contactEmail ?? null,
    joinedYear: input.joinedYear ?? null,
  };

  let staff;
  try {
    // Best-effort append, not a strict uniqueness guarantee: two
    // concurrent creates in the same role group could both read the same
    // max `order` under READ COMMITTED and land on the same value. That
    // produces a cosmetic ordering tie an editor can fix with one drag,
    // not a data-integrity error — a single-school admin roster doesn't
    // justify a stricter (serializable transaction / DB sequence) fix.
    staff = await db.$transaction(async (tx) => {
      const { _max } = await tx.staff.aggregate({
        where: { role: input.role },
        _max: { order: true },
      });
      return tx.staff.create({ data: { ...payload, order: (_max.order ?? -1) + 1 } });
    });
  } catch (err) {
    throw staffErrors.saveFailed(err);
  }

  await revalidateStaff(config, staff.role);
  return serialize(staff);
}

export async function updateStaff(db: typeof Db, config: ApiConfig, input: StaffUpdate) {
  const { id, ...rest } = input;
  const payload = {
    name: rest.name,
    role: rest.role,
    title: rest.title,
    department: rest.department ?? null,
    portfolio: rest.portfolio ?? null,
    tenure: rest.tenure ?? null,
    quote: rest.quote ?? null,
    bio: rest.bio ?? null,
    portraitUrl: rest.portraitUrl ?? null,
    portraitAlt: rest.portraitAlt ?? null,
    contactEmail: rest.contactEmail ?? null,
    joinedYear: rest.joinedYear ?? null,
    // `order` is intentionally absent — see this file's top-of-file note.
  };

  let staff;
  try {
    staff = await db.staff.update({ where: { id }, data: payload });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw staffErrors.notFound(id);
    }
    throw staffErrors.saveFailed(err);
  }

  await revalidateStaff(config, staff.role);
  return serialize(staff);
}

/** Admin-role-only (see router.ts) — Staff has no draft/archive state to
 * fall back to, so removing a row is always a real, permanent delete. */
export async function deleteStaff(db: typeof Db, config: ApiConfig, input: StaffDelete) {
  let staff;
  try {
    staff = await db.staff.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw staffErrors.notFound(input.id);
    }
    throw staffErrors.deleteFailed(err);
  }

  await revalidateStaff(config, staff.role);
}

/** F-165 drag-and-drop reorder — see validators.ts's doc comment on why
 * this takes the whole group's ordered id list rather than a from/to
 * index pair. Runs as a single transaction: either every row in the group
 * gets its new `order`, or none do. */
export async function reorderStaff(db: typeof Db, config: ApiConfig, input: StaffReorder) {
  let staff;
  try {
    staff = await db.$transaction(input.orderedIds.map((id, index) => db.staff.update({ where: { id }, data: { order: index } })));
  } catch (err) {
    throw staffErrors.reorderFailed(err);
  }

  await revalidateStaff(config, input.role);
  return staff.map(serialize);
}

/** On-demand cache invalidation (F-195), same mechanism as
 * newsService.revalidateNews. Scoped to the affected role — the
 * Administration page fetches each role group independently
 * (staff.byRole), so editing a teacher's profile doesn't need to bust the
 * principal/deputy/assistant/head-prefect sections' cache too. */
async function revalidateStaff(config: ApiConfig, role: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[staffService] skipping revalidation for role "${role}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope: `staff:${role}` });
}
