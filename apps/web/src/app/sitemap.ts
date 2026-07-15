import { SUPPORTED_LOCALES } from '@nexus/contracts';
import { clientEnv } from '@nexus/env/client';
import type { MetadataRoute } from 'next';

// No more `?? 'https://cwwkcc.lk'` fallback — see the note in metadata.ts.
const siteUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

const staticRoutes = ['', 'about', 'news', 'events', 'societies', 'academics', 'administration', 'admissions', 'contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
    })),
  );
}
