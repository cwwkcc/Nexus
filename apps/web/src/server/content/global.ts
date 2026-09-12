import type { FooterContentData, NavigationContentData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

import { getServerCaller } from '../lib/server-caller';

// ─── Footer ─────────────────────────────────────────────────────────────────

export const getFooterContent = cache(async (locale: LocaleEnumData): Promise<FooterContentData | null> => {
  const caller = await getServerCaller();
  const sections = await caller.contentEntry.getByScope({
    scope: 'global:footer',
    locale,
  });
  return (sections['footer.main'] as FooterContentData) ?? null;
});

// ─── Navigation ─────────────────────────────────────────────────────────────

export const getNavigationContent = cache(async (locale: 'en' | 'si' | 'ta'): Promise<NavigationContentData | null> => {
  const caller = await getServerCaller();
  const sections = await caller.contentEntry.getByScope({
    scope: 'global:navigation',
    locale,
  });
  return (sections['navigation.main'] as NavigationContentData) ?? null;
});
