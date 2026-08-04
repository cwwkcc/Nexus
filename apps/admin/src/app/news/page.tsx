// apps/admin/src/app/news/page.tsx
//
// F-164 News list. Was a static prototype with a hardcoded `initialArticles`
// array and non-functional buttons — now reads real data via
// caller.news.adminList and delegates interactivity to NewsListClient.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { NewsListClient } from './NewsListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface NewsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const page = Number(firstValue(params.page) ?? '1') || 1;
  const status = (firstValue(params.status) ?? 'all') as 'all' | 'draft' | 'published' | 'archived';
  const category = (firstValue(params.category) ?? 'all') as 'all' | string;
  const query = firstValue(params.q) ?? '';
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const { items, pagination } = await caller.news.adminList({
    locale,
    page,
    pageSize: 20,
    status,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- narrowed to the real NewsCategoryInput enum by the router's own Zod validation; a bad value from the URL is simply rejected rather than silently coerced.
    category: category as any,
    query,
  });

  return (
    <AdminShell title="News">
      <NewsListClient articles={items} pagination={{ page: pagination.page, totalPages: pagination.totalPages }} currentQuery={query} currentStatus={status} currentCategory={category} currentLocale={locale} />
    </AdminShell>
  );
}
