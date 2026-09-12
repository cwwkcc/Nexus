// apps/web/src/server/announcements.ts
//
// Server-side data fetcher for the Announcements module (Task 6.10/7.13,
// F-031/F-172) — the single site-wide banner slot every page reads (see
// apps/web/src/app/[locale]/layout.tsx's own wiring).

import type { LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

import { getServerCaller } from './lib/server-caller';

export const getActiveAnnouncement = cache(async (locale: LocaleEnumData) => {
  const caller = await getServerCaller();
  return caller.announcements.getActive({ locale });
});
