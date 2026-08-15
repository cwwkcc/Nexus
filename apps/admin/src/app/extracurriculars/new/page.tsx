// apps/admin/src/app/extracurriculars/new/page.tsx
//
// F-179 create form. Fetches the full staff roster server-side to power
// the coach/advisor picker.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { ActivityForm } from '../ActivityForm.js';

export default async function NewActivityPage() {
  const caller = await getServerCaller();
  const staff = await caller.staff.adminList({});

  return (
    <AdminShell title="New extracurricular activity">
      <ActivityForm mode="create" staffOptions={staff.map((s) => ({ id: s.id, name: s.name, title: s.title }))} />
    </AdminShell>
  );
}
