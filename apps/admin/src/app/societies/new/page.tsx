// apps/admin/src/app/societies/new/page.tsx
//
// F-167 create form. Fetches the full staff roster server-side to power
// the advisor picker (F-148).

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { SocietyForm } from '../SocietyForm.js';

export default async function NewSocietyPage() {
  const caller = await getServerCaller();
  const staff = await caller.staff.adminList({});

  return (
    <AdminShell title="New society">
      <SocietyForm mode="create" staffOptions={staff.map((s) => ({ id: s.id, name: s.name, title: s.title }))} />
    </AdminShell>
  );
}
