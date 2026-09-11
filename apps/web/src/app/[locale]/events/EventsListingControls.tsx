'use client';

// apps/web/src/app/[locale]/events/EventsListingControls.tsx
//
// F-145: category filter, month navigation, and calendar/list view toggle
// for the public Events listing. Pushes into the URL (?category=&month=&
// view=) so the server component re-fetches via getCalendarMonth, matching
// NewsListingControls.tsx's shape. Not built on @nexus/ui's generic Tabs
// component for the view toggle — Tabs owns its active tab as internal
// component state and renders pre-supplied content per tab, which doesn't
// fit a toggle whose state needs to live in the URL (so a shared link
// preserves calendar-vs-list) and where both "tabs" render from the exact
// same fetched month, just filtered/laid out differently by the parent
// server component.

import { EVENT_CATEGORY_META, type LocaleEnumData } from '@nexus/contracts';
import { Button, Select } from '@nexus/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import type { EventsStrings } from '../../../lib/i18n/events';
import { monthLabel, shiftMonth } from '../../../lib/events-month';

interface EventsListingControlsProps {
  locale: LocaleEnumData;
  strings: EventsStrings;
  currentCategory: string;
  currentMonth: string;
  currentView: 'calendar' | 'list';
}

export function EventsListingControls({ locale, strings, currentCategory, currentMonth, currentView }: EventsListingControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const categoryOptions = [{ value: 'all', label: strings.allCategories }, ...EVENT_CATEGORY_META.map(({ key, label }) => ({ value: key, label }))];

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/${locale}/events?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-space-6">
      <div className="flex flex-col gap-space-4 sm:flex-row sm:items-end sm:justify-between">
        {/* Calendar view renders its own prev/next nav (EventsCalendarView
            wires it to the same ?month= param) — showing this row too
            would be a redundant second set of arrows for the same
            control. List view has no such built-in nav, so it needs
            this one. */}
        {currentView === 'list' ? (
          <div className="flex items-center gap-space-3">
            <Button size="sm" variant="ghost" onClick={() => pushParams({ month: shiftMonth(currentMonth, -1) })} aria-label={strings.prevMonth}>
              ←
            </Button>
            <span className="font-body text-body min-w-[9rem] text-center text-text-primary">{monthLabel(currentMonth, locale)}</span>
            <Button size="sm" variant="ghost" onClick={() => pushParams({ month: shiftMonth(currentMonth, 1) })} aria-label={strings.nextMonth}>
              →
            </Button>
          </div>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-space-4">
          <Select label={strings.allCategories} options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full sm:w-56" />
          <div className="flex overflow-hidden rounded-md border border-border-default" role="group" aria-label={`${strings.monthView} / ${strings.listView}`}>
            <Button size="sm" variant={currentView === 'calendar' ? 'secondary' : 'ghost'} onClick={() => pushParams({ view: 'calendar' })} aria-pressed={currentView === 'calendar'}>
              {strings.monthView}
            </Button>
            <Button size="sm" variant={currentView === 'list' ? 'secondary' : 'ghost'} onClick={() => pushParams({ view: 'list' })} aria-pressed={currentView === 'list'}>
              {strings.listView}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
