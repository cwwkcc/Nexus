// apps/admin/src/app/announcements/new/page.tsx
//
// F-172 create form.

import { AnnouncementForm } from '../AnnouncementForm.js';
import { AdminShell } from '../../../features/shell/AdminShell.js';

export default function NewAnnouncementPage() {
  return (
    <AdminShell title="New announcement">
      <AnnouncementForm mode="create" />
    </AdminShell>
  );
}
