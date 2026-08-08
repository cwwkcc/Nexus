'use client';

// apps/admin/src/app/events/EventsListClient.tsx
//
// F-166 admin list. Mirrors NewsListClient.tsx's shape: search/filters
// push into the URL (?q=&category=&kind=&month=&page=) so the server
// component re-fetches via caller.events.adminList — real server-side
// pagination. Differs from News's list in two ways specific to this
// module: a month selector instead of a status filter (a calendar
// naturally organizes by month, not by draft/published/archived — that
// distinction lives one level down, on each row's own detail badge), and
// a "kind" filter (all / has a card / calendar-only) for F-145's own
// distinction between the two kinds of entry, instead of bulk publish/
// archive actions (an entry's publish state is edited per-row, in the
// form, alongside its other detail fields — no bulk action to duplicate
// here yet, matching Staff's list not having one either).

import { EVENT_CATEGORY_META, LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Badge, Button, Input, Pagination, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import type { AdminCalendarEntry } from '../../lib/events.js';
import { categoryLabel, formatEventDate, monthLabel, shiftMonth } from '../../lib/events.js';

const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const categoryOptions = [{ value: 'all', label: 'All categories' }, ...EVENT_CATEGORY_META.map(({ key, label }) => ({ value: key, label }))];
const kindOptions = [
  { value: 'all', label: 'All entries' },
  { value: 'has-detail', label: 'Has a card' },
  { value: 'calendar-only', label: 'Calendar-only' },
];

interface EventsListClientProps {
  entries: AdminCalendarEntry[];
  pagination: { page: number; totalPages: number };
  currentQuery: string;
  currentCategory: string;
  currentKind: string;
  currentMonth: string;
  currentLocale: LocaleEnumData;
}

export function EventsListClient({ entries, pagination, currentQuery, currentCategory, currentKind, currentMonth, currentLocale }: EventsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    if (!('page' in updates)) {
      params.delete('page');
    }
    startTransition(() => {
      router.push(`/events?${params.toString()}`);
    });
  };

  return (
    <div className="gap-space-6 flex flex-col">
      <div className="gap-space-4 flex flex-col md:flex-row md:items-end">
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            pushParams({ q: query });
          }}
        >
          <Input label="Search" placeholder="Search by title, notes, or description…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Category" options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full md:w-56" />
        <Select label="Kind" options={kindOptions} value={currentKind} onChange={(e) => pushParams({ kind: e.target.value })} className="w-full md:w-48" />
        <Select label="Language" options={localeOptions} value={currentLocale} onChange={(e) => pushParams({ locale: e.target.value })} className="w-full md:w-40" />
        <Button type="button" variant="secondary" onClick={() => router.push('/events/new')}>
          New calendar entry
        </Button>
      </div>

      <div className="gap-space-3 flex items-center">
        <Button size="sm" variant="ghost" onClick={() => pushParams({ month: shiftMonth(currentMonth, -1) })} aria-label="Previous month">
          ← Previous
        </Button>
        <span className="font-body text-body text-text-primary min-w-[10rem] text-center">{monthLabel(currentMonth)}</span>
        <Button size="sm" variant="ghost" onClick={() => pushParams({ month: shiftMonth(currentMonth, 1) })} aria-label="Next month">
          Next →
        </Button>
      </div>

      <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        {entries.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No calendar entries match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-default">
                <tr>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Title</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Date</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Category</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Card</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-border-default bg-surface-elevated border-t">
                    <td className="px-space-4 py-space-3">
                      <Link href={`/events/${entry.id}`} className="font-body text-body text-text-primary hover:text-gold-hover">
                        {entry.title}
                      </Link>
                      {entry.isRecurring && <Badge variant="category" label="Recurring" className="ml-space-2" />}
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{formatEventDate(entry.date)}</td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{categoryLabel(entry.category)}</td>
                    <td className="px-space-4 py-space-3">{entry.detail ? <Badge variant="status" status={entry.detail.status} /> : <span className="font-body text-caption text-text-muted">Calendar-only</span>}</td>
                    <td className="px-space-4 py-space-3">
                      <Button size="sm" variant="ghost" onClick={() => router.push(`/events/${entry.id}`)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={(page) => pushParams({ page: String(page) })} />
    </div>
  );
}
