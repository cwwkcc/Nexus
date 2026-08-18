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

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { alumniErrors } from './errors.js';
import type { AlumniBulkStatusUpdate, AlumniCreate, AlumniGetById, AlumniList, AlumniStatusUpdate, AlumniUpdate } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type AlumniListQuery = z.infer<typeof AlumniList>;
export type AlumniProfileCreate = z.infer<typeof AlumniCreate>;
export type AlumniProfileUpdate = z.infer<typeof AlumniUpdate>;
export type AlumniStatusUpdate = z.infer<typeof AlumniStatusUpdate>;
export type AlumniBulkStatusUpdate = z.infer<typeof AlumniBulkStatusUpdate>;
export type AlumniGetById = z.infer<typeof AlumniGetById>;

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
  const { status, graduationYear, profession, page, pageSize } = input;

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (graduationYear) {
    where.graduationYear = graduationYear;
  }

  if (profession && profession.trim()) {
    where.OR = [{ currentRole: { contains: profession, mode: 'insensitive' } }, { currentOrg: { contains: profession, mode: 'insensitive' } }];
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

/** Fetch a single profile by ID — used by admin edit page. Throws if not
 * found (P2025), matching contentService.getById's error handling. */
export async function getById(db: typeof Db, input: AlumniGetById) {
  const { id } = input;

  try {
    const profile = await db.alumniProfile.findUniqueOrThrow({
      where: { id },
    });

    return serialize(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw error;
  }
}

/** Create a new alumni profile — admin-direct entry can be APPROVED
 * immediately, public submissions default to PENDING. Triggers revalidation
 * of the alumni directory on create. */
export async function createProfile(db: typeof Db, config: ApiConfig, input: AlumniProfileCreate) {
  const { name, graduationYear, stream, currentRole, currentOrg, portrait, quote, isFeatureworthy, status, rejectionReason } = input;

  try {
    const profile = await db.alumniProfile.create({
      data: {
        name,
        graduationYear,
        stream,
        currentRole,
        currentOrg,
        portraitUrl: portrait?.src ?? null,
        portraitAlt: portrait?.alt ?? null,
        quote,
        isFeatureworthy: isFeatureworthy ?? false,
        status: status ?? 'PENDING',
        rejectionReason,
      },
    });

    await triggerRevalidation(config, ['alumni']);

    return serialize(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw alumniErrors.slugCollision();
    }
    throw error;
  }
}

/** Update an existing alumni profile — can change status (approve/reject a
 * pending submission) or edit details. Triggers revalidation on update. */
export async function updateProfile(db: typeof Db, config: ApiConfig, input: AlumniProfileUpdate) {
  const { id, name, graduationYear, stream, currentRole, currentOrg, portrait, quote, isFeatureworthy, status, rejectionReason } = input;

  try {
    const profile = await db.alumniProfile.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(graduationYear !== undefined && { graduationYear }),
        ...(stream !== undefined && { stream }),
        ...(currentRole !== undefined && { currentRole }),
        ...(currentOrg !== undefined && { currentOrg }),
        ...(portrait !== undefined && {
          portraitUrl: portrait?.src ?? null,
          portraitAlt: portrait?.alt ?? null,
        }),
        ...(quote !== undefined && { quote }),
        ...(isFeatureworthy !== undefined && { isFeatureworthy }),
        ...(status !== undefined && { status }),
        ...(rejectionReason !== undefined && { rejectionReason }),
      },
    });

    await triggerRevalidation(config, ['alumni']);

    return serialize(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw error;
  }
}

/** Update status of a single profile — used for approve/reject actions.
 * Sets rejectionReason when rejecting. Triggers revalidation. */
export async function updateStatus(db: typeof Db, config: ApiConfig, input: AlumniStatusUpdate) {
  const { id, status, rejectionReason } = input;

  try {
    const profile = await db.alumniProfile.update({
      where: { id },
      data: {
        status,
        ...(rejectionReason !== undefined && { rejectionReason }),
      },
    });

    await triggerRevalidation(config, ['alumni']);

    return serialize(profile);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw error;
  }
}

/** Bulk status update — approve/reject multiple profiles at once. Used by
 * admin bulk actions. Triggers revalidation. */
export async function bulkUpdateStatus(db: typeof Db, config: ApiConfig, input: AlumniBulkStatusUpdate) {
  const { ids, status, rejectionReason } = input;

  const profiles = await db.alumniProfile.updateMany({
    where: { id: { in: ids } },
    data: {
      status,
      ...(rejectionReason !== undefined && { rejectionReason }),
    },
  });

  await triggerRevalidation(config, ['alumni']);

  // Return the updated profiles for client-side sync
  const updatedProfiles = await db.alumniProfile.findMany({
    where: { id: { in: ids } },
  });

  return updatedProfiles.map(serialize);
}

/** Delete a profile — hard delete, no soft-archive. Triggers revalidation. */
export async function deleteProfile(db: typeof Db, config: ApiConfig, input: AlumniGetById) {
  const { id } = input;

  try {
    await db.alumniProfile.delete({
      where: { id },
    });

    await triggerRevalidation(config, ['alumni']);

    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw alumniErrors.notFound(id);
    }
    throw error;
  }
}
