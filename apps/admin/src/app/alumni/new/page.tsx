// apps/admin/src/app/alumni/new/page.tsx
//
// F-180 create form (Task 7.18). Mirrors staff/new/page.tsx's shape.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { AlumniForm } from '../AlumniForm.js';

export default function NewAlumniProfilePage() {
  return (
    <AdminShell title="New alumni profile">
      <AlumniForm mode="create" />
    </AdminShell>
  );
}
