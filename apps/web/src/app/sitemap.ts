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
// News articles (F-130 built as of M3) are appended below the static
// pages — each published article, per locale it's actually published in,
// with a real lastModified from its own updatedAt (unlike the static
// pages above, which are still the new Date() placeholder noted above).

import { PUBLIC_PAGE_KEYS, localizedPath } from '@nexus/config';
import { createServerCaller } from '@nexus/api';
import { SUPPORTED_LOCALES } from '@nexus/contracts';
import { clientEnv } from '@nexus/env/client';
import type { MetadataRoute } from 'next';

// No more `?? 'https://cwwkcc.lk'` fallback — see the note in metadata.ts.
const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

const NEWS_SITEMAP_PAGE_SIZE = 100; // keep within the server schema's valid maximum while still covering a full year of news entries.

async function newsRoutes(): Promise<MetadataRoute.Sitemap> {
  const caller = createServerCaller();
  const perLocale = await Promise.all(
    SUPPORTED_LOCALES.map((locale) =>
      caller.news.list({ locale, status: 'published', page: 1, pageSize: NEWS_SITEMAP_PAGE_SIZE }).then((result) =>
        result.items.map((article) => ({
          url: `${siteUrl}/${locale}/news/${article.slug}`,
          lastModified: new Date(article.updatedAt),
        })),
      ),
    ),
  );
  return perLocale.flat();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = PUBLIC_PAGE_KEYS.flatMap((page) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, page)}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(SUPPORTED_LOCALES.map((altLocale) => [altLocale, `${siteUrl}${localizedPath(altLocale, page)}`])),
      },
    })),
  );

  return [...staticRoutes, ...(await newsRoutes())];
}
