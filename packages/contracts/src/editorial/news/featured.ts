// packages/contracts/src/editorial/news/featured.ts
//
// Featured news section — highlighted article(s) pinned at the top of the news page.
//
// FeaturedArticleSchema — a lightweight pointer to an article, not the article itself:
//                         articleId, displayUntil? (ISO datetime)
// FeaturedNewsSchema    — primary: FeaturedArticle, secondary?: FeaturedArticle[]
//
// Notes:
//   Stored in ContentEntry: sectionKey 'news.featured', scope 'editorial:news'.
//   Editors pin specific articles to the featured slot via the admin panel.
//   articleId is resolved against NewsArticleSchema server-side (e.g. by
//   newsRouter.getFeatured()) — this schema only stores the pin, not a
//   denormalized copy of the article.

import { z } from 'zod';

export const NEWS_FEATURED_CONTENT_TYPE = 'news-featured';

export const FeaturedArticleSchema = z.object({
  articleId: z.string().min(1),
  displayUntil: z.string().optional(), // ISO datetime
});

export const FeaturedNewsSchema = z.object({
  primary: FeaturedArticleSchema,
  secondary: z.array(FeaturedArticleSchema).optional(),
});

export type FeaturedArticleData = z.infer<typeof FeaturedArticleSchema>;
export type FeaturedNewsData = z.infer<typeof FeaturedNewsSchema>;
export type FeaturedNews = FeaturedNewsData;
