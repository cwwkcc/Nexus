import { createServerCaller } from '@nexus/api';
import type {
  Locale,
  NavigationContentData,
  FooterContentData,
} from '@nexus/contracts';
import { cache } from 'react';

// ── Global navigation ───────────────────────────────────────────────────────

export const getNavigationContent = cache(
  async (locale: Locale): Promise<NavigationContentData | null> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'global:navigation',
      locale,
    });
    return (sections['navigation.main'] as NavigationContentData) ?? null;
  },
);

// ── Global footer ────────────────────────────────────────────────────────────

export const getFooterContent = cache(
  async (locale: Locale): Promise<FooterContentData | null> => {
    const sections = await createServerCaller().contentEntry.getByScope({
      scope: 'global:footer',
      locale,
    });
    return (sections['footer.main'] as FooterContentData) ?? null;
  },
);

/**
 * Both fetchers return `null` if the database has no published row yet
 * (e.g. before the global content seed has run, or before an admin has
 * published anything for that scope). Navigation/Footer components in
 * @nexus/ui keep their hardcoded defaults as a fallback for exactly this
 * case — pass `undefined` rather than `null` into their props so the
 * component's own default parameter kicks in.
 */
