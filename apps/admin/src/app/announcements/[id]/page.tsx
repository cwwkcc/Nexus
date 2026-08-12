// apps/admin/src/app/announcements/[id]/page.tsx
//
// F-172 edit form. Fetches the real announcement via
// caller.announcements.adminGetById and 404s (via notFound()) if it
// doesn't exist, matching societies/[id]/page.tsx's shape.

import { notFound } from 'next/navigation';

import { AnnouncementForm } from '../AnnouncementForm.js';
import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';

interface EditAnnouncementPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAnnouncementPage({ params }: EditAnnouncementPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let announcement;
  try {
    announcement = await caller.announcements.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title="Edit announcement">
      <AnnouncementForm mode="edit" initial={announcement} />
    </AdminShell>
  );
}
