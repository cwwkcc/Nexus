// apps/admin/src/app/archive/new/page.tsx
//
// F-182 create form (Task 7.20). Mirrors achievements/new/page.tsx's shape.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { ArchiveForm } from '../ArchiveForm.js';

export default function NewArchiveEntryPage() {
  return (
    <AdminShell title="New archive entry">
      <ArchiveForm mode="create" />
    </AdminShell>
  );
}
