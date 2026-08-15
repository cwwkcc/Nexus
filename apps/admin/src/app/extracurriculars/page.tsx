// apps/admin/src/app/extracurriculars/page.tsx
//
// F-179 Extracurriculars list. Reads real data via
// caller.extracurriculars.adminList — delegates interactivity to
// ActivitiesListClient, matching societies/page.tsx's shape.

import { EXTRACURRICULAR_CATEGORY_META, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { ActivitiesListClient } from './ActivitiesListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface ExtracurricularsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ExtracurricularsPage({ searchParams }: ExtracurricularsPageProps) {
  const params = await searchParams;
  const rawCategory = firstValue(params.category) ?? 'all';
  const category = rawCategory === 'all' || EXTRACURRICULAR_CATEGORY_META.some((meta) => meta.key === rawCategory) ? rawCategory : 'all';
  const query = firstValue(params.q) ?? '';
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const activities = await caller.extracurriculars.adminList({
    locale,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- narrowed to the real ExtracurricularCategoryEnum by the router's own Zod validation (checked against EXTRACURRICULAR_CATEGORY_META above); a bad value from the URL is simply rejected rather than silently coerced.
    category: category as any,
    query,
  });

  return (
    <AdminShell title="Extracurriculars">
      <ActivitiesListClient activities={activities} currentQuery={query} currentCategory={category} />
    </AdminShell>
  );
}
