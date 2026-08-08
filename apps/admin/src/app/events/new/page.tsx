// apps/admin/src/app/events/new/page.tsx
//
// F-166 create form.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { EventForm } from '../EventForm.js';

export default function NewCalendarEntryPage() {
  return (
    <AdminShell title="New calendar entry">
      <EventForm mode="create" />
    </AdminShell>
  );
}
