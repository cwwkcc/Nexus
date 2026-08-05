// apps/admin/src/app/staff/new/page.tsx
//
// F-165 create form. Was an AdminPlaceholder stub with no form at all.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { StaffForm } from '../StaffForm.js';

export default function NewStaffMemberPage() {
  return (
    <AdminShell title="New staff member">
      <StaffForm mode="create" />
    </AdminShell>
  );
}
