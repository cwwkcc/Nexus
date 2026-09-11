'use client';

// apps/admin/src/app/alumni/AlumniListClient.tsx
//
// F-180 Alumni Module list client (Task 7.18). Mirrors
// apps/admin/src/app/staff/StaffListClient.tsx's shape: filterable by
// status, graduation year, and profession, with bulk approve/reject actions.
// Unlike Staff, Alumni has pagination (directory can grow beyond one page) and
// no drag-and-drop reorder (no order field).

import { Button, Input, Select } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { bulkUpdateAlumniStatus, deleteAlumniProfile } from './actions.js';
import { ALUMNI_STATUS_LABELS, getGraduationYears, statusOptions, type AdminAlumni } from '../../lib/entities/alumni.js';

interface AlumniListClientProps {
  alumni: {
    items: AdminAlumni[];
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
  currentStatus: string;
  currentGraduationYear: string;
  currentProfession: string;
}

export function AlumniListClient({ alumni, currentQuery, currentStatus, currentGraduationYear, currentProfession }: AlumniListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/alumni/router.ts) — hiding the button for an
  // Editor avoids a click that's guaranteed to be rejected, but the server
  // check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const graduationYears = getGraduationYears(alumni.items);

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
      router.push(`/alumni?${params.toString()}`);
    });
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === alumni.items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(alumni.items.map((a) => a.id)));
    }
  };

  const runBulkStatusUpdate = async (status: 'APPROVED' | 'REJECTED') => {
    if (selectedIds.size === 0) {
      setActionError('Please select at least one profile to update.');
      return;
    }

    const rejectionReason = status === 'REJECTED' ? (window.prompt('Reason for rejection (optional):') ?? undefined) : undefined;
    setActionError(null);

    const result = await bulkUpdateAlumniStatus(Array.from(selectedIds), status, rejectionReason);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }

    setSelectedIds(new Set());
    router.refresh();
  };

  const runDelete = async (profile: AdminAlumni) => {
    if (!window.confirm(`Remove ${profile.name} from the Alumni Directory? This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteAlumniProfile(profile.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const { items, pagination } = alumni;

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
          <Input label="Search" placeholder="Search by name, role, or organization…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Select label="Status" options={statusOptions} value={currentStatus} onChange={(e) => pushParams({ status: e.target.value })} className="w-full md:w-48" />
        <Select label="Graduation Year" options={[{ value: '', label: 'All years' }, ...graduationYears.map((year) => ({ value: year, label: year }))]} value={currentGraduationYear} onChange={(e) => pushParams({ graduationYear: e.target.value })} className="w-full md:w-48" />
        <Input label="Profession" placeholder="Filter by profession…" value={currentProfession} onChange={(e) => pushParams({ profession: e.target.value })} className="w-full md:w-64" />
        <Button type="button" variant="secondary" onClick={() => router.push('/alumni/new')}>
          New alumni profile
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="border-border-default bg-surface-elevated px-space-4 py-space-3 text-body rounded-md border flex items-center gap-space-3">
          <span className="text-text-subtle">{selectedIds.size} selected</span>
          <Button size="sm" variant="primary" onClick={() => runBulkStatusUpdate('APPROVED')}>
            Approve
          </Button>
          <Button size="sm" variant="secondary" onClick={() => runBulkStatusUpdate('REJECTED')}>
            Reject
          </Button>
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity flex flex-col gap-space-8' : 'transition-opacity flex flex-col gap-space-8'}>
        {items.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No alumni match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="border-border-default bg-surface-elevated border-b">
                <tr>
                  <th className="px-space-4 py-space-3 text-body font-medium">
                    <input type="checkbox" checked={selectedIds.size === items.length} onChange={toggleAll} className="w-4 h-4" />
                  </th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Name</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Year</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Current Role</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Organization</th>
                  <th className="px-space-4 py-space-3 text-body font-medium">Status</th>
                  <th className="px-space-4 py-space-3 text-body font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((profile) => (
                  <tr key={profile.id} className="border-border-default border-b last:border-b-0 hover:bg-surface-hover">
                    <td className="px-space-4 py-space-3">
                      <input type="checkbox" checked={selectedIds.has(profile.id)} onChange={() => toggleSelection(profile.id)} className="w-4 h-4" />
                    </td>
                    <td className="px-space-4 py-space-3">
                      <div className="flex items-center gap-space-3">
                        {profile.portrait && <img src={profile.portrait.src} alt={profile.portrait.alt} className="w-10 h-10 rounded-full object-cover" />}
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          {profile.stream && <div className="text-sm text-text-subtle">{profile.stream}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-space-4 py-space-3">{profile.graduationYear}</td>
                    <td className="px-space-4 py-space-3">{profile.currentRole || '—'}</td>
                    <td className="px-space-4 py-space-3">{profile.currentOrg || '—'}</td>
                    <td className="px-space-4 py-space-3">
                      <span className={`px-space-2 py-space-1 text-xs rounded-full ${profile.status === 'APPROVED' ? 'bg-semantic-success-subtle text-semantic-success-base' : profile.status === 'PENDING' ? 'bg-semantic-warning-subtle text-semantic-warning-base' : 'bg-semantic-error-subtle text-semantic-error-base'}`}>{ALUMNI_STATUS_LABELS[profile.status]}</span>
                    </td>
                    <td className="px-space-4 py-space-3 text-right">
                      <div className="flex items-center justify-end gap-space-2">
                        <Link href={`/alumni/${profile.id}`}>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </Link>
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(profile)}>
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
