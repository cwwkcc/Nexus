// apps/admin/src/app/staff/[id]/page.tsx
//
// F-165 edit form. Was an AdminPlaceholder stub rendering the same
// placeholder regardless of [id] — now fetches the real staff member via
// caller.staff.adminGetById and 404s (via notFound()) if it doesn't exist,
// rather than silently showing an empty/wrong form.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { StaffForm } from '../StaffForm.js';

interface EditStaffMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStaffMemberPage({ params }: EditStaffMemberPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let staff;
  try {
    staff = await caller.staff.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${staff.name}`}>
      <StaffForm mode="edit" initial={staff} />
    </AdminShell>
  );
}
