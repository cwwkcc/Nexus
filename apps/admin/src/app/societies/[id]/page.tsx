// apps/admin/src/app/societies/[id]/page.tsx
//
// F-167 edit form. Fetches the real society via
// caller.societies.adminGetById and 404s (via notFound()) if it doesn't
// exist, matching events/[id]/page.tsx's shape. Also fetches the full
// staff roster for the advisor picker (F-148).

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { SocietyForm } from '../SocietyForm.js';

interface EditSocietyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSocietyPage({ params }: EditSocietyPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let society;
  try {
    society = await caller.societies.adminGetById({ id });
  } catch {
    notFound();
  }

  const staff = await caller.staff.adminList({});

  return (
    <AdminShell title={`Edit: ${society.name}`}>
      <SocietyForm mode="edit" initial={society} staffOptions={staff.map((s) => ({ id: s.id, name: s.name, title: s.title }))} />
    </AdminShell>
  );
}
