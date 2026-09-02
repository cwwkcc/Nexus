// packages/api/src/modules/achievements/service.ts
//
// All Achievement Prisma access lives here — router.ts validates input and
// calls these functions instead of touching ctx.db directly, mirroring
// modules/alumni/service.ts's split (Task 7.19, F-156/F-181).
//
// Key design decisions (see schema.prisma and Completion Plan.md):
//   - No locale field — achievements are school-wide facts, not per-locale prose.
//   - No draft/published/archived ContentStatus — simple create/edit/delete shape.
//   - Pagination on list (achievement database can grow beyond one page).
//   - Filterable by category and year (F-156's filtering requirements).

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { achievementErrors } from './errors.js';
import type { AchievementCreateInput, AchievementGetByIdInput, AchievementListInput, AchievementUpdateInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type AchievementListQuery = z.infer<typeof AchievementListInput>;
export type AchievementCreate = z.infer<typeof AchievementCreateInput>;
export type AchievementUpdate = z.infer<typeof AchievementUpdateInput>;
export type AchievementGetById = z.infer<typeof AchievementGetByIdInput>;

type AchievementRow = Awaited<ReturnType<typeof Db.achievement.findFirstOrThrow>>;

function serialize(achievement: AchievementRow) {
  return {
    id: achievement.id,
    title: achievement.title,
    description: achievement.description ?? null,
    level: achievement.level as 'national' | 'provincial' | 'district' | 'school',
    category: achievement.category as 'academic' | 'sports' | 'cultural' | 'other',
    date: achievement.date,
    awardedBy: achievement.awardedBy ?? null,
    image: achievement.imageUrl && achievement.imageAlt ? { src: achievement.imageUrl, alt: achievement.imageAlt } : null,
    createdAt: achievement.createdAt.toISOString(),
    updatedAt: achievement.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** Used by both the public `list` and admin `adminList` procedures — a read
 * degrades to an empty result on DB failure rather than 500ing the database
 * or admin list. */
export async function listAchievements(db: typeof Db, input: AchievementListQuery) {
  const { category, year, query, page, pageSize } = input;

  const where: Record<string, unknown> = {};

  if (category) {
    where.category = category;
  }

  if (year) {
    where.date = { startsWith: year };
  }

  if (query) {
    where.title = { contains: query, mode: 'insensitive' };
  }

  try {
    const [items, total] = await Promise.all([
      db.achievement.findMany({
        where,
        orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.achievement.count({ where }),
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
    console.error('Failed to list achievements:', error);
    return emptyPage(page, pageSize);
  }
}

/** Fetch a single achievement by ID — used by admin edit page. Throws if not
 * found (P2025), matching alumniService.getById's error handling. */
export async function getById(db: typeof Db, input: AchievementGetById) {
  const { id } = input;

  try {
    const achievement = await db.achievement.findUniqueOrThrow({
      where: { id },
    });

    return serialize(achievement);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw achievementErrors.notFound(id);
    }
    throw error;
  }
}

/** Create a new achievement — immediately live (no moderation workflow).
 * Triggers revalidation of the achievements page on create. */
export async function createAchievement(db: typeof Db, config: ApiConfig, input: AchievementCreate) {
  const { title, description, level, category, date, awardedBy, image } = input;

  let achievement: AchievementRow;
  try {
    achievement = await db.achievement.create({
      data: {
        title,
        description: description ?? null,
        level,
        category,
        date,
        awardedBy: awardedBy ?? null,
        imageUrl: image?.src ?? null,
        imageAlt: image?.alt ?? null,
      },
    });
  } catch (error) {
    throw achievementErrors.saveFailed(error);
  }

  await revalidateAchievements(config);
  return serialize(achievement);
}

/** Update an existing achievement — immediately live (no moderation workflow).
 * Triggers revalidation on update. */
export async function updateAchievement(db: typeof Db, config: ApiConfig, input: AchievementUpdate) {
  const { id, title, description, level, category, date, awardedBy, image } = input;

  let achievement: AchievementRow;
  try {
    achievement = await db.achievement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description: description ?? null }),
        ...(level !== undefined && { level }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(awardedBy !== undefined && { awardedBy: awardedBy ?? null }),
        ...(image !== undefined && {
          imageUrl: image?.src ?? null,
          imageAlt: image?.alt ?? null,
        }),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw achievementErrors.notFound(id);
    }
    throw achievementErrors.saveFailed(error);
  }

  await revalidateAchievements(config);
  return serialize(achievement);
}

/** Delete an achievement — hard delete, no soft-archive. Triggers revalidation. */
export async function deleteAchievement(db: typeof Db, config: ApiConfig, input: AchievementGetById) {
  const { id } = input;

  try {
    await db.achievement.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && (error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw achievementErrors.notFound(id);
    }
    throw achievementErrors.deleteFailed(error);
  }

  await revalidateAchievements(config);
  return { success: true };
}

/** On-demand cache invalidation (F-195), same mechanism as
 * alumniService.revalidateAlumni. Achievements has no locale dimension. */
async function revalidateAchievements(config: ApiConfig): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error('[achievementsService] skipping revalidation — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set');
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope: 'achievements' });
}
