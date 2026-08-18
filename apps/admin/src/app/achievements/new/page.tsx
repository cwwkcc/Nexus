// apps/admin/src/app/achievements/new/page.tsx
//
// F-181 create form (Task 7.19). Mirrors alumni/new/page.tsx's shape.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { AchievementForm } from '../AchievementForm.js';

export default function NewAchievementPage() {
  return (
    <AdminShell title="New achievement">
      <AchievementForm mode="create" />
    </AdminShell>
  );
}
