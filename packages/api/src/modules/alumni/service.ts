// packages/api/src/modules/alumni/service.ts
//
// All AlumniProfile Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly, mirroring
// modules/news/service.ts's split (Task 7.18, F-154/F-180).
//
// Key design decisions (see schema.prisma and Completion Plan.md):
//   - No locale field — alumni profiles are single global records, not
//     per-locale like Society/EventDetail. Names, graduation years, and
//     current roles are facts, not translatable prose.
//   - Moderation workflow via status (PENDING/APPROVED/REJECTED) — public
//     submissions arrive as PENDING and await admin approval, while
//     admin-direct entries can be created as APPROVED immediately.
//   - REJECTED status carries an optional rejectionReason for audit.
//   - No draft/published/archived ContentStatus — the moderation workflow
//     itself is the publication gate.
//   - Pagination on list (directory can grow beyond one page).
//   - Bulk status update for admin bulk actions (approve/reject multiple).
//   - `submitProfile` (F-180's public entry path) always forces the record
//     to PENDING/not-featureworthy/no-rejection-reason server-side,
//     regardless of what `AlumniSubmitInput` even allows the caller to send
//     — the moderation queue, not client input, is the actual publication
//     gate. See validators.ts's own note on why the public schema doesn't
//     include `status`/`isFeatureworthy`/`rejectionReason`/`portrait` at
//     all.

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { alumniErrors } from './errors.js';
import type { AlumniBulkStatusUpdateInput, AlumniCreateInput, AlumniGetByIdInput, AlumniListInput, AlumniStatusUpdateInput, AlumniSubmitInput, AlumniUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type AlumniListQuery = z.infer<typeof AlumniListInput>;
export type AlumniProfileCreate = z.infer<typeof AlumniCreateInput>;
export type AlumniProfileUpdate = z.infer<typeof AlumniUpdateInput>;
export type AlumniStatusUpdate = z.infer<typeof AlumniStatusUpdateInput>;
export type AlumniBulkStatusUpdate = z.infer<typeof AlumniBulkStatusUpdateInput>;
export type AlumniGetById = z.infer<typeof AlumniGetByIdInput>;
export type AlumniSubmit = z.infer<typeof AlumniSubmitInput>;

type AlumniProfileRow = Awaited<ReturnType<typeof Db.alumniProfile.findFirstOrThrow>>;

function serialize(profile: AlumniProfileRow) {
  return {
    id: profile.id,
    name: profile.name,
    graduationYear: profile.graduationYear,
    stream: profile.stream ?? null,
    currentRole: profile.currentRole ?? null,
    currentOrg: profile.currentOrg ?? null,
    portrait: profile.portraitUrl && profile.portraitAlt ? { src: profile.portraitUrl, alt: profile.portraitAlt } : null,
    quote: profile.quote ?? null,
    isFeatureworthy: profile.isFeatureworthy,
    status: profile.status as 'PENDING' | 'APPROVED' | 'REJECTED',
    rejectionReason: profile.rejectionReason ?? null,
    createdAt: profile.createdAt.toISOString(),
    updatedAt: profile.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** Used by both the public `list` and admin `adminList` procedures — a read
 * degrades to an empty result on DB failure rather than 500ing the directory
 * or admin list. */
export async function listAlumni(db: typeof Db, input: AlumniListQuery) {
  const { status, graduationYear, profession, query, page, pageSize } = input;

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (graduationYear) {
    where.graduationYear = graduationYear;
  }

  // `query` (the admin list's "Search" box) and `profession` (its separate
  // "Profession" filter) are independent, AND-combinable conditions, each
  // its own `OR` across a different field set — a plain `where.OR = [...]`
  // assignment for both, one after the other, would silently drop the
  // first (a later property assignment to the same key just overwrites
  // it), so anything more than one `OR`-shaped filter has to be nested
  // under `AND` instead.
  const andConditions: Record<string, unknown>[] = [];

  if (query && query.trim()) {
    andConditions.push({
      OR: [{ name: { contains: query, mode: 'insensitive' } }, { currentRole: { contains: query, mode: 'insensitive' } }, { currentOrg: { contains: query, mode: 'insensitive' } }],
    });
  }

  if (profession && profession.trim()) {
    andConditions.push({
      OR: [{ currentRole: { contains: profession, mode: 'insensitive' } }, { currentOrg: { contains: profession, mode: 'insensitive' } }],
    });
  }

  if (andConditions.length > 0) {
    where.AND = andConditions;
  }

  try {
    const [items, total] = await Promise.all([
      db.alumniProfile.findMany({
        where,
        orderBy: [{ graduationYear: 'desc' }, { name: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.alumniProfile.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      items: items.map(serialize),
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Failed to list alumni profiles:', error);
    return emptyPage(page, pageSize);
  }
}

/** Public directory shows only APPROVED profiles — PENDING/REJECTED are
 * admin-only concerns. */
export async function listPublicAlumni(db: typeof Db, input: Omit<AlumniListQuery, 'status'>) {
  return listAlumni(db, { ...input, status: 'APPROVED' });
}

/** Admin list sees all statuses — filtered at the router level if needed. */
export async function listAdminAlumni(db: typeof Db, input: AlumniListQuery) {
  return listAlumni(db, input);
}

/** Fetch a single profile by ID — used by admin edit page. Throws NOT_FOUND
 * (P2025) if it doesn't exist, matching contentService.getById's error
 * handling. */
export async function getById(db: typeof Db, input: AlumniGetById) {
  const { id } = input;

  try {
    const profile = await db.alumniProfile.findUniqueOrThrow({
      where: { id },
    });

    return serialize(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw error;
  }
}

/** Create a new alumni profile — admin-direct entry can be APPROVED
 * immediately, public submissions default to PENDING (see `submitProfile`
 * below for the actual public entry path, which never trusts a
 * client-supplied status at all). Triggers revalidation of the alumni
 * directory on create. */
export async function createProfile(db: typeof Db, config: ApiConfig, input: AlumniProfileCreate) {
  const { name, graduationYear, stream, currentRole, currentOrg, portrait, quote, isFeatureworthy, status, rejectionReason } = input;

  let profile: AlumniProfileRow;
  try {
    profile = await db.alumniProfile.create({
      data: {
        name,
        graduationYear,
        stream: stream ?? null,
        currentRole: currentRole ?? null,
        currentOrg: currentOrg ?? null,
        portraitUrl: portrait?.src ?? null,
        portraitAlt: portrait?.alt ?? null,
        quote: quote ?? null,
        isFeatureworthy: isFeatureworthy ?? false,
        status: status ?? 'PENDING',
        rejectionReason: rejectionReason ?? null,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw alumniErrors.slugCollision();
    }
    throw alumniErrors.saveFailed(error);
  }

  await revalidateAlumni(config);
  return serialize(profile);
}

/** F-180's public entry path — a visitor submitting their own profile. Only
 * the fields a public caller should ever set reach this function at all
 * (see `AlumniSubmitInput`'s own `.pick()` in validators.ts); everything
 * else is forced here, server-side, regardless of what the transport layer
 * might otherwise allow through:
 *   - status is always PENDING — a public submission can never publish
 *     itself onto the directory (`listPublicAlumni` only ever shows
 *     APPROVED profiles), moderation is mandatory.
 *   - isFeatureworthy is always false — that flag is an editorial
 *     decision made when an admin reviews the submission, never by the
 *     submitter.
 *   - rejectionReason is always null — nothing to reject yet.
 *   - portraitUrl/portraitAlt are always null — Media Library's upload
 *     pipeline (modules/media/router.ts) is admin-only by design (F-067),
 *     and building a second, public-facing upload path is real new scope
 *     (abuse surface, storage cost, moderation of uploaded images) well
 *     beyond Task 7.18. An admin can attach a portrait when they review
 *     and approve the submission via the normal `update` procedure.
 *
 * Never throws to the caller on a genuine save failure — a public-facing
 * write endpoint degrading to a generic failure message is preferable to
 * leaking internals, so unexpected errors are logged and reported as
 * `{ success: false }` rather than propagated as a 500. Validation errors
 * (missing name, etc.) still surface normally via tRPC's input parsing,
 * before this function is ever called. */
export async function submitProfile(db: typeof Db, config: ApiConfig, input: AlumniSubmit) {
  const { name, graduationYear, stream, currentRole, currentOrg, quote } = input;

  try {
    await db.alumniProfile.create({
      data: {
        name,
        graduationYear,
        stream: stream ?? null,
        currentRole: currentRole ?? null,
        currentOrg: currentOrg ?? null,
        portraitUrl: null,
        portraitAlt: null,
        quote: quote ?? null,
        isFeatureworthy: false,
        status: 'PENDING',
        rejectionReason: null,
      },
    });
  } catch (error) {
    console.error('[alumniService.submitProfile] failed to save submission —', error);
    return { success: false };
  }

  // Deliberately no revalidation call — a PENDING profile is invisible on
  // the public directory (`listPublicAlumni` filters to APPROVED only), so
  // there is nothing on the public site for a submission to invalidate yet.
  // Revalidation happens when an admin approves it via `updateStatus`/
  // `bulkUpdateStatus` below.
  return { success: true };
}

/** Update an existing alumni profile — can change status (approve/reject a
 * pending submission) or edit details. Triggers revalidation on update. */
export async function updateProfile(db: typeof Db, config: ApiConfig, input: AlumniProfileUpdate) {
  const { id, name, graduationYear, stream, currentRole, currentOrg, portrait, quote, isFeatureworthy, status, rejectionReason } = input;

  let profile: AlumniProfileRow;
  try {
    profile = await db.alumniProfile.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(graduationYear !== undefined && { graduationYear }),
        ...(stream !== undefined && { stream: stream ?? null }),
        ...(currentRole !== undefined && { currentRole: currentRole ?? null }),
        ...(currentOrg !== undefined && { currentOrg: currentOrg ?? null }),
        ...(portrait !== undefined && {
          portraitUrl: portrait?.src ?? null,
          portraitAlt: portrait?.alt ?? null,
        }),
        ...(quote !== undefined && { quote: quote ?? null }),
        ...(isFeatureworthy !== undefined && { isFeatureworthy }),
        ...(status !== undefined && { status }),
        ...(rejectionReason !== undefined && { rejectionReason: rejectionReason ?? null }),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw alumniErrors.saveFailed(error);
  }

  await revalidateAlumni(config);
  return serialize(profile);
}

/** Update status of a single profile — used for approve/reject actions.
 * Sets rejectionReason when rejecting. Triggers revalidation. */
export async function updateStatus(db: typeof Db, config: ApiConfig, input: AlumniStatusUpdate) {
  const { id, status, rejectionReason } = input;

  let profile: AlumniProfileRow;
  try {
    profile = await db.alumniProfile.update({
      where: { id },
      data: {
        status,
        ...(rejectionReason !== undefined && { rejectionReason: rejectionReason ?? null }),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw alumniErrors.saveFailed(error);
  }

  await revalidateAlumni(config);
  return serialize(profile);
}

/** Bulk status update — approve/reject multiple profiles at once. Used by
 * admin bulk actions. `updateMany` silently skips any id that no longer
 * exists rather than throwing (unlike a `$transaction` of individual
 * `update` calls), which is the right behaviour for a bulk action a viewer
 * might re-run after another admin already actioned one of the same rows.
 * Triggers revalidation. */
export async function bulkUpdateStatus(db: typeof Db, config: ApiConfig, input: AlumniBulkStatusUpdate) {
  const { ids, status, rejectionReason } = input;

  try {
    await db.alumniProfile.updateMany({
      where: { id: { in: ids } },
      data: {
        status,
        ...(rejectionReason !== undefined && { rejectionReason: rejectionReason ?? null }),
      },
    });
  } catch (error) {
    throw alumniErrors.bulkUpdateFailed(error);
  }

  await revalidateAlumni(config);

  // Return the updated profiles for client-side sync.
  const updatedProfiles = await db.alumniProfile.findMany({
    where: { id: { in: ids } },
  });

  return updatedProfiles.map(serialize);
}

/** Delete a profile — hard delete, no soft-archive, same reasoning as
 * Staff/Society's hard delete (see modules/staff/service.ts). Triggers
 * revalidation. */
export async function deleteProfile(db: typeof Db, config: ApiConfig, input: AlumniGetById) {
  const { id } = input;

  try {
    await db.alumniProfile.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw alumniErrors.deleteFailed(error);
  }

  await revalidateAlumni(config);
  return { success: true };
}

/** On-demand cache invalidation (F-195), same mechanism as
 * announcementsService.revalidateAnnouncements. Alumni has no locale
 * dimension (see this file's header note), so the scope is a single flat
 * `'alumni'` tag rather than `alumni:${locale}`. */
async function revalidateAlumni(config: ApiConfig): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error('[alumniService] skipping revalidation — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set');
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope: 'alumni' });
}
