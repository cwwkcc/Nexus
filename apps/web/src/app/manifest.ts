// apps/web/src/app/manifest.ts
//
// Web App Manifest (F-185 / Task 9.2). Typed replacement for the static
// public/manifest.json — Next detects this filename convention, serves it
// at /manifest.webmanifest, and injects <link rel="manifest"> itself, so
// nothing in the locale layout needs to reference it manually.
//
// Lives outside [locale] for the same reason sitemap.ts and the root
// opengraph-image.tsx do: there's no request locale to read here. Shortcuts
// point at the default locale explicitly via routing.defaultLocale +
// localizedPath rather than a hardcoded '/en/...'.
//
// Colors now come from @nexus/tokens, added as a direct dependency here —
// apps/web previously only reached tokens indirectly through
// @nexus/config's Tailwind preset (see apps/web/package.json).
//
// background_color changed from the old manifest.json's cream (#F7F3EC):
// that value matched the "Royal Institution" parchment spec in the
// proposal doc, but packages/tokens/src/themes/light.ts is an
// unimplemented stub — the primitives that actually shipped
// (packages/tokens/src/primitives/colors.ts) are dark-mode-native only.
// surface.base (#0A1F1C) is what the app actually renders as its
// background, so that's what the install splash screen should match.
// Swap this back to a cream token if a light theme ever gets built.

import { localizedPath } from '@nexus/config';
import { brandColors, surface } from '@nexus/tokens';
import type { MetadataRoute } from 'next';

import { routing } from '../i18n/routing';

const locale = routing.defaultLocale;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'C.W.W. Kannangara Central College',
    short_name: 'KCC',
    description: 'The official website of C.W.W. Kannangara Central College, Mathugama',
    id: '/',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    display_override: ['standalone', 'browser'],
    orientation: 'portrait-primary',
    background_color: surface.base,
    theme_color: brandColors.green.base,
    lang: locale,
    dir: 'ltr',
    categories: ['education'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'News', short_name: 'News', description: 'Latest school news and announcements', url: localizedPath(locale, 'news') },
      { name: 'Admissions', short_name: 'Admissions', description: 'How to apply to C.W.W. Kannangara Central College', url: localizedPath(locale, 'admissions') },
      { name: 'Contact', short_name: 'Contact', description: 'Get in touch with the school', url: localizedPath(locale, 'contact') },
    ],
  };
}
