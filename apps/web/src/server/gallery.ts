// apps/web/src/server/gallery.ts
//
// Server-side data fetchers for the Gallery module (Task 7.7, F-168),
// mirroring server/societies.ts's shape.

import { createServerCaller } from '@nexus/api';
import type { HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface GalleryPageChrome {
  hero: HeroData;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'Gallery', title: 'Photo Gallery' };

export const getGalleryPageChrome = cache(async (locale: LocaleEnumData): Promise<GalleryPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:gallery',
    locale,
  });

  return {
    hero: (sections['gallery.hero'] as HeroData | undefined) ?? fallbackHero,
  };
});

export interface GalleryAlbumListParams {
  locale: LocaleEnumData;
  year?: number;
  category?: string;
}

export const getGalleryAlbumList = cache(async ({ locale, year, category }: GalleryAlbumListParams) => {
  return createServerCaller().gallery.list({ locale, year, category });
});

export const getGalleryAlbumBySlug = cache(async (locale: LocaleEnumData, slug: string) => {
  return createServerCaller().gallery.bySlug({ locale, slug });
});
