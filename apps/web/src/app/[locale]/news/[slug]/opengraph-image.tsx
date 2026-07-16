// apps/web/src/app/[locale]/news/[slug]/opengraph-image.tsx
//
// Per-article title is derived from the slug (title-cased), not the real
// stored article title — news/[slug]/page.tsx (F-130) isn't built yet, so
// there's no content-fetching layer to pull the real title from. Naive
// title-casing also mangles acronyms (e.g. 'kits-wins-hackathon' becomes
// 'Kits Wins Hackathon', not 'KITS Wins Hackathon'). Swap this for a real
// title lookup once F-130's data layer exists.

import { createDefaultOgImage, ogImageContentType, ogImageSize } from '../../../../lib/default-og-image';

export const alt = 'C.W.W. Kannangara Central College — News';
export const size = ogImageSize;
export const contentType = ogImageContentType;

interface NewsOgImageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: NewsOgImageProps) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return createDefaultOgImage({ title, kicker: 'News' });
}
