// apps/web/src/proxy.ts

import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match every pathname except:
    // - /api, /_next, /_vercel (framework/internal routes)
    // - the root-level opengraph-image route (no extension, not locale content)
    // - anything else with a file extension (favicon.ico, robots.txt, sw.js, manifest.json, sitemap.xml, ...)
    '/((?!api|_next|_vercel|opengraph-image$|.*\\..*).*)',
  ],
};
