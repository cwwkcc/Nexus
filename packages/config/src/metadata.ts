// packages/config/src/metadata.ts

import { clientEnv } from '@nexus/env/client';
import type { SeoData } from '@nexus/contracts';
import type { Metadata } from 'next';

const DEFAULT_SITE_NAME = 'C.W.W. Kannangara Central College';

interface CreateMetadataOptions {
  siteUrl?: string;
  siteName?: string;
}

/** Maps a CMS SeoData entry to Next.js Metadata, so every generateMetadata() does this the same way. */
export function createMetadata(seo: SeoData, options: CreateMetadataOptions = {}): Metadata {
  // No more `?? 'https://cwwkcc.lk'` fallback — clientEnv.NEXT_PUBLIC_SITE_URL
  // is validated and required at boot now, so if it's ever unset the app
  // fails to start instead of silently shipping the wrong canonical/OG URL
  // in whatever environment forgot to set it.
  const siteUrl = options.siteUrl ?? clientEnv.NEXT_PUBLIC_SITE_URL;
  const siteName = options.siteName ?? DEFAULT_SITE_NAME;

  return {
    title: seo.title,
    description: seo.description,
    ...(seo.canonical ? { alternates: { canonical: seo.canonical } } : {}),
    ...(seo.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: seo.ogTitle ?? seo.title,
      description: seo.ogDescription ?? seo.description,
      siteName,
      url: siteUrl,
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
  };
}
