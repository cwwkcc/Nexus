// packages/api/src/modules/events/validators.ts
//
// F-198 "Calendar-First Event Architecture" (M4 — Task 7.5). Mirrors
// modules/news/validators.ts's layering: the full, persisted entity shapes
// live here, not in @nexus/contracts (which only keeps the shared
// EventCardSchema projection and EventCategorySchema taxonomy — see
// editorial/events/event.ts's header comment for why).
//
// F-166's two-branch creation flow ("save as calendar-only, or add event
// details") is modeled as a single input shape with a `detail` field that
// is always present but may be `null` — not `.optional()` — so the
// client's intent is unambiguous on every write, not just at creation:
//
//   detail === null   → calendar-only. On create, no EventDetail row is
//                        made. On update, any existing EventDetail is
//                        removed (a documented "downgrade" — see
//                        service.ts's updateCalendarEntry) — F-198 doesn't
//                        explicitly call for this reverse path, but
//                        forcing an admin to delete-and-recreate a whole
//                        CalendarEntry just to take a description back off
//                        it would be worse UX than a dedicated, honest
//                        "remove details" action.
//   detail === object → calendar + event card. On create, both rows are
//                        made in one transaction. On update, the linked
//                        EventDetail is upserted (created if this is an
//                        "upgrade" from a previously calendar-only entry,
//                        otherwise updated in place) — likewise an
//                        extension beyond F-198's literal "the fork is
//                        made at the point of creation" wording, made for
//                        the same reason.
//
// create/update are still split the same two ways News's are (see
// service.ts's note): a typo'd id on create silently overwriting an
// unrelated row, and a missing id on update silently inserting a
// duplicate, are both real footguns either shape alone would reopen.

import { EventCategorySchema, LocaleEnum, PageInputSchema, PaginationMetaSchema } from '@nexus/contracts';
import { z } from 'zod';

/** F-166: status workflow applies to the EventDetail half only. Reuses the
 * same three values ContentStatus/NewsStatusInput already use, kept as a
 * locally-named export so this module doesn't need to import News's. */
export const EventDetailStatusInput = z.enum(['draft', 'published', 'archived']);

const EventDetailFields = {
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, and hyphen-separated (e.g. "sports-day-2026").'),
  description: z.string().trim().min(1).max(2000),
  coverImageUrl: z.string().url().optional().nullable(),
  coverImageAlt: z.string().trim().max(200).optional().nullable(),
  location: z.string().trim().max(200).optional().nullable(),
  startTime: z.string().trim().max(40).optional().nullable(),
  isAllDay: z.boolean().default(false),
  registrationUrl: z.string().url().optional().nullable(),
  status: EventDetailStatusInput.default('draft'),
};

/** The event-detail half of a create/update payload — present only when
 * the editor chose "calendar + event card" (see this file's header). */
export const EventDetailFieldsInput = z.object(EventDetailFields);

const CalendarEntryFields = {
  locale: LocaleEnum,
  title: z.string().trim().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be an ISO date (YYYY-MM-DD).'),
  category: EventCategorySchema,
  isRecurring: z.boolean().default(false),
  recurrenceRule: z.string().trim().max(200).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const CalendarEntryCreateInput = z.object({
  ...CalendarEntryFields,
  detail: EventDetailFieldsInput.nullable(),
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND
 * (P2025) if it's missing rather than inserting a duplicate. */
export const CalendarEntryUpdateInput = z.object({
  id: z.string().min(1),
  ...CalendarEntryFields,
  detail: EventDetailFieldsInput.nullable(),
});

export const EventDetailOutput = z.object({
  id: z.string(),
  calendarEntryId: z.string(),
  slug: z.string(),
  description: z.string(),
  coverImage: z.object({ src: z.string(), alt: z.string() }).nullable(),
  location: z.string().nullable(),
  startTime: z.string().nullable(),
  isAllDay: z.boolean(),
  registrationUrl: z.string().nullable(),
  status: EventDetailStatusInput,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CalendarEntryOutput = z.object({
  id: z.string(),
  locale: LocaleEnum,
  title: z.string(),
  date: z.string(),
  category: EventCategorySchema,
  isRecurring: z.boolean(),
  recurrenceRule: z.string().nullable(),
  notes: z.string().nullable(),
  detail: EventDetailOutput.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CalendarEntryListOutput = z.object({
  items: z.array(CalendarEntryOutput),
  pagination: PaginationMetaSchema,
});

/** Public — F-145's calendar grid + list view. Every entry for the month
 * (calendar-only and card-producing alike) so the grid can render every
 * dated item; the list view's caller filters to `detail !== null` client-
 * side, since that's a display concern, not a query concern (the grid and
 * list share one fetch — see apps/web/src/server/events.ts). */
export const CalendarMonthInput = z.object({
  locale: LocaleEnum,
  /** "YYYY-MM" */
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format.'),
  category: z
    .union([EventCategorySchema, z.literal('all')])
    .optional()
    .default('all'),
});

export const EventBySlugInput = z.object({
  locale: LocaleEnum,
  slug: z.string().min(1),
});

export const EventGetByIdInput = z.object({
  id: z.string().min(1),
});

/** Admin list (F-166) — paginated like News's adminList, unlike Staff's
 * deliberately-unpaginated one: a school calendar accumulates every dated
 * item ever entered (past holidays, past exams, ...), which is a much
 * larger, ever-growing set than a static staff roster. `month` is
 * optional and separate from that pagination — when set, scopes the list
 * to one "YYYY-MM" the same way the public calendar grid's CalendarMonthInput
 * does, since an admin browsing a school calendar naturally thinks in
 * months, not in an undifferentiated flat list of every date ever
 * entered; omitted, the list covers every entry, most recent first. */
export const CalendarAdminListInput = PageInputSchema.extend({
  locale: LocaleEnum,
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format.')
    .optional(),
  category: z
    .union([EventCategorySchema, z.literal('all')])
    .optional()
    .default('all'),
  /** 'has-detail' / 'calendar-only' lets the admin list separate the two
   * kinds F-145 distinguishes on the public side, in addition to a plain
   * text search over title/description. */
  kind: z.enum(['all', 'has-detail', 'calendar-only']).optional().default('all'),
  query: z.string().trim().max(200).optional(),
});

/** F-145 "next three" — home page Upcoming Events block (F-141). Only
 * entries with a published EventDetail, since a calendar-only entry (a
 * staff meeting) has nothing fit for public display beyond a date. */
export const UpcomingEventsInput = z.object({
  locale: LocaleEnum,
  limit: z.number().int().min(1).max(12).default(3),
});

export const CalendarEntryDeleteInput = z.object({
  id: z.string().min(1),
});
