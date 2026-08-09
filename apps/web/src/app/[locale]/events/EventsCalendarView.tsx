'use client';

// apps/web/src/app/[locale]/events/EventsCalendarView.tsx
//
// @nexus/ui's Calendar (month-view variant) manages its own `currentMonth`
// as internal state, seeded once from the `month` prop, and renders its
// own prev/next buttons that call an optional `onMonthChange` callback —
// it doesn't re-sync that internal state if the `month` prop changes
// later, and it has no prop to hide its own navigation row. Left
// unwired, clicking Calendar's own prev/next buttons would flip to a
// month this page never fetched events for, showing an empty grid.
//
// This wrapper closes that loop: `onMonthChange` pushes the new month
// into the URL — the same `?month=` param EventsListingControls' own nav
// uses for the list view — so the server component re-fetches, and
// `key={month}` (set by the caller) forces Calendar to remount with a
// freshly-seeded internal state whenever that fetch lands. Because both
// navigation paths write to the same URL param, page.tsx only renders
// EventsListingControls' own month-nav row for the list view and leaves
// calendar view to this component's, avoiding two redundant nav rows.

import { Calendar } from '@nexus/ui';
import type { EventCardData } from '@nexus/contracts';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventsCalendarViewProps {
  locale: string;
  events: EventCardData[];
  month: string;
  monthNames: string[];
  prevMonthLabel: string;
  nextMonthLabel: string;
}

export function EventsCalendarView({ locale, events, month, monthNames, prevMonthLabel, nextMonthLabel }: EventsCalendarViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleMonthChange = (nextMonth: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', nextMonth);
    router.push(`/${locale}/events?${params.toString()}`);
  };

  return <Calendar variant="month-view" events={events} month={month} onMonthChange={handleMonthChange} monthNames={monthNames} prevMonthLabel={prevMonthLabel} nextMonthLabel={nextMonthLabel} />;
}
