// packages/api/src/modules/archive/service.ts
//
// All Archive Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly, mirroring
// modules/achievements/service.ts's split (Task 7.20, F-155/F-182).
//
// Key design decisions (see schema.prisma and Completion Plan.md):
//   - No locale field — archive entries are facts, not per-locale prose.
//   - No draft/published/archived ContentStatus — simple create/edit/delete shape.
//   - Pagination on list (archive can grow beyond one page).
//   - Filterable by category and year (F-155's filtering requirements).
//   - Curated content layer over Media Library — each entry references a file
//     uploaded through the standard Media Library pipeline (F-182).

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { archiveErrors } from './errors.js';
import type { ArchiveCreateInput, ArchiveGetByIdInput, ArchiveListInput, ArchiveUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type ArchiveListQuery = z.infer<typeof ArchiveListInput>;
export type ArchiveCreate = z.infer<typeof ArchiveCreateInput>;
export type ArchiveUpdate = z.infer<typeof ArchiveUpdateInput>;
export type ArchiveGetById = z.infer<typeof ArchiveGetByIdInput>;

type ArchiveRow = Awaited<ReturnType<typeof Db.archive.findFirstOrThrow>>;

function serialize(archive: ArchiveRow) {
  return {
    id: archive.id,
    title: archive.title,
    year: archive.year,
    category: archive.category as 'photograph' | 'magazine' | 'prize_giving_record' | 'prefect_list',
    description: archive.description ?? null,
    file: {
      src: archive.fileUrl,
      alt: archive.fileAlt,
    },
    createdAt: archive.createdAt.toISOString(),
    updatedAt: archive.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** Used by both the public `list` and admin `adminList` procedures — a read
 * degrades to an empty result on DB failure rather than 500ing the archive
 * or admin list. */
export async function listArchive(db: typeof Db, input: ArchiveListQuery) {
  const { category, year, query, page, pageSize } = input;

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = category;
  }

  if (year) {
    where.year = year;
  }

  if (query) {
    where.title = { contains: query, mode: 'insensitive' };
  }

  try {
    const [items, total] = await Promise.all([
      db.archive.findMany({
        where,
        orderBy: [{ year: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.archive.count({ where }),
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
    console.error('Failed to list archive entries:', error);
    return emptyPage(page, pageSize);
  }
}

/** Fetch a single archive entry by ID — used by admin edit page. Throws if not
 * found (P2025), matching achievementsService.getById's error handling. */
export async function getById(db: typeof Db, input: ArchiveGetById) {
  const { id } = input;

  try {
    const archive = await db.archive.findUniqueOrThrow({
      where: { id },
    });

    return serialize(archive);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw archiveErrors.notFound(id);
    }
    throw error;
  }
}

/** Create a new archive entry — immediately live (no moderation workflow).
 * Triggers revalidation of the archive page on create. */
export async function createArchive(db: typeof Db, config: ApiConfig, input: ArchiveCreate) {
  const { title, year, category, description, file } = input;

  let archive: ArchiveRow;
  try {
    archive = await db.archive.create({
      data: {
        title,
        year,
        category,
        description: description ?? null,
        fileUrl: file.src,
        fileAlt: file.alt,
      },
    });
  } catch (error) {
    throw archiveErrors.saveFailed(error);
  }

  await revalidateArchive(config);
  return serialize(archive);
}

/** Update an existing archive entry — immediately live (no moderation workflow).
 * Triggers revalidation on update. */
export async function updateArchive(db: typeof Db, config: ApiConfig, input: ArchiveUpdate) {
  const { id, title, year, category, description, file } = input;

  let archive: ArchiveRow;
  try {
    archive = await db.archive.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(year !== undefined && { year }),
        ...(category !== undefined && { category }),
        ...(description !== undefined && { description: description ?? null }),
        ...(file !== undefined && {
          fileUrl: file.src,
          fileAlt: file.alt,
        }),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw archiveErrors.notFound(id);
    }
    throw archiveErrors.saveFailed(error);
  }

  await revalidateArchive(config);
  return serialize(archive);
}

/** Delete an archive entry — hard delete, no soft-archive. Triggers revalidation. */
export async function deleteArchive(db: typeof Db, config: ApiConfig, input: ArchiveGetById) {
  const { id } = input;

  try {
    await db.archive.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw archiveErrors.notFound(id);
    }
    throw archiveErrors.deleteFailed(error);
  }

  await revalidateArchive(config);
  return { success: true };
}

/** On-demand cache invalidation (F-195), same mechanism as
 * alumniService.revalidateAlumni. Archive has no locale dimension. */
async function revalidateArchive(config: ApiConfig): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error('[archiveService] skipping revalidation — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set');
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope: 'archive' });
}
