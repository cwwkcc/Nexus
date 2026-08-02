// apps/web/src/lib/news-card.ts
//
// Maps a NewsArticleOutput (the real domain model, packages/api/src/modules/news)
// onto ArticleCardData (@nexus/contracts), the projection @nexus/ui's NewsCard
// actually renders. Centralized here rather than inlined at each call site
// since three places need it: the listing page, LatestNewsBlock, and the
// related-articles section on the article page.

import { NEWS_CATEGORIES } from '@nexus/contracts';
import type { ArticleCardData, NewsCardVariantType } from '@nexus/contracts';

export interface NewsCardSource {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  imageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  featured: boolean;
}

const dateFormatters: Record<string, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  si: new Intl.DateTimeFormat('si-LK', { day: 'numeric', month: 'long', year: 'numeric' }),
  ta: new Intl.DateTimeFormat('ta-LK', { day: 'numeric', month: 'long', year: 'numeric' }),
};

export function toArticleCard(article: NewsCardSource, locale: string, variant?: NewsCardVariantType): ArticleCardData {
  const formatter = dateFormatters[locale] ?? dateFormatters.en;
  const date = formatter.format(new Date(article.publishedAt ?? article.createdAt));

  return {
    variant,
    title: article.title,
    excerpt: article.excerpt ?? undefined,
    category: NEWS_CATEGORIES[article.category as keyof typeof NEWS_CATEGORIES] ?? article.category,
    date,
    href: `/${locale}/news/${article.slug}`,
    imageSrc: article.imageUrl ?? undefined,
  };
}
