// apps/web/src/server/news.ts
//
// Server-side data fetchers for the News module (M3), mirroring
// server/content/about.ts's shape: a `cache()`-wrapped function per RSC
// page. Two different kinds of data feed the News pages:
//   - Page chrome (hero + announcement banner) — still ContentEntry rows
//     under scope 'page:news', hand-authored like every other page's hero.
//   - Everything else (the article list, individual articles, related
//     articles, the home page's "Latest News") — the real NewsArticle
//     domain model via the `news` tRPC router, not ContentEntry.

import { createServerCaller } from '@nexus/api';
import type { AnnouncementData, HeroData, LocaleEnumData } from '@nexus/contracts';
import { cache } from 'react';

export interface NewsPageChrome {
  hero: HeroData;
  announcement: AnnouncementData | null;
}

const fallbackHero: HeroData = { blockType: 'hero', eyebrow: 'News', title: 'News & Announcements' };

export const getNewsPageChrome = cache(async (locale: LocaleEnumData): Promise<NewsPageChrome> => {
  const sections = await createServerCaller().contentEntry.getByScope({
    scope: 'page:news',
    locale,
  });

  return {
    hero: (sections['news.hero'] as HeroData | undefined) ?? fallbackHero,
    announcement: (sections['news.announcement'] as AnnouncementData | undefined) ?? null,
  };
});

export interface NewsListingParams {
  locale: LocaleEnumData;
  page?: number;
  category?: string;
  query?: string;
}

export const getNewsListing = cache(async ({ locale, page = 1, category, query }: NewsListingParams) => {
  return createServerCaller().news.list({
    locale,
    page,
    pageSize: 12,
    status: 'published',
    category: (category as never) ?? 'all',
    query,
  });
});

export const getNewsArticleBySlug = cache(async (locale: LocaleEnumData, slug: string) => {
  return createServerCaller().news.bySlug({ locale, slug });
});

export const getFeaturedNews = cache(async (locale: LocaleEnumData, limit = 3) => {
  return createServerCaller().news.getFeatured({ locale, limit });
});

export const getPinnedNews = cache(async (locale: LocaleEnumData) => {
  return createServerCaller().news.getPinned({ locale });
});

export const getRelatedNews = cache(async (locale: LocaleEnumData, excludeId: string, category: string, limit = 3) => {
  return createServerCaller().news.getRelated({ locale, excludeId, category: category as never, limit });
});
