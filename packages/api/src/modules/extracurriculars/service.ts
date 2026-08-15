// packages/api/src/modules/extracurriculars/service.ts
//
// All ExtracurricularActivity/ExtracurricularAchievement Prisma access
// lives here — router.ts validates input and calls these functions
// instead of touching ctx.db directly, mirroring modules/societies/
// service.ts's split.
//
// createActivity/updateActivity reconcile the submitted `achievements`
// array against what's in the database in one transaction — see
// validators.ts's header comment for exactly why achievements aren't
// separate mutations. Structurally this is modules/gallery/service.ts's
// createAlbum/updateAlbum photo-reconciliation transaction, adapted for
// achievements instead of photos.

import { triggerRevalidation } from '@nexus/config';
import type { AchievementLevel, ExtracurricularCategoryEnum } from '@nexus/contracts';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { extracurricularsErrors } from './errors.js';
import type { ExtracurricularActivityAdminListInput, ExtracurricularActivityCreateInput, ExtracurricularActivityDeleteInput, ExtracurricularActivityGetByIdInput, ExtracurricularActivityListInput, ExtracurricularActivityUpdateInput, ExtracurricularAchievementFields } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type ExtracurricularActivityCreate = z.infer<typeof ExtracurricularActivityCreateInput>;
export type ExtracurricularActivityUpdate = z.infer<typeof ExtracurricularActivityUpdateInput>;
export type ExtracurricularActivityListQuery = z.infer<typeof ExtracurricularActivityListInput>;
export type ExtracurricularActivityAdminListQuery = z.infer<typeof ExtracurricularActivityAdminListInput>;
export type ExtracurricularActivityGetById = z.infer<typeof ExtracurricularActivityGetByIdInput>;
export type ExtracurricularActivityDelete = z.infer<typeof ExtracurricularActivityDeleteInput>;
export type ExtracurricularAchievementInput = z.infer<typeof ExtracurricularAchievementFields>;

type ExtracurricularAchievementRow = Awaited<ReturnType<typeof Db.extracurricularAchievement.findFirstOrThrow>>;
type ExtracurricularActivityRow = Awaited<ReturnType<typeof Db.extracurricularActivity.findFirstOrThrow>> & {
  achievements?: ExtracurricularAchievementRow[];
};

/** `@db.Date` columns come back from Prisma as a JS `Date` at UTC
 * midnight — see modules/events/service.ts's own toISODate/fromISODate
 * for the identical off-by-one-day reasoning this mirrors verbatim. */
function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function fromISODate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function serializeAchievement(achievement: ExtracurricularAchievementRow) {
  return {
    id: achievement.id,
    activityId: achievement.activityId,
    title: achievement.title,
    description: achievement.description ?? null,
    level: achievement.level as z.infer<typeof AchievementLevel>,
    date: toISODate(achievement.date),
    awardedBy: achievement.awardedBy ?? null,
    createdAt: achievement.createdAt.toISOString(),
    updatedAt: achievement.updatedAt.toISOString(),
  };
}

function serializeActivity(activity: ExtracurricularActivityRow) {
  return {
    id: activity.id,
    locale: activity.locale,
    name: activity.name,
    category: activity.category as z.infer<typeof ExtracurricularCategoryEnum>,
    description: activity.description,
    studentQuote: activity.studentQuote ?? null,
    season: activity.season ?? null,
    coachStaffId: activity.coachStaffId ?? null,
    photo: activity.photoUrl ? { src: activity.photoUrl, alt: activity.photoAlt ?? activity.name } : null,
    isActive: activity.isActive,
    achievements: (activity.achievements ?? []).map(serializeAchievement),
    createdAt: activity.createdAt.toISOString(),
    updatedAt: activity.updatedAt.toISOString(),
  };
}

function emptyList() {
  return [] as ReturnType<typeof serializeActivity>[];
}

const ACTIVITY_ORDER_BY = [{ category: 'asc' as const }, { name: 'asc' as const }];

/** Public — F-161 Extracurriculars page. Only active activities (see
 * schema.prisma's ExtracurricularActivity doc comment on `isActive`) —
 * an admin sees retired ones too via `adminList`, but the public listing
 * never should. Degrades to `[]` on DB failure, same convention as every
 * other public list read. */
export async function list(db: typeof Db, input: ExtracurricularActivityListQuery) {
  const where: Record<string, unknown> = { locale: input.locale, isActive: true };
  if (input.category && input.category !== 'all') {
    where.category = input.category;
  }

  try {
    const activities = await db.extracurricularActivity.findMany({ where, orderBy: ACTIVITY_ORDER_BY, include: { achievements: { orderBy: { date: 'desc' } } } });
    return activities.map(serializeActivity);
  } catch (err) {
    console.error('[extracurricularsService.list] falling back to [] —', err);
    return emptyList();
  }
}

/** Admin edit-by-id. */
export async function getById(db: typeof Db, input: ExtracurricularActivityGetById) {
  const activity = await db.extracurricularActivity.findUnique({ where: { id: input.id }, include: { achievements: { orderBy: { date: 'desc' } } } });
  if (!activity) {
    throw extracurricularsErrors.notFound(input.id);
  }
  return serializeActivity(activity);
}

/**
 * Admin list — deliberately unpaginated, same reasoning as
 * modules/societies/service.ts's own adminList. Includes retired
 * (isActive = false) activities, unlike the public `list` — an admin
 * needs to see and reactivate them. Degrades to `[]` on DB failure,
 * matching every other admin list read.
 */
export async function adminList(db: typeof Db, input: ExtracurricularActivityAdminListQuery) {
  const where: Record<string, unknown> = { locale: input.locale };

  if (input.category && input.category !== 'all') {
    where.category = input.category;
  }

  if (input.query && input.query.trim()) {
    where.OR = [{ name: { contains: input.query, mode: 'insensitive' } }, { description: { contains: input.query, mode: 'insensitive' } }];
  }

  try {
    const activities = await db.extracurricularActivity.findMany({ where, orderBy: ACTIVITY_ORDER_BY, include: { achievements: { orderBy: { date: 'desc' } } } });
    return activities.map(serializeActivity);
  } catch (err) {
    console.error('[extracurricularsService.adminList] falling back to [] —', err);
    return emptyList();
  }
}

function activityWriteData(input: ExtracurricularActivityCreate | ExtracurricularActivityUpdate) {
  return {
    locale: input.locale,
    name: input.name,
    category: input.category,
    description: input.description,
    studentQuote: input.studentQuote ?? null,
    season: input.season ?? null,
    coachStaffId: input.coachStaffId ?? null,
    photoUrl: input.photoUrl ?? null,
    photoAlt: input.photoAlt ?? null,
    isActive: input.isActive,
  };
}

function achievementWriteData(achievement: ExtracurricularAchievementInput) {
  return {
    title: achievement.title,
    description: achievement.description ?? null,
    level: achievement.level,
    date: fromISODate(achievement.date),
    awardedBy: achievement.awardedBy ?? null,
  };
}

export async function createActivity(db: typeof Db, config: ApiConfig, input: ExtracurricularActivityCreate) {
  let activity: ExtracurricularActivityRow;
  try {
    activity = await db.$transaction(async (tx) => {
      const created = await tx.extracurricularActivity.create({ data: activityWriteData(input) });

      const achievements = await Promise.all(input.achievements.map((achievement) => tx.extracurricularAchievement.create({ data: { activityId: created.id, ...achievementWriteData(achievement) } })));

      return { ...created, achievements };
    });
  } catch (err) {
    throw extracurricularsErrors.saveFailed(err);
  }

  await revalidateExtracurriculars(config, activity.id);
  return serializeActivity(activity);
}

export async function updateActivity(db: typeof Db, config: ApiConfig, input: ExtracurricularActivityUpdate) {
  const { id, achievements: submittedAchievements, ...rest } = input;

  let activity: ExtracurricularActivityRow;
  try {
    activity = await db.$transaction(async (tx) => {
      const updated = await tx.extracurricularActivity.update({ where: { id }, data: activityWriteData({ ...rest, id } as ExtracurricularActivityUpdate) });

      const existing = await tx.extracurricularAchievement.findMany({ where: { activityId: id } });
      const submittedIds = new Set(submittedAchievements.filter((a) => a.id).map((a) => a.id));

      // Removed by the editor — present in the DB, absent from the
      // submitted array.
      const toDelete = existing.filter((achievement) => !submittedIds.has(achievement.id));
      if (toDelete.length > 0) {
        await tx.extracurricularAchievement.deleteMany({ where: { id: { in: toDelete.map((a) => a.id) } } });
      }

      const achievements = await Promise.all(submittedAchievements.map((achievement) => (achievement.id ? tx.extracurricularAchievement.update({ where: { id: achievement.id }, data: achievementWriteData(achievement) }) : tx.extracurricularAchievement.create({ data: { activityId: id, ...achievementWriteData(achievement) } }))));

      return { ...updated, achievements };
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw extracurricularsErrors.notFound(id);
    }
    throw extracurricularsErrors.saveFailed(err);
  }

  await revalidateExtracurriculars(config, id);
  return serializeActivity(activity);
}

/** Admin-role-only (see router.ts) — ExtracurricularActivity has no
 * archived/soft-deleted state to fall back to beyond `isActive`, and
 * `isActive: false` (a normal edit, available to any Editor) already
 * covers "retire this team" — a hard delete is a deliberate, rarer
 * removal, same reasoning as Staff/Society/GalleryAlbum's own hard
 * delete. Cascades to every achievement (schema.prisma's `onDelete:
 * Cascade`) — no separate cleanup needed here. The coach FK (schema.
 * prisma's `onDelete: SetNull`) means deleting a *staff member* who
 * coaches an activity never cascades here; this is only about deleting
 * the activity itself. */
export async function deleteActivity(db: typeof Db, config: ApiConfig, input: ExtracurricularActivityDelete) {
  let activity;
  try {
    activity = await db.extracurricularActivity.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw extracurricularsErrors.notFound(input.id);
    }
    throw extracurricularsErrors.deleteFailed(err);
  }

  await revalidateExtracurriculars(config, activity.id);
}

/** On-demand cache invalidation (F-195), same mechanism as
 * societiesService.revalidateSocieties. Scoped to the general
 * 'extracurriculars' scope (the F-161 listing page) plus the specific
 * activity's own tag — there's no individual detail page to bust
 * separately (see this module's own header comment), but a per-activity
 * tag keeps the door open for one without a scheme change later. */
async function revalidateExtracurriculars(config: ApiConfig, activityId: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[extracurricularsService] skipping revalidation for activity "${activityId}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await Promise.all([triggerRevalidation({ webAppUrl, secret, scope: 'extracurriculars' }), triggerRevalidation({ webAppUrl, secret, scope: `extracurriculars:${activityId}` })]);
}
