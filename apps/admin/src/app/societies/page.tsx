// apps/admin/src/app/societies/page.tsx
//
// F-167 Societies list. Reads real data via caller.societies.adminList
// and the full staff roster (for the advisor column context, and passed
// through to the create/edit forms) — delegates interactivity to
// SocietiesListClient, matching staff/page.tsx's shape.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { SocietiesListClient } from './SocietiesListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface SocietiesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SocietiesPage({ searchParams }: SocietiesPageProps) {
  const params = await searchParams;
  const category = firstValue(params.category) ?? 'all';
  const query = firstValue(params.q) ?? '';
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const societies = await caller.societies.adminList({
    locale,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- narrowed to the real SocietyCategoryEnum by the router's own Zod validation; a bad value from the URL is simply rejected rather than silently coerced.
    category: category as any,
    query,
  });

  return (
    <AdminShell title="Societies">
      <SocietiesListClient societies={societies} currentQuery={query} currentCategory={category} />
    </AdminShell>
  );
}
