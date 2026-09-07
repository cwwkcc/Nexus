'use client';

// apps/admin/src/app/archive/ArchiveListClient.tsx
//
// F-182 Digital Archive Module list client (Task 7.20). Mirrors
// apps/admin/src/app/achievements/AchievementsListClient.tsx's shape: filterable by
// category and year, with pagination. No bulk actions since archive entries
// don't have a moderation workflow.

import { Button, Input, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { deleteArchiveEntry } from './actions.js';
import { ARCHIVE_CATEGORY_LABELS, categoryOptions, getYears, type AdminArchive } from '../../lib/archive.js';

interface ArchiveListClientProps {
  archive: {
    items: AdminArchive[];
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

export function ArchiveListClient({ archive, currentQuery, currentCategory, currentYear }: ArchiveListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/archive/router.ts) — hiding the button for an
  // Editor avoids a click that's guaranteed to be rejected, but the server
  // check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);

  const years = getYears(archive.items);

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
      router.push(`/archive?${params.toString()}`);
    });
  };

  const runDelete = async (entry: AdminArchive) => {
    if (!window.confirm(`Remove "${entry.title}" from the Digital Archive? This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteArchiveEntry(entry.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const { items, pagination } = archive;

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
          <Input label="Search" placeholder="Search by title or description…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Category" options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full md:w-48" />
        <Select label="Year" options={[{ value: '', label: 'All years' }, ...years.map((year) => ({ value: year, label: year }))]} value={currentYear} onChange={(e) => pushParams({ year: e.target.value })} className="w-full md:w-48" />
        <Button type="button" variant="secondary" onClick={() => router.push('/archive/new')}>
          New archive entry
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity flex flex-col gap-space-8' : 'transition-opacity flex flex-col gap-space-8'}>
        {items.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No archive entries match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="border-border-default bg-surface-elevated border-b">
                <tr>
                  <th className="px-space-4 py-space-3 text-body font-medium">Title</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Category</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Year</th>
                  <th className="px-space-4 py-space-3 text-body font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((entry) => (
                  <tr key={entry.id} className="border-border-default border-b last:border-b-0 hover:bg-surface-hover">
                    <td className="px-space-4 py-space-3">
                      <div className="flex items-center gap-space-3">
                        <div className="relative h-space-10 w-space-10 shrink-0 overflow-hidden rounded border border-border-default">
                          {/* eslint-disable-next-line @next/next/no-img-element -- see AchievementForm.tsx's identical note: next/image would throw for a host outside next.config's remotePatterns. */}
                          <img src={entry.file.src} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="font-medium">{entry.title}</div>
                      </div>
                    </td>
                    <td className="px-space-4 py-space-3">{ARCHIVE_CATEGORY_LABELS[entry.category]}</td>
                    <td className="px-space-4 py-space-3">{entry.year}</td>
                    <td className="px-space-4 py-space-3 text-right">
                      <div className="flex items-center justify-end gap-space-2">
                        <Link href={`/archive/${entry.id}`}>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </Link>
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(entry)}>
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
