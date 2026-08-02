// apps/web/src/app/[locale]/news/[slug]/opengraph-image.tsx
//
// Was deriving the title from the slug (naive title-casing, which also
// mangles acronyms — 'kits-wins-hackathon' became 'Kits Wins Hackathon',
// not 'KITS Wins Hackathon') because there was no content-fetching layer
// yet. Now pulls the real stored title via getNewsArticleBySlug (F-144).

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';

import { createDefaultOgImage, ogImageContentType, ogImageSize } from '../../../../lib/default-og-image';
import { getNewsArticleBySlug } from '../../../../server/news';

export const alt = 'C.W.W. Kannangara Central College — News';
export const size = ogImageSize;
export const contentType = ogImageContentType;

interface NewsOgImageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export default async function Image({ params }: NewsOgImageProps) {
  const { locale, slug } = await params;
  const safeLocale = resolveLocale(locale);
  const article = await getNewsArticleBySlug(safeLocale, slug);

  const title = article
    ? article.title
    : slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '); // fallback for a slug with no matching article (e.g. a stale/removed one) — still better than a blank image.

  return createDefaultOgImage({ title, kicker: 'News' });
}
