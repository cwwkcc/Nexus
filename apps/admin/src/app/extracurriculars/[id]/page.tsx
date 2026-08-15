// apps/admin/src/app/extracurriculars/[id]/page.tsx
//
// F-179 edit form. Fetches the real activity via
// caller.extracurriculars.adminGetById and 404s (via notFound()) if it
// doesn't exist, matching societies/[id]/page.tsx's shape. Also fetches
// the full staff roster for the coach/advisor picker.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { ActivityForm } from '../ActivityForm.js';

interface EditActivityPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let activity;
  try {
    activity = await caller.extracurriculars.adminGetById({ id });
  } catch {
    notFound();
  }

  const staff = await caller.staff.adminList({});

  return (
    <AdminShell title={`Edit: ${activity.name}`}>
      <ActivityForm mode="edit" initial={activity} staffOptions={staff.map((s) => ({ id: s.id, name: s.name, title: s.title }))} />
    </AdminShell>
  );
}
