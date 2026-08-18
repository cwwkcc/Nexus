// apps/admin/src/app/archive/[id]/page.tsx
//
// F-182 edit form (Task 7.20). Mirrors achievements/[id]/page.tsx's shape:
// fetches the real archive entry via caller.archive.adminGetById and 404s
// (via notFound()) if it doesn't exist, rather than silently showing an
// empty/wrong form.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { ArchiveForm } from '../ArchiveForm.js';

interface EditArchiveEntryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArchiveEntryPage({ params }: EditArchiveEntryPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let archive;
  try {
    archive = await caller.archive.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${archive.title}`}>
      <ArchiveForm mode="edit" initial={archive} />
    </AdminShell>
  );
}
