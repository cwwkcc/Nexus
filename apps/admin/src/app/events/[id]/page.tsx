// apps/admin/src/app/events/[id]/page.tsx
//
// F-166 edit form. Fetches the real calendar entry via
// caller.events.adminGetById and 404s (via notFound()) if it doesn't
// exist, matching news/[id]/page.tsx's shape.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { EventForm } from '../EventForm.js';

interface EditCalendarEntryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCalendarEntryPage({ params }: EditCalendarEntryPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let entry;
  try {
    entry = await caller.events.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${entry.title}`}>
      <EventForm mode="edit" initial={entry} />
    </AdminShell>
  );
}
