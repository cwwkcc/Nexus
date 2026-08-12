// apps/web/src/server/announcements.ts
//
// Server-side data fetcher for the Announcements module (Task 6.10/7.13,
// F-031/F-172) — the single site-wide banner slot every page reads (see
// apps/web/src/app/[locale]/layout.tsx's own wiring).

import { createServerCaller } from '@nexus/api';
import type { LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export const getActiveAnnouncement = cache(async (locale: LocaleEnumData) => {
  return createServerCaller().announcements.getActive({ locale });
});
