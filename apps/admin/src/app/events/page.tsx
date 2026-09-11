// apps/admin/src/app/events/page.tsx
//
// F-166 Events list. Reads real data via caller.events.adminList and
// delegates interactivity (search/filters/pagination) to
// EventsListClient, matching news/page.tsx's shape.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { EventsListClient } from './EventsListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { currentMonthParam } from '../../lib/entities/events.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface EventsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const page = Number(firstValue(params.page) ?? '1') || 1;
  const category = (firstValue(params.category) ?? 'all') as 'all' | string;
  const kind = (firstValue(params.kind) ?? 'all') as 'all' | 'has-detail' | 'calendar-only';
  const query = firstValue(params.q) ?? '';
  const month = firstValue(params.month) ?? currentMonthParam();
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const { items, pagination } = await caller.events.adminList({
    locale,
    page,
    pageSize: 20,
    month,
    kind,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- narrowed to the real EventCategorySchema by the router's own Zod validation; a bad value from the URL is simply rejected rather than silently coerced.
    category: category as any,
    query,
  });

  return (
    <AdminShell title="Events">
      <EventsListClient entries={items} pagination={{ page: pagination.page, totalPages: pagination.totalPages }} currentQuery={query} currentCategory={category} currentKind={kind} currentMonth={month} currentLocale={locale} />
    </AdminShell>
  );
}
