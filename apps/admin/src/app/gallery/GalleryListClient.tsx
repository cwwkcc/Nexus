'use client';

// apps/admin/src/app/gallery/GalleryListClient.tsx
//
// F-168 admin list. Search/year/category filters push into the URL, same
// URL-driven-refetch convention every other admin list uses. Reordering
// mirrors StaffListClient.tsx's exact approach — native HTML5
// drag-and-drop plus keyboard-accessible move up/down buttons, since
// drag-and-drop alone has no keyboard equivalent at all (see that file's
// own header comment for the fuller reasoning).

import { Badge, Button, Input } from '@nexus/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';

import { deleteAlbum, reorderAlbums } from './actions.js';
import type { AdminGalleryAlbum } from '../../lib/entities/gallery.js';
import { moveAlbumId } from '../../lib/entities/gallery.js';

interface GalleryListClientProps {
  albums: AdminGalleryAlbum[];
  currentQuery: string;
  currentLocale: string;
}

export function GalleryListClient({ albums, currentQuery, currentLocale }: GalleryListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  // Hard delete is admin-role-only server-side (see
  // packages/api/src/modules/gallery/router.ts) — hiding the button for
  // an Editor avoids a click guaranteed to be rejected, but the server
  // check is still what actually enforces it.
  const canDelete = session?.user?.role === 'admin';

  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentQuery);
  const [actionError, setActionError] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const pushParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/gallery?${params.toString()}`);
    });
  };

  const albumIds = albums.map((album) => album.id);

  const commitReorder = async (orderedIds: string[]) => {
    setActionError(null);
    const result = await reorderAlbums(currentLocale, orderedIds);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    router.refresh();
  };

  const moveRow = (id: string, direction: -1 | 1) => {
    void commitReorder(moveAlbumId(albumIds, id, albumIds.indexOf(id) + direction));
  };

  const handleDrop = (targetId: string) => {
    const sourceId = draggingId;
    setDraggingId(null);
    if (!sourceId || sourceId === targetId) {
      return;
    }
    void commitReorder(moveAlbumId(albumIds, sourceId, albumIds.indexOf(targetId)));
  };

  const runDelete = async (album: AdminGalleryAlbum) => {
    if (!window.confirm(`Delete "${album.title}"? This removes all ${album.photoCount} photo(s) in it. This cannot be undone.`)) {
      return;
    }
    setActionError(null);
    const result = await deleteAlbum(album.id);
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
          <Input label="Search" placeholder="Search by title or description…" value={query} onChange={(e) => setQuery(e.target.value)} type="search" />
        </form>
        <Button type="button" variant="secondary" onClick={() => router.push('/gallery/new')}>
          New album
        </Button>
      </div>

      {actionError && (
        <div role="alert" className="border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base rounded-md border">
          {actionError}
        </div>
      )}

      <div className={isPending ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        {albums.length === 0 ? (
          <div className="border-border-default px-space-6 py-space-8 text-body text-text-muted rounded-md border border-dashed text-center">No albums match these filters.</div>
        ) : (
          <div className="border-border-default overflow-hidden rounded-md border">
            <table className="w-full border-collapse text-left">
              <thead className="bg-surface-default">
                <tr>
                  <th className="w-space-9 px-space-4 py-space-3" aria-hidden="true" />
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Title</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Year</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Category</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Photos</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Order</th>
                  <th className="px-space-4 py-space-3 text-label tracking-label text-text-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album, index) => (
                  <tr key={album.id} draggable onDragStart={() => setDraggingId(album.id)} onDragEnd={() => setDraggingId(null)} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(album.id)} className="border-border-default bg-surface-elevated border-t cursor-grab active:cursor-grabbing">
                    <td className="px-space-4 py-space-3 text-body text-text-subtle" aria-hidden="true">
                      ⠿
                    </td>
                    <td className="px-space-4 py-space-3">
                      <Link href={`/gallery/${album.id}`} className="font-body text-body text-text-primary hover:text-gold-hover">
                        {album.title}
                      </Link>
                    </td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{album.year}</td>
                    <td className="px-space-4 py-space-3 text-body text-text-muted">{album.category ?? '—'}</td>
                    <td className="px-space-4 py-space-3">
                      <Badge variant="category" label={`${album.photoCount} photos`} />
                    </td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-1 flex items-center">
                        <Button size="icon-sm" variant="ghost" aria-label={`Move ${album.title} up`} disabled={index === 0} onClick={() => moveRow(album.id, -1)}>
                          ↑
                        </Button>
                        <Button size="icon-sm" variant="ghost" aria-label={`Move ${album.title} down`} disabled={index === albums.length - 1} onClick={() => moveRow(album.id, 1)}>
                          ↓
                        </Button>
                      </div>
                    </td>
                    <td className="px-space-4 py-space-3">
                      <div className="gap-space-2 flex items-center">
                        <Button size="sm" variant="ghost" onClick={() => router.push(`/gallery/${album.id}`)}>
                          Edit
                        </Button>
                        {canDelete && (
                          <Button size="sm" variant="ghost" onClick={() => runDelete(album)}>
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
