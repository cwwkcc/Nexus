// apps/web/src/lib/gallery-card.ts
//
// Maps a GalleryAlbum domain row (packages/api/src/modules/gallery) onto
// GalleryAlbumCardData (@nexus/contracts), the projection @nexus/ui's
// GalleryAlbumCard renders. Same reasoning as event-card.ts's/
// society-card.ts's own header comments.

import type { GalleryAlbumCardData, LocaleEnumData } from '@nexus/contracts';

export interface GalleryAlbumCardSource {
  slug: string;
  title: string;
  year: number;
  photoCount: number;
  category: string | null;
  coverPhoto: { src: string; alt: string } | null;
}

export function toGalleryAlbumCard(album: GalleryAlbumCardSource, locale: LocaleEnumData): GalleryAlbumCardData {
  return {
    title: album.title,
    year: String(album.year),
    photoCount: album.photoCount,
    category: album.category ?? undefined,
    href: `/${locale}/gallery/${album.slug}`,
    coverSrc: album.coverPhoto?.src,
    coverAlt: album.coverPhoto?.alt,
  };
}
