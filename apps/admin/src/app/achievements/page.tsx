// apps/admin/src/app/achievements/page.tsx
//
// F-181 Achievement Module list (Task 7.19). Mirrors
// apps/admin/src/app/alumni/page.tsx's shape: filterable by category and year.
// Delegates the display to AchievementsListClient.

import { AchievementsListClient } from './AchievementsListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface AchievementsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AchievementsPage({ searchParams }: AchievementsPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q) ?? '';
  const category = firstValue(params.category) ?? 'all';
  const year = firstValue(params.year) ?? '';

  const caller = await getServerCaller();
  const achievements = await caller.achievements.adminList({
    category: category === 'all' ? undefined : (category as 'academic' | 'sports' | 'cultural' | 'other'),
    year: year || undefined,
    query: query || undefined,
  });

  return (
    <AdminShell title="Achievements">
      <AchievementsListClient achievements={achievements} currentQuery={query} currentCategory={category} currentYear={year} />
    </AdminShell>
  );
}
