'use client';

// apps/admin/src/app/extracurriculars/ActivitiesListClient.tsx
//
// F-179 admin list. Search/category filters push into the URL (?q=&
// category=) so the server component re-fetches via
// caller.extracurriculars.adminList — same URL-driven-refetch convention
// SocietiesListClient.tsx uses. No pagination (see validators.ts's own
// note on why), and no drag-reorder — F-179's field list has no `order`
// concept (see schema.prisma's ExtracurricularActivity doc comment).
//
// Shows every activity returned by adminList, including retired
// (isActive = false) ones — a plain "Active"/"Retired" column, not a
// filter, so an editor can find and reactivate a retired activity without
// switching views.

import { EXTRACURRICULAR_CATEGORY_META } from '@nexus/contracts';
import { Button, Input, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { deleteActivity } from './actions.js';
import { categoryLabel, type AdminActivity } from '../../lib/entities/extracurriculars.js';

const categoryOptions = [{ value: 'all', label: 'All categories' }, ...EXTRACURRICULAR_CATEGORY_META.map(({ key, label }) => ({ value: key, label }))];

interface ActivitiesListClientProps {
  activities: AdminActivity[];
  currentQuery: string;
  currentCategory: string;
}

export function ActivitiesListClient({ activities, currentQuery, currentCategory }: ActivitiesListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/extracurriculars/router.ts) — hiding the
  // button for an Editor avoids a click guaranteed to be rejected, but
  // the server check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);

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
      router.push(`/extracurriculars?${params.toString()}`);
    });
  };

  const runDelete = async (activity: AdminActivity) => {
    if (!window.confirm(`Delete "${activity.name}"? This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteActivity(activity.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
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
          <Input label="Search" placeholder="Search by name or description…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Category" options={categoryOptions} value={currentCategory} onChange={(e) => pushParams({ category: e.target.value })} className="w-full md:w-56" />
        <Button type="button" variant="secondary" onClick={() => router.push('/extracurriculars/new')}>
          New activity
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        {activities.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No activities match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-default">
                <tr>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Name</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Category</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Achievements</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Status</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className="border-border-default bg-surface-elevated border-t">
                    <td className="px-space-4 py-space-3">
                      <Link href={`/extracurriculars/${activity.id}`} className="font-body text-body text-text-primary hover:text-gold-hover">
                        {activity.name}
                      </Link>
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{categoryLabel(activity.category)}</td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{activity.achievements.length}</td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{activity.isActive ? 'Active' : 'Retired'}</td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-2 flex items-center">
                        <Button size="sm" variant="ghost" onClick={() => router.push(`/extracurriculars/${activity.id}`)}>
                          Edit
                        </Button>
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(activity)}>
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
      </div>
    </div>
  );
}
