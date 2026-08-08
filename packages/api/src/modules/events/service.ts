// packages/api/src/modules/events/service.ts
//
// All CalendarEntry/EventDetail Prisma access lives here — router.ts
// validates input and calls these functions instead of touching ctx.db
// directly, mirroring modules/news/service.ts's split.
//
// F-198's two-branch write is handled as a single transaction per
// create/update call (see validators.ts's header comment for the exact
// semantics of `detail: null` vs `detail: {...}`):
//   - createCalendarEntry: creates the CalendarEntry, and — only if
//     `detail` is non-null — the linked EventDetail, in one transaction.
//   - updateCalendarEntry: updates the CalendarEntry's own fields, then
//     either removes an existing EventDetail (`detail === null`, a
//     documented "downgrade") or upserts one (`detail !== null`, covering
//     both an in-place edit and an "upgrade" from calendar-only) — also
//     one transaction, so a save is never left half-applied.
//
// Public reads only ever surface an EventDetail whose own `status` is
// 'published' — a CalendarEntry itself has no status (F-198), so "is this
// event visible to the public" is answered by its detail's status, not a
// field on the entry. Every CalendarEntry is always visible on the
// calendar grid regardless (F-145: "the calendar view renders every
// entry"); only the detail's visibility is gated. Admin reads always
// return the detail regardless of status, since an editor needs to see
// and manage a draft just as much as a published one.

import { triggerRevalidation } from '@nexus/config';
import type { EventCategorySchema } from '@nexus/contracts';
import { Prisma, type db as Db } from '@nexus/db';
import type { z } from 'zod';

import { eventsErrors } from './errors.js';
import type { CalendarAdminListInput, CalendarEntryCreateInput, CalendarEntryDeleteInput, CalendarEntryUpdateInput, CalendarMonthInput, EventBySlugInput, EventDetailStatusInput, EventGetByIdInput, UpcomingEventsInput } from './validators.js';
import type { ApiConfig } from '../../config.js';

export type CalendarEntryCreate = z.infer<typeof CalendarEntryCreateInput>;
export type CalendarEntryUpdate = z.infer<typeof CalendarEntryUpdateInput>;
export type CalendarMonthQuery = z.infer<typeof CalendarMonthInput>;
export type CalendarAdminListQuery = z.infer<typeof CalendarAdminListInput>;
export type EventBySlug = z.infer<typeof EventBySlugInput>;
export type EventGetById = z.infer<typeof EventGetByIdInput>;
export type UpcomingEventsQuery = z.infer<typeof UpcomingEventsInput>;
export type CalendarEntryDelete = z.infer<typeof CalendarEntryDeleteInput>;

type EventDetailRow = Awaited<ReturnType<typeof Db.eventDetail.findFirstOrThrow>>;
type CalendarEntryRow = Awaited<ReturnType<typeof Db.calendarEntry.findFirstOrThrow>> & {
  eventDetail?: EventDetailRow | null;
};

/** `@db.Date` columns come back from Prisma as a JS `Date` at UTC midnight
 * for the stored calendar date. Reading it back with `.toISOString()`
 * (UTC-based) rather than local getters (`getFullYear`/`getMonth`/
 * `getDate`) avoids the classic off-by-one-day bug in timezones west of
 * UTC, where a local-time read of a UTC-midnight `Date` rolls back to the
 * previous day. */
function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Inverse of toISODate — parsed as explicit UTC midnight so a round trip
 * through this module never drifts by a day regardless of server tz. */
function fromISODate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function serializeDetail(detail: EventDetailRow) {
  return {
    id: detail.id,
    calendarEntryId: detail.calendarEntryId,
    slug: detail.slug,
    description: detail.description,
    coverImage: detail.coverImageUrl ? { src: detail.coverImageUrl, alt: detail.coverImageAlt ?? '' } : null,
    location: detail.location ?? null,
    startTime: detail.startTime ?? null,
    isAllDay: detail.isAllDay,
    registrationUrl: detail.registrationUrl ?? null,
    status: detail.status as z.infer<typeof EventDetailStatusInput>,
    createdAt: detail.createdAt.toISOString(),
    updatedAt: detail.updatedAt.toISOString(),
  };
}

/** `publicOnly` gates the nested detail on its own `status` — see this
 * file's header comment. Admin reads (the default) always include it. */
function serialize(entry: CalendarEntryRow, opts: { publicOnly?: boolean } = {}) {
  const rawDetail = entry.eventDetail ?? null;
  const includeDetail = rawDetail !== null && (!opts.publicOnly || rawDetail.status === 'published');

  return {
    id: entry.id,
    locale: entry.locale,
    title: entry.title,
    date: toISODate(entry.date),
    category: entry.category as z.infer<typeof EventCategorySchema>,
    isRecurring: entry.isRecurring,
    recurrenceRule: entry.recurrenceRule ?? null,
    notes: entry.notes ?? null,
    detail: includeDetail ? serializeDetail(rawDetail as EventDetailRow) : null,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
  };
}

function emptyPage(page: number, pageSize: number) {
  return {
    items: [] as ReturnType<typeof serialize>[],
    pagination: { total: 0, page, pageSize, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  };
}

/** [start, end) UTC bounds for a "YYYY-MM" month string — validated by
 * CalendarMonthInput's regex before this ever runs. */
function monthRange(month: string): { start: Date; end: Date } {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  return {
    start: new Date(Date.UTC(year, monthIndex, 1)),
    end: new Date(Date.UTC(year, monthIndex + 1, 1)),
  };
}

/** Public — F-145's calendar grid + list view share this one fetch: every
 * CalendarEntry for the month (calendar-only entries included, per
 * F-145's "a school holiday and a prize-giving are equally present on the
 * grid"), with `detail` present only when it's actually published. The
 * caller (apps/web/src/server/events.ts) filters to `detail !== null` for
 * the list view specifically — that's a display concern, not a query
 * concern, since both views come from the same month's data. Degrades to
 * `[]` on DB failure, same convention as newsService.listNews. */
export async function getMonth(db: typeof Db, input: CalendarMonthQuery) {
  const { locale, month, category } = input;
  const { start, end } = monthRange(month);

  const where: Record<string, unknown> = { locale, date: { gte: start, lt: end } };
  if (category && category !== 'all') {
    where.category = category;
  }

  try {
    const entries = await db.calendarEntry.findMany({ where, orderBy: { date: 'asc' }, include: { eventDetail: true } });
    return entries.map((entry: CalendarEntryRow) => serialize(entry, { publicOnly: true }));
  } catch (err) {
    console.error('[eventsService.getMonth] falling back to [] —', err);
    return [];
  }
}

/** Public — F-141 home page "Upcoming Events (next three)". Only entries
 * with a published detail: a calendar-only entry (an internal meeting)
 * has nothing fit for a home-page card. */
export async function getUpcoming(db: typeof Db, input: UpcomingEventsQuery) {
  const now = new Date();
  const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  try {
    const entries = await db.calendarEntry.findMany({
      where: { locale: input.locale, date: { gte: todayUtc }, eventDetail: { is: { status: 'published' } } },
      orderBy: { date: 'asc' },
      take: input.limit,
      include: { eventDetail: true },
    });
    return entries.map((entry: CalendarEntryRow) => serialize(entry, { publicOnly: true }));
  } catch (err) {
    console.error('[eventsService.getUpcoming] falling back to [] —', err);
    return [];
  }
}

/** Public — F-146 event detail page. Looks up the *detail* by its own
 * (locale, slug) unique index (see schema.prisma's EventDetail doc
 * comment on why locale is denormalized there) and returns null unless
 * it's actually published — an unpublished detail 404s exactly like an
 * unpublished NewsArticle does via newsService.getBySlug's caller. */
export async function getBySlug(db: typeof Db, input: EventBySlug) {
  try {
    const detail = await db.eventDetail.findUnique({
      where: { locale_slug: { locale: input.locale, slug: input.slug } },
      include: { calendarEntry: true },
    });

    if (!detail || detail.status !== 'published' || !detail.calendarEntry) {
      return null;
    }

    return serialize({ ...detail.calendarEntry, eventDetail: detail });
  } catch (err) {
    console.error('[eventsService.getBySlug] falling back to null —', err);
    return null;
  }
}

/** Admin edit-by-id — full row, detail included regardless of status. */
export async function getById(db: typeof Db, input: EventGetById) {
  const entry = await db.calendarEntry.findUnique({ where: { id: input.id }, include: { eventDetail: true } });
  if (!entry) {
    throw eventsErrors.notFound(input.id);
  }
  return serialize(entry as CalendarEntryRow);
}

/**
 * Admin list (F-166). Paginated, unlike Staff's deliberately-unpaginated
 * list (see modules/staff/validators.ts's doc comment on why) — a school
 * calendar accumulates every dated item ever entered, a much larger and
 * ever-growing set than a static staff roster, so this follows News's
 * pagination convention instead. `kind` lets the admin list separate
 * calendar-only entries from card-producing ones, the same distinction
 * F-145 draws on the public side. Degrades to an empty page on DB
 * failure, matching every other admin list read in this codebase.
 */
export async function adminList(db: typeof Db, input: CalendarAdminListQuery) {
  const { locale, page, pageSize, category, kind, query, month } = input;

  const where: Record<string, unknown> = { locale };

  if (month) {
    const { start, end } = monthRange(month);
    where.date = { gte: start, lt: end };
  }

  if (category && category !== 'all') {
    where.category = category;
  }

  if (kind === 'has-detail') {
    where.eventDetail = { isNot: null };
  } else if (kind === 'calendar-only') {
    where.eventDetail = null;
  }

  if (query && query.trim()) {
    where.OR = [{ title: { contains: query, mode: 'insensitive' } }, { notes: { contains: query, mode: 'insensitive' } }, { eventDetail: { is: { description: { contains: query, mode: 'insensitive' } } } }];
  }

  try {
    const [total, entries] = await Promise.all([db.calendarEntry.count({ where }), db.calendarEntry.findMany({ where, orderBy: { date: 'desc' }, skip: (page - 1) * pageSize, take: pageSize, include: { eventDetail: true } })]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      items: entries.map((entry: CalendarEntryRow) => serialize(entry)),
      pagination: { total, page, pageSize, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  } catch (err) {
    console.error('[eventsService.adminList] falling back to an empty page —', err);
    return emptyPage(page, pageSize);
  }
}

function detailWriteData(detail: NonNullable<CalendarEntryCreate['detail']>, locale: string) {
  return {
    locale,
    slug: detail.slug,
    description: detail.description,
    coverImageUrl: detail.coverImageUrl ?? null,
    coverImageAlt: detail.coverImageAlt ?? null,
    location: detail.location ?? null,
    // Never store a display time for an all-day entry, regardless of what
    // the client sent — isAllDay is the source of truth EventCard's
    // DateBlock/EventDetail page actually branch on.
    startTime: detail.isAllDay ? null : (detail.startTime ?? null),
    isAllDay: detail.isAllDay,
    registrationUrl: detail.registrationUrl ?? null,
    status: detail.status,
  };
}

export async function createCalendarEntry(db: typeof Db, config: ApiConfig, input: CalendarEntryCreate) {
  const { detail, ...entryFields } = input;

  let created: { entry: CalendarEntryRow; detail: EventDetailRow | null };
  try {
    created = await db.$transaction(async (tx) => {
      const entry = await tx.calendarEntry.create({
        data: {
          locale: entryFields.locale,
          title: entryFields.title,
          date: fromISODate(entryFields.date),
          category: entryFields.category,
          isRecurring: entryFields.isRecurring,
          recurrenceRule: entryFields.recurrenceRule ?? null,
          notes: entryFields.notes ?? null,
        },
      });

      if (!detail) {
        return { entry: entry as CalendarEntryRow, detail: null };
      }

      const eventDetail = await tx.eventDetail.create({
        data: { calendarEntryId: entry.id, ...detailWriteData(detail, entry.locale) },
      });

      return { entry: entry as CalendarEntryRow, detail: eventDetail };
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw eventsErrors.slugConflict(entryFields.locale, detail?.slug ?? '');
    }
    throw eventsErrors.saveFailed(err);
  }

  await revalidateEvents(config, created.entry.id);
  return serialize({ ...created.entry, eventDetail: created.detail });
}

export async function updateCalendarEntry(db: typeof Db, config: ApiConfig, input: CalendarEntryUpdate) {
  const { id, detail, ...entryFields } = input;

  let result: { entry: CalendarEntryRow; detail: EventDetailRow | null };
  try {
    result = await db.$transaction(async (tx) => {
      const entry = await tx.calendarEntry.update({
        where: { id },
        data: {
          locale: entryFields.locale,
          title: entryFields.title,
          date: fromISODate(entryFields.date),
          category: entryFields.category,
          isRecurring: entryFields.isRecurring,
          recurrenceRule: entryFields.recurrenceRule ?? null,
          notes: entryFields.notes ?? null,
        },
      });

      if (!detail) {
        // Downgrade to calendar-only. `deleteMany` rather than `delete` —
        // there may be no existing EventDetail at all (this entry was
        // already calendar-only), which is a no-op here, not a P2025.
        await tx.eventDetail.deleteMany({ where: { calendarEntryId: id } });
        return { entry: entry as CalendarEntryRow, detail: null };
      }

      // Upsert covers both an in-place edit of an existing detail and an
      // "upgrade" from a previously calendar-only entry — see this
      // module's header comment.
      const writeData = detailWriteData(detail, entry.locale);
      const eventDetail = await tx.eventDetail.upsert({
        where: { calendarEntryId: id },
        create: { calendarEntryId: id, ...writeData },
        update: writeData,
      });

      return { entry: entry as CalendarEntryRow, detail: eventDetail };
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw eventsErrors.notFound(id);
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
      throw eventsErrors.slugConflict(entryFields.locale, detail?.slug ?? '');
    }
    throw eventsErrors.saveFailed(err);
  }

  await revalidateEvents(config, id);
  return serialize({ ...result.entry, eventDetail: result.detail });
}

/** Admin-role-only (see router.ts) — a bare CalendarEntry has no archived/
 * soft-deleted state to fall back to (same reasoning as Staff's hard
 * delete), so removing one from the calendar is always permanent.
 * Cascades to any linked EventDetail at the database level
 * (schema.prisma's `onDelete: Cascade`) — no separate cleanup needed
 * here. */
export async function deleteCalendarEntry(db: typeof Db, config: ApiConfig, input: CalendarEntryDelete) {
  let entry;
  try {
    entry = await db.calendarEntry.delete({ where: { id: input.id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && (err as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw eventsErrors.notFound(input.id);
    }
    throw eventsErrors.deleteFailed(err);
  }

  await revalidateEvents(config, entry.id);
}

/** On-demand cache invalidation (F-195), same mechanism as
 * newsService.revalidateNews. Scoped to the general 'events' scope (the
 * calendar grid/list + home "Upcoming Events") plus the specific entry's
 * own tag, so an edit to one entry doesn't force-bust every other entry's
 * cached page too. */
async function revalidateEvents(config: ApiConfig, entryId: string): Promise<void> {
  const { webAppUrl, secret } = config.revalidate;

  if (!webAppUrl || !secret) {
    console.error(`[eventsService] skipping revalidation for calendar entry "${entryId}" — WEB_APP_URL_INTERNAL or REVALIDATE_SECRET not set`);
    return;
  }

  await Promise.all([triggerRevalidation({ webAppUrl, secret, scope: 'events' }), triggerRevalidation({ webAppUrl, secret, scope: `events:${entryId}` })]);
}
