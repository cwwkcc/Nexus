// apps/web/src/app/[locale]/opengraph-image.tsx
//
// Site-wide default OG image for every route under [locale] that doesn't
// define its own — the news article route (one level down) is the only
// one that currently does. This file "wins" for the home page, About,
// Academics, Admissions, etc.
//
// Not locale-aware yet: the same English name renders on /si and /ta
// pages too. If/when a Sinhala or Tamil form of the school's name is
// available, this can read the resolved locale from params (same pattern
// as news/[slug]/opengraph-image.tsx) and pass it into `title` below.

import { createDefaultOgImage, ogImageContentType, ogImageSize } from '../../lib/default-og-image';

export const alt = 'C.W.W. Kannangara Central College';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return createDefaultOgImage();
}
