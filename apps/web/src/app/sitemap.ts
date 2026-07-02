import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES } from '@nexus/contracts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cwwkcc.lk';

const staticRoutes = [
  '',
  'about',
  'news',
  'events',
  'societies',
  'academics',
  'administration',
  'admissions',
  'contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
    })),
  );
}
