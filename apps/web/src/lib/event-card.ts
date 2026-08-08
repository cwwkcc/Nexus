// apps/web/src/lib/event-card.ts
//
// Maps a CalendarEntryOutput (the real domain model,
// packages/api/src/modules/events) onto EventCardData (@nexus/contracts),
// the projection @nexus/ui's Calendar/EventCard actually render.
// Centralized here rather than inlined at each call site, matching
// news-card.ts's own reasoning — the calendar grid, the event-card list,
// and the home page's Upcoming Events block all need it.
//
// A calendar-only entry (no linked EventDetail) still needs a valid `href`
// — EventCardSchema requires one, since @nexus/ui's Calendar component
// renders every entry on the grid regardless of whether it has a card
// (F-145). It links back to the listing page itself, anchored to the
// entry's own id, rather than to a route that doesn't exist — a
// calendar-only entry was never meant to be a destination, so this is a
// deliberate "no-op-ish" href, not a broken one.

import type { EventCardData, EventStatusType, LocaleEnumData } from '@nexus/contracts';

export interface EventCardSource {
  id: string;
  title: string;
  date: string;
  category: string;
  detail: {
    slug: string;
    description: string;
    coverImage: { src: string; alt: string } | null;
    location: string | null;
    startTime: string | null;
    isAllDay: boolean;
    registrationUrl: string | null;
  } | null;
}

/** Both `date` and "today" are plain "YYYY-MM-DD" strings, which sort
 * lexically the same as chronologically — no Date parsing needed, and no
 * timezone drift risk (see service.ts's toISODate for why the string form
 * itself is already the safe representation). */
function computeStatus(entry: EventCardSource, todayIso: string): EventStatusType {
  if (entry.date === todayIso) {
    return 'today';
  }
  if (entry.date > todayIso) {
    return entry.detail?.registrationUrl ? 'registration-open' : 'upcoming';
  }
  return 'past';
}

export function toEventCard(entry: EventCardSource, locale: LocaleEnumData, todayIso: string = new Date().toISOString().slice(0, 10)): EventCardData {
  const { detail } = entry;

  return {
    id: entry.id,
    title: entry.title,
    description: detail?.description,
    date: entry.date,
    time: detail?.isAllDay ? undefined : (detail?.startTime ?? undefined),
    venue: detail?.location ?? undefined,
    category: entry.category,
    status: computeStatus(entry, todayIso),
    href: detail ? `/${locale}/events/${detail.slug}` : `/${locale}/events#entry-${entry.id}`,
    imageSrc: detail?.coverImage?.src,
    imageAlt: detail?.coverImage?.alt,
    registrationHref: detail?.registrationUrl ?? undefined,
  };
}
