// apps/web/src/lib/default-og-image.tsx
//
// Shared Open Graph image renderer, reused by:
//   - apps/web/src/app/[locale]/opengraph-image.tsx             (site-wide default)
//   - apps/web/src/app/[locale]/news/[slug]/opengraph-image.tsx (per-article)
//
// Uses next/og's ImageResponse (Satori under the hood), which only
// supports TTF/OTF/WOFF font files — NOT WOFF2. Every font file that
// exists today (apps/web/public/fonts/*.woff2) is WOFF2, so it can't be
// loaded here. This renders with Satori's bundled default sans font
// rather than the brand's Cormorant Garamond display face. To fix that:
// add a .ttf/.otf/.woff copy of Cormorant Garamond SemiBold under
// public/fonts, read it once at module scope (not per-request), and pass
// it via ImageResponse's `fonts` option.
//
// Colors come from @nexus/tokens — the background used to be a
// hand-typed '#1a472a', slightly off from brandColors.green.base
// ('#1A4A2E'); sourced directly now so it can't drift again.

import { brandColors } from '@nexus/tokens';
import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';

interface CreateDefaultOgImageOptions {
  title?: string;
  kicker?: string;
}

export function createDefaultOgImage({ title = 'C.W.W. Kannangara Central College', kicker }: CreateDefaultOgImageOptions = {}) {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 12, width: '100%', background: brandColors.gold.base, display: 'flex' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: brandColors.green.base,
            padding: '48px 80px',
            textAlign: 'center',
          }}
        >
          {kicker && (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                color: brandColors.gold.light,
                textTransform: 'uppercase',
                letterSpacing: 4,
                marginBottom: 20,
              }}
            >
              {kicker}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: 56, fontWeight: 700, color: 'white', lineHeight: 1.15 }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 24, color: brandColors.gold.pale, marginTop: 28 }}>Est. 1873 · Wisdom is All Wealth</div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
