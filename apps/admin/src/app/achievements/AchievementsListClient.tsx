'use client';

// apps/admin/src/app/achievements/AchievementsListClient.tsx
//
// F-181 Achievement Module list client (Task 7.19). Mirrors
// apps/admin/src/app/alumni/AlumniListClient.tsx's shape: filterable by
// category and year, with pagination. No bulk actions since achievements
// don't have a moderation workflow like alumni.

import { Button, Input, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { deleteAchievement } from './actions.js';
import { ACHIEVEMENT_CATEGORY_LABELS, ACHIEVEMENT_LEVEL_LABELS, categoryOptions, getYears, type AdminAchievement } from '../../lib/achievements.js';

interface AchievementsListClientProps {
  achievements: {
    items: AdminAchievement[];
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  currentQuery: string;
  currentCategory: string;
  currentYear: string;
}

export function AchievementsListClient({ achievements, currentQuery, currentCategory, currentYear }: AchievementsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/achievements/router.ts) — hiding the button for an
  // Editor avoids a click that's guaranteed to be rejected, but the server
  // check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);

  const years = getYears(achievements.items);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/achievements?${params.toString()}`);
    });
  };

  const runDelete = async (achievement: AdminAchievement) => {
    if (!window.confirm(`Remove "${achievement.title}" from the Achievement Database? This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteAchievement(achievement.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const { items, pagination } = achievements;

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
          <Input label="Search" placeholder="Search by title or student name…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Category" options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full md:w-48" />
        <Select label="Year" options={[{ value: '', label: 'All years' }, ...years.map((year) => ({ value: year, label: year }))]} value={currentYear} onChange={(e) => pushParams({ year: e.target.value })} className="w-full md:w-48" />
        <Button type="button" variant="secondary" onClick={() => router.push('/achievements/new')}>
          New achievement
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity flex flex-col gap-space-8' : 'transition-opacity flex flex-col gap-space-8'}>
        {items.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No achievements match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="border-border-default bg-surface-elevated border-b">
                <tr>
                  <th className="px-space-4 py-space-3 text-body font-medium">Student</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Title</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Category</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Level</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Date</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Awarded By</th>
                  <th className="px-space-4 py-space-3 text-body font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((achievement) => (
                  <tr key={achievement.id} className="border-border-default border-b last:border-b-0 hover:bg-surface-hover">
                    <td className="px-space-4 py-space-3 font-medium">{achievement.studentName}</td>
                    <td className="px-space-4 py-space-3">
                      <div className="flex items-center gap-space-3">
                        {achievement.image && <img src={achievement.image.src} alt={achievement.image.alt} className="w-10 h-10 rounded object-cover" />}
                        <div className="font-medium">{achievement.title}</div>
                      </div>
                    </td>
                    <td className="px-space-4 py-space-3">{ACHIEVEMENT_CATEGORY_LABELS[achievement.category]}</td>
                    <td className="px-space-4 py-space-3">{ACHIEVEMENT_LEVEL_LABELS[achievement.level]}</td>
                    <td className="px-space-4 py-space-3">{achievement.date}</td>
                    <td className="px-space-4 py-space-3">{achievement.awardedBy || '—'}</td>
                    <td className="px-space-4 py-space-3 text-right">
                      <div className="flex items-center justify-end gap-space-2">
                        <Link href={`/achievements/${achievement.id}`}>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </Link>
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(achievement)}>
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-subtle">
              Showing {pagination.page * pagination.pageSize - pagination.pageSize + 1} to {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
            </div>
            <div className="flex items-center gap-space-2">
              <Button size="sm" variant="secondary" disabled={!pagination.hasPrevPage} onClick={() => pushParams({ page: String(pagination.page - 1) })}>
                Previous
              </Button>
              <div className="text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </div>
              <Button size="sm" variant="secondary" disabled={!pagination.hasNextPage} onClick={() => pushParams({ page: String(pagination.page + 1) })}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
