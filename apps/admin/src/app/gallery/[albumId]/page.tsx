// apps/admin/src/app/gallery/[albumId]/page.tsx
//
// F-168 edit form. Fetches the real album via caller.gallery.adminGetById
// and 404s (via notFound()) if it doesn't exist, matching
// societies/[id]/page.tsx's shape.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { AlbumForm } from '../AlbumForm.js';

interface EditAlbumPageProps {
  params: Promise<{ albumId: string }>;
}

export default async function EditAlbumPage({ params }: EditAlbumPageProps) {
  const { albumId } = await params;
  const caller = await getServerCaller();

  let album;
  try {
    album = await caller.gallery.adminGetById({ id: albumId });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${album.title}`}>
      <AlbumForm mode="edit" initial={album} />
    </AdminShell>
  );
}
