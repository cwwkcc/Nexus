// apps/admin/src/lib/events.ts
//
// AdminCalendarEntry is inferred directly from the real router output
// (inferRouterOutputs<AppRouter>), the same convention news.ts/staff.ts
// use, so it can't silently drift from the API. Unlike Staff,
// `events.adminList` paginates (see
// packages/api/src/modules/events/service.ts's own doc comment on why) —
// `.items[number]`, not `[number]` directly, mirrors news.ts's own
// AdminNewsArticle.

import type { AppRouter } from '@nexus/api';
import { EVENT_CATEGORY_META } from '@nexus/contracts';
import type { inferRouterOutputs } from '@trpc/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type AdminCalendarEntry = RouterOutputs['events']['adminList']['items'][number];
export type AdminEventDetail = NonNullable<AdminCalendarEntry['detail']>;

/** Same normalization news.ts's own slugify uses — kept as a separate
 * local copy rather than a shared utility, matching this codebase's
 * established per-module convention (see news.ts's own comment style;
 * staff has no slug at all, so there was nothing to compare against
 * there). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function categoryLabel(category: string): string {
  return EVENT_CATEGORY_META.find((meta) => meta.key === category)?.label ?? category;
}

/**
 * `dateString` is a plain "YYYY-MM-DD" with no time component (see
 * service.ts's toISODate). Parsed as explicit UTC midnight and formatted
 * with a UTC-anchored `Intl` call so the displayed date can never drift a
 * day in a timezone west of UTC — the same reasoning service.ts's
 * toISODate/fromISODate document, just on the display side.
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Current "YYYY-MM", UTC-anchored — the admin list's default month. */
export function currentMonthParam(): string {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** Adds `delta` whole months to a "YYYY-MM" string — the prev/next month
 * navigation on the admin list and the public calendar grid both use
 * this, kept pure and independently testable rather than inlined into
 * either client component's click handler. */
export function shiftMonth(month: string, delta: number): string {
  const [yearStr, monthStr] = month.split('-');
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1 + delta;
  const shifted = new Date(Date.UTC(year, monthIndex, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, '0')}`;
}

export function monthLabel(month: string): string {
  const [yearStr, monthStr] = month.split('-');
  const date = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, 1));
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
}
