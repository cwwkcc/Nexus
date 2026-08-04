// apps/admin/src/app/media/page.tsx
//
// F-169 Media Library. Was an AdminPlaceholder stub (with a stale F-155
// reference — the real feature ID is F-169) — now reads real data via
// caller.media.list and delegates interactivity to MediaListClient, the
// same split news/page.tsx established for F-164.

import { MediaListClient } from './MediaListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import type { MediaFolder } from '../../lib/media.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface MediaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const VALID_FOLDERS: readonly string[] = ['images', 'documents', 'media', 'avatars'];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function MediaPage({ searchParams }: MediaPageProps) {
  const params = await searchParams;
  const page = Number(firstValue(params.page) ?? '1') || 1;
  const rawFolder = firstValue(params.folder) ?? 'all';
  const folder = (VALID_FOLDERS.includes(rawFolder) ? rawFolder : 'all') as MediaFolder | 'all';
  const query = firstValue(params.q) ?? '';

  const caller = await getServerCaller();
  const { items, pagination } = await caller.media.list({ folder, query, page, pageSize: 24 });

  return (
    <AdminShell title="Media Library">
      <MediaListClient assets={items} pagination={{ page: pagination.page, totalPages: pagination.totalPages }} currentQuery={query} currentFolder={folder} />
    </AdminShell>
  );
}
