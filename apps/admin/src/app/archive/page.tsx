// apps/admin/src/app/archive/page.tsx
//
// F-182 Digital Archive Module list (Task 7.20). Mirrors
// apps/admin/src/app/achievements/page.tsx's shape: filterable by category and year.
// Delegates the display to ArchiveListClient.

import { ArchiveListClient } from './ArchiveListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface ArchivePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const params = await searchParams;
  const query = firstValue(params.q) ?? '';
  const category = firstValue(params.category) ?? 'all';
  const year = firstValue(params.year) ?? '';

  const caller = await getServerCaller();
  const archive = await caller.archive.adminList({
    category: category === 'all' ? undefined : (category as 'photograph' | 'magazine' | 'prize_giving_record' | 'prefect_list'),
    year: year || undefined,
  });

  return (
    <AdminShell title="Digital Archive">
      <ArchiveListClient archive={archive} currentQuery={query} currentCategory={category} currentYear={year} />
    </AdminShell>
  );
}
