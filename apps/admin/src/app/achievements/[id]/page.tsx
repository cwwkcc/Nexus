// apps/admin/src/app/achievements/[id]/page.tsx
//
// F-181 edit form (Task 7.19). Mirrors alumni/[id]/page.tsx's shape:
// fetches the real achievement via caller.achievements.adminGetById and 404s
// (via notFound()) if it doesn't exist, rather than silently showing an
// empty/wrong form.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { AchievementForm } from '../AchievementForm.js';

interface EditAchievementPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAchievementPage({ params }: EditAchievementPageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let achievement;
  try {
    achievement = await caller.achievements.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${achievement.title}`}>
      <AchievementForm mode="edit" initial={achievement} />
    </AdminShell>
  );
}
