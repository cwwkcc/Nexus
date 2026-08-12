'use client';

// apps/admin/src/app/announcements/AnnouncementsListClient.tsx
//
// F-172 admin list ("View all active and past... Deactivate or delete").
// No pagination, no search/filter controls — matching validators.ts's own
// note on why this list is deliberately unpaginated, and there's no
// meaningful filter dimension the way News has category or Events has
// month; a school's announcement history is small enough to just show in
// full, newest-published first (service.ts's own adminList ordering).

import { Badge, Button } from '@nexus/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { deactivateAnnouncement, deleteAnnouncement } from './actions.js';
import type { AdminAnnouncement } from '../../lib/announcements.js';
import { statusLabel, variantLabel } from '../../lib/announcements.js';

interface AnnouncementsListClientProps {
  announcements: AdminAnnouncement[];
}

// Badge's `status` variant is a closed union (draft/published/archived/
// unread/reviewed) with its own FIXED internal label text — it has no
// `label` override prop at all (a discriminated union: passing one
// alongside `status` doesn't even typecheck). This module's four
// finer-grained states (Active now / Scheduled / Expired / Deactivated)
// don't map one-to-one onto that set, so the Badge below only supplies
// the coarse color-coding; `statusLabel`'s own more specific text is
// shown alongside it as plain text, not forced into the Badge itself.
function badgeStatusFor(label: string): 'published' | 'draft' | 'archived' {
  if (label === 'Active now') return 'published';
  if (label === 'Scheduled') return 'draft';
  return 'archived'; // Expired / Deactivated / Inactive
}

export function AnnouncementsListClient({ announcements }: AnnouncementsListClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/announcements/router.ts) — hiding the
  // button for an Editor avoids a click guaranteed to be rejected, but
  // the server check is still what actually enforces it. Deactivate has
  // no such restriction.
  const canDelete = session?.user?.role === 'admin';

  const [actionError, setActionError] = useState<string | null>(null);

  const runDeactivate = async (announcement: AdminAnnouncement) => {
    setActionError(null);
    const result = await deactivateAnnouncement(announcement.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const runDelete = async (announcement: AdminAnnouncement) => {
    if (!window.confirm(`Delete this announcement? This cannot be undone.\n\n"${announcement.message}"`)) {
      return;
    }
    setActionError(null);
    const result = await deleteAnnouncement(announcement.id);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="gap-space-6 flex flex-col">
      <div className="flex justify-end">
        <Button type="button" variant="secondary" onClick={() => router.push('/announcements/new')}>
          New announcement
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      {announcements.length === 0 ? (
        <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No announcements yet.</div>
      ) : (
        <div className="border-border-default overflow-hidden rounded-md border">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-default">
              <tr>
                <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Message</th>
                <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Variant</th>
                <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Status</th>
                <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => {
                const status = statusLabel(announcement);
                return (
                  <tr key={announcement.id} className="border-border-default bg-surface-elevated border-t">
                    <td className="px-space-4 py-space-3 max-w-[28rem]">
                      <Link href={`/announcements/${announcement.id}`} className="font-body text-body text-text-primary hover:text-gold-hover line-clamp-2">
                        {announcement.message}
                      </Link>
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{variantLabel(announcement.variant)}</td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-2 flex items-center">
                        <Badge variant="status" status={badgeStatusFor(status)} />
                        <span className="font-body text-caption text-text-muted">{status}</span>
                      </div>
                    </td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-2 flex items-center">
                        <Button size="sm" variant="ghost" onClick={() => router.push(`/announcements/${announcement.id}`)}>
                          Edit
                        </Button>
                        {announcement.isActive && (
                          <Button size="sm" variant="ghost" onClick={() => runDeactivate(announcement)}>
                            Deactivate
                          </Button>
                        )}
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(announcement)}>
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
