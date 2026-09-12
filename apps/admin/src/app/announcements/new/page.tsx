// apps/admin/src/app/announcements/new/page.tsx
//
// F-172 create form.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { AnnouncementForm } from '../AnnouncementForm.js';

export default function NewAnnouncementPage() {
  return (
    <AdminShell title="New announcement">
      <AnnouncementForm mode="create" />
    </AdminShell>
  );
}
