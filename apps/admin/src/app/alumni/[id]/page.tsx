// apps/admin/src/app/alumni/[id]/page.tsx
//
// F-180 edit form (Task 7.18). Mirrors staff/[id]/page.tsx's shape:
// fetches the real alumni profile via caller.alumni.adminGetById and 404s
// (via notFound()) if it doesn't exist, rather than silently showing an
// empty/wrong form.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { AlumniForm } from '../AlumniForm.js';

interface EditAlumniProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAlumniProfilePage({ params }: EditAlumniProfilePageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let alumni;
  try {
    alumni = await caller.alumni.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${alumni.name}`}>
      <AlumniForm mode="edit" initial={alumni} />
    </AdminShell>
  );
}
