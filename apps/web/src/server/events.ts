// apps/web/src/server/events.ts
//
// Server-side data fetchers for the Events module (M4, Task 7.5, F-198),
// mirroring server/news.ts's shape. Two different kinds of data feed the
// Events pages:
//   - Page chrome (hero) — still a ContentEntry row under scope
//     'page:events' — see registry/page-registry/events.ts's own note on
//     why only the hero survives as a registry section.
//   - Everything else (the calendar grid, the event-card list, individual
//     events, the home page's "Upcoming Events") — the real
//     CalendarEntry/EventDetail domain model via the `events` tRPC
//     router, not ContentEntry.

import { createServerCaller } from '@nexus/api';
import type { EventCategoryKey, HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface EventsPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Events', title: 'School Calendar & Events' };

export const getEventsPageChrome = cache(async (locale: LocaleEnumData): Promise<EventsPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:events',
    locale,
  });

  return {
    hero: (sections['events.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface CalendarMonthParams {
  locale: LocaleEnumData;
  month: string;
  category?: EventCategoryKey;
}

/** F-145's calendar grid + list view share this one fetch — every entry
 * for the month, calendar-only and card-producing alike. The caller
 * filters to `detail !== null` for the list view specifically. */
export const getCalendarMonth = cache(async ({ locale, month, category }: CalendarMonthParams) => {
  return createServerCaller().events.month({
    locale,
    month,
    category: category ?? 'all',
  });
});

export const getEventBySlug = cache(async (locale: LocaleEnumData, slug: string) => {
  return createServerCaller().events.bySlug({ locale, slug });
});

export const getUpcomingEvents = cache(async (locale: LocaleEnumData, limit = 3) => {
  return createServerCaller().events.upcoming({ locale, limit });
});
