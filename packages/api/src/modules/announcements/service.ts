// packages/api/src/modules/announcements/service.ts
//
// All Announcement Prisma access lives here — router.ts validates input
// and calls these functions instead of touching ctx.db directly,
// mirroring modules/societies/service.ts's split.

import { triggerRevalidation } from '@nexus/config';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { announcementsErrors } from './errors.js';
import type { AnnouncementAdminListInput, AnnouncementCreateInput, AnnouncementDeactivateInput, AnnouncementDeleteInput, AnnouncementGetByIdInput, AnnouncementUpdateInput, AnnouncementVariantInput, ActiveAnnouncementInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type AnnouncementCreate = z.infer<typeof AnnouncementCreateInput>;
export type AnnouncementUpdate = z.infer<typeof AnnouncementUpdateInput>;
export type AnnouncementAdminListQuery = z.infer<typeof AnnouncementAdminListInput>;
export type ActiveAnnouncementQuery = z.infer<typeof ActiveAnnouncementInput>;
export type AnnouncementGetById = z.infer<typeof AnnouncementGetByIdInput>;
export type AnnouncementDelete = z.infer<typeof AnnouncementDeleteInput>;
export type AnnouncementDeactivate = z.infer<typeof AnnouncementDeactivateInput>;

type AnnouncementRow = Awaited<ReturnType<typeof Db.announcement.findFirstOrThrow>>;

/** The single conjunction of all three visibility conditions F-172
 * describes — see schema.prisma's Announcement model doc comment for why
 * this is computed here, at read time, rather than stored as a column. */
function isCurrentlyVisible(row: AnnouncementRow, now: Date): boolean {
  if (!row.isActive) return false;
  if (row.publishAt > now) return false;
  if (row.expiresAt && row.expiresAt <= now) return false;
  return true;
}

function serialize(row: AnnouncementRow, now: Date = new Date()) {
  return {
    id: row.id,
    locale: row.locale,
    variant: row.variant as z.infer<typeof AnnouncementVariantInput>,
    message: row.message,
    linkLabel: row.linkLabel ?? null,
    linkHref: row.linkHref ?? null,
    publishAt: row.publishAt.toISOString(),
    expiresAt: row.expiresAt ? row.expiresAt.toISOString() : null,
    isActive: row.isActive,
    isCurrentlyVisible: isCurrentlyVisible(row, now),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** Priority for picking *one* announcement to actually show — error
 * outranks warning outranks info, matching how AnnouncementBanner's own
 * variant severity reads visually. */
const VARIANT_PRIORITY: Record<string, number> = { error: 0, warning: 1, info: 2 };

/** Public — F-141/F-031's site-wide banner slot. At most one
 * announcement (see validators.ts's own doc comment on why); degrades to
 * `null` on DB failure, matching every other public read's convention. */
export async function getActive(db: typeof Db, input: ActiveAnnouncementQuery) {
  const now = new Date();

  try {
    const candidates = await db.announcement.findMany({
      where: { locale: input.locale, isActive: true, publishAt: { lte: now } },
    });

    const visible = candidates.filter((row: AnnouncementRow) => isCurrentlyVisible(row, now));
    if (visible.length === 0) return null;

    visible.sort((a: AnnouncementRow, b: AnnouncementRow) => {
      const priorityDiff = (VARIANT_PRIORITY[a.variant] ?? 99) - (VARIANT_PRIORITY[b.variant] ?? 99);
      if (priorityDiff !== 0) return priorityDiff;
      return b.publishAt.getTime() - a.publishAt.getTime();
    });

    return serialize(visible[0]!, now);
  } catch (err) {
    console.error('[announcementsService.getActive] falling back to null —', err);
    return null;
  }
}

/** Admin edit-by-id. */
export async function getById(db: typeof Db, input: AnnouncementGetById) {
  const announcement = await db.announcement.findUnique({ where: { id: input.id } });
  if (!announcement) {
    throw announcementsErrors.notFound(input.id);
  }
  return serialize(announcement);
}

/** Admin list (F-172: "View all active and past") — deliberately
 * unpaginated (see validators.ts's own note), newest-published first so
 * the most recent activity is always at the top regardless of whether
 * it's currently visible, scheduled, or expired. Degrades to `[]` on DB
 * failure. */
export async function adminList(db: typeof Db, input: AnnouncementAdminListQuery) {
  try {
    const announcements = await db.announcement.findMany({ where: { locale: input.locale }, orderBy: { publishAt: 'desc' } });
    const now = new Date();
    return announcements.map((row: AnnouncementRow) => serialize(row, now));
  } catch (err) {
    console.error('[announcementsService.adminList] falling back to [] —', err);
    return [] as ReturnType<typeof serialize>[];
  }
}

function writeData(input: AnnouncementCreate | AnnouncementUpdate) {
  return {
    locale: input.locale,
    variant: input.variant,
    message: input.message,
    linkLabel: input.linkLabel ?? null,
    linkHref: input.linkHref ?? null,
    publishAt: input.publishAt ? new Date(input.publishAt) : new Date(),
    expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
    isActive: input.isActive,
  };
}

export async function createAnnouncement(db: typeof Db, config: ApiConfig, input: AnnouncementCreate) {
  let announcement;
  try {
    announcement = await db.announcement.create({ data: writeData(input) });
  } catch (err) {
    throw announcementsErrors.saveFailed(err);
  }

  await revalidateAnnouncements(config, input.locale);
  return serialize(announcement);
}

export async function updateAnnouncement(db: typeof Db, config: ApiConfig, input: AnnouncementUpdate) {
  const { id, ...rest } = input;

  let announcement;
  try {
    announcement = await db.announcement.update({ where: { id }, data: writeData(rest as AnnouncementUpdate) });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw announcementsErrors.notFound(id);
    }
    throw announcementsErrors.saveFailed(err);
  }

  await revalidateAnnouncements(config, rest.locale);
  return serialize(announcement);
}

/** F-172's dedicated "Deactivate" action. */
export async function deactivateAnnouncement(db: typeof Db, config: ApiConfig, input: AnnouncementDeactivate) {
  let announcement;
  try {
    announcement = await db.announcement.update({ where: { id: input.id }, data: { isActive: false } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw announcementsErrors.notFound(input.id);
    }
    throw announcementsErrors.deactivateFailed(err);
  }

  await revalidateAnnouncements(config, announcement.locale);
  return serialize(announcement);
}

/** Admin-role-only (see router.ts) — no archived/soft-deleted state,
 * matching every other hard-delete in this codebase. */
export async function deleteAnnouncement(db: typeof Db, config: ApiConfig, input: AnnouncementDelete) {
  let announcement;
  try {
    announcement = await db.announcement.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw announcementsErrors.notFound(input.id);
    }
    throw announcementsErrors.deleteFailed(err);
  }

  await revalidateAnnouncements(config, announcement.locale);
}

/** On-demand cache invalidation (F-195) — scoped per-locale, since the
 * banner is fetched per-locale and every page on the site reads it (see
 * apps/web/src/app/[locale]/layout.tsx). */
async function revalidateAnnouncements(config: ApiConfig, locale: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[announcementsService] skipping revalidation for locale "${locale}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await triggerRevalidation({ webAppUrl, secret, scope: `announcements:${locale}` });
}
