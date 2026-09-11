// apps/web/src/lib/society-card.ts
//
// Maps a Society domain row (packages/api/src/modules/societies) onto
// SocietyCardData (@nexus/contracts), the projection @nexus/ui's
// SocietyCard renders. Same reasoning as event-card.ts's own header
// comment — centralized here since both the Hub grid and (eventually) any
// other listing surface need it.

import type { LocaleEnumData, SocietyCardData } from '@nexus/contracts';

export interface SocietyCardSource {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  category: string;
  logo: { src: string; alt: string } | null;
  banner: { src: string; alt: string } | null;
  isFeatured: boolean;
  memberCount: number | null;
  foundingYear: string | null;
}

export function toSocietyCard(society: SocietyCardSource, locale: LocaleEnumData): SocietyCardData {
  return {
    id: society.id,
    slug: society.slug,
    name: society.name,
    tagline: society.tagline ?? undefined,
    category: society.category as SocietyCardData['category'],
    logo: society.logo ?? undefined,
    isFeatured: society.isFeatured,
    imageSrc: society.banner?.src,
    imageAlt: society.banner?.alt,
    memberCount: society.memberCount ?? undefined,
    founded: society.foundingYear ?? undefined,
    href: `/${locale}/societies/${society.slug}`,
  };
}
