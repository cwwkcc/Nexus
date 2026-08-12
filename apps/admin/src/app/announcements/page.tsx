// apps/admin/src/app/announcements/page.tsx
//
// F-172 Announcements list. Reads real data via
// caller.announcements.adminList and delegates interactivity
// (deactivate/delete) to AnnouncementsListClient, matching
// societies/page.tsx's shape.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { AnnouncementsListClient } from './AnnouncementsListClient.js';
import { AdminShell } from '../../features/shell/AdminShell.js';
import { getServerCaller } from '../../lib/server-caller.js';

interface AnnouncementsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AnnouncementsPage({ searchParams }: AnnouncementsPageProps) {
  const params = await searchParams;
  const rawLocale = firstValue(params.locale) ?? 'en';
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(rawLocale) ? (rawLocale as LocaleEnumData) : 'en';

  const caller = await getServerCaller();
  const announcements = await caller.announcements.adminList({ locale });

  return (
    <AdminShell title="Announcements">
      <AnnouncementsListClient announcements={announcements} />
    </AdminShell>
  );
}
