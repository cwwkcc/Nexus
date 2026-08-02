// apps/admin/src/app/news/new/page.tsx
//
// F-164 create form. Was a static prototype with no submit handler at all.

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { NewsForm } from '../NewsForm.js';

export default function NewNewsArticlePage() {
  return (
    <AdminShell title="New article">
      <NewsForm mode="create" />
    </AdminShell>
  );
}
