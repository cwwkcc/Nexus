// apps/web/src/app/robots.ts
//
// Typed replacement for the static public/robots.txt (F-106). Next
// detects this filename convention and serves it at /robots.txt.
//
// Uses clientEnv.NEXT_PUBLIC_SITE_URL rather than the hardcoded
// 'https://cwwkcc.lk' the old robots.txt had, so the sitemap reference is
// correct in every environment (staging/preview too) — matches
// sitemap.ts's existing pattern.

import { clientEnv } from '@nexus/env/client';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The admin panel is a separate app on its own subdomain
      // (admin.cwwkcc.lk) and is never served from a path on this
      // origin — disallowed here only as a defensive fallback.
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${clientEnv.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
