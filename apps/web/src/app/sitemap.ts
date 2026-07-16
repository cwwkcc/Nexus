// apps/web/src/app/sitemap.ts
//
// /sitemap.xml. Lists every static top-level page in all three locales,
// with hreflang cross-references (alternates.languages) so search
// engines know /en/about, /si/about, /ta/about are translations of the
// same page, not unrelated content.
//
// Routes now come from @nexus/config's PUBLIC_PAGE_KEYS + localizedPath
// (packages/config/src/paths.ts) instead of a hand-typed second list —
// the old staticRoutes array had drifted from PAGE_ROUTE_SEGMENTS and was
// silently missing 'extracurriculars', 'facilities', and 'gallery'.
//
// lastModified is still new Date() for every entry — an honest
// placeholder, not real per-page data. Editorial content lives in the
// PageContent table (ADR-009) and does have real updatedAt timestamps;
// wiring those in means this file needs to query @nexus/db instead of
// only reading static config. Left as a follow-up rather than guessing
// at a query shape here.
//
// news/[slug] articles aren't included — news/[slug]/page.tsx (F-130)
// isn't built yet, so there's no article list to iterate over.

import { PUBLIC_PAGE_KEYS, localizedPath } from '@nexus/config';
import { SUPPORTED_LOCALES } from '@nexus/contracts';
import { clientEnv } from '@nexus/env/client';
import type { MetadataRoute } from 'next';

// No more `?? 'https://cwwkcc.lk'` fallback — see the note in metadata.ts.
const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGE_KEYS.flatMap((page) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, page)}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(SUPPORTED_LOCALES.map((altLocale) => [altLocale, `${siteUrl}${localizedPath(altLocale, page)}`])),
      },
    })),
  );
}
