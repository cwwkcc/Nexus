import { createServerCaller } from '@nexus/api';
import type {
  FooterContentData,
  NavigationContentData,
} from '@nexus/contracts';
import { cache } from 'react';

// ─── Footer ─────────────────────────────────────────────────────────────────

export const getFooterContent = cache(
  async (locale: 'en' | 'si' | 'ta'): Promise<FooterContentData | null> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'global:footer',
      locale,
    });
    return (sections['footer.main'] as FooterContentData) ?? null;
  },
);

// ─── Navigation ─────────────────────────────────────────────────────────────

export const getNavigationContent = cache(
  async (locale: 'en' | 'si' | 'ta'): Promise<NavigationContentData | null> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'global:navigation',
      locale,
    });
    return (sections['navigation.main'] as NavigationContentData) ?? null;
  },
);
