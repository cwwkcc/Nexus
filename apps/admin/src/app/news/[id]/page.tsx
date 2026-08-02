// apps/admin/src/app/news/[id]/page.tsx
//
// F-164 edit form. Was a static prototype rendering the same hardcoded
// values regardless of [id] — now fetches the real article via
// caller.news.adminGetById and 404s (via notFound()) if it doesn't exist,
// rather than silently showing an empty/wrong form.

import { notFound } from 'next/navigation';

import { AdminShell } from '../../../features/shell/AdminShell.js';
import { getServerCaller } from '../../../lib/server-caller.js';
import { NewsForm } from '../NewsForm.js';

interface EditNewsArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsArticlePage({ params }: EditNewsArticlePageProps) {
  const { id } = await params;
  const caller = await getServerCaller();

  let article;
  try {
    article = await caller.news.adminGetById({ id });
  } catch {
    notFound();
  }

  return (
    <AdminShell title={`Edit: ${article.title}`}>
      <NewsForm mode="edit" initial={article} />
    </AdminShell>
  );
}
