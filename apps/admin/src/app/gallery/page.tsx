// apps/admin/src/app/gallery/page.tsx
//
// F-168 Gallery album list. Reads real data via caller.gallery.adminList
// and delegates interactivity (search/reorder/delete) to
// GalleryListClient, matching societies/page.tsx's shape.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { GalleryListClient } from './GalleryListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface GalleryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q) ?? '';
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const albums = await caller.gallery.adminList({ locale, query });

  return (
    <AdminShell title="Gallery">
      <GalleryListClient albums={albums} currentQuery={query} currentLocale={locale} />
    </AdminShell>
  );
}
