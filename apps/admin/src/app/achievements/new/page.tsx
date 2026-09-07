// apps/admin/src/app/achievements/new/page.tsx
//
// F-181 create form (Task 7.19). Mirrors alumni/new/page.tsx's shape.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { AchievementForm } from '../AchievementForm.js';

export default async function NewAchievementPage() {
  const caller = await getServerCaller();
  // F-181's "related News article" picker — 'en' only, see
  // AchievementForm.tsx's prop comment on why.
  const { items } = await caller.news.adminList({ locale: 'en', status: 'published', page: 1, pageSize: 100 });
  const newsArticles = items.map((article) => ({ id: article.id, title: article.title }));

  return (
    <AdminShell title="New achievement">
      <AchievementForm mode="create" newsArticles={newsArticles} />
    </AdminShell>
  );
}
