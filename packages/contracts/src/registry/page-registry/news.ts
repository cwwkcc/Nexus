// packages/contracts/src/registry/page-registry/news.ts
//
// Page registry for: News and Announcements (docs/Design System/Page
// Specifications.md section 06). The full article page
// (/news/[slug]) renders NewsArticleSchema directly — it isn't a registry
// section, since it's one article at a time, not a page composed of
// interchangeable sections.

import { z } from 'zod';

import { AnnouncementSchema, HeroSchema } from '../../blocks/index.ts';
import { ArticleCardSchema } from '../../editorial/news/article.ts';
import type { PageRegistry } from '../types.ts';

export const NewsHeroSchema = HeroSchema;

export const NewsAnnouncementSchema = AnnouncementSchema;

export const NewsFeaturedSchema = z.object({
  article: ArticleCardSchema,
});
export type NewsFeaturedData = z.infer<typeof NewsFeaturedSchema>;

export const NewsFeedSchema = z.object({
  articles: z.array(ArticleCardSchema),
});
export type NewsFeedData = z.infer<typeof NewsFeedSchema>;

export const newsRegistry: PageRegistry = {
  page: 'news',
  scope: 'page:news',
  label: 'News and Announcements',
  description: 'Manage the News page — the optional announcement banner, featured article, and the paginated news feed.',
  sections: [
    {
      key: 'news.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: NewsHeroSchema,
    },
    {
      key: 'news.announcement',
      blockKey: 'announcement',
      label: 'Announcement Banner',
      description: 'Optional dismissible urgent notice (e.g. "School reopens 5 May").',
      schema: NewsAnnouncementSchema,
    },
    {
      key: 'news.featured',
      blockKey: 'rich-text-block',
      label: 'Featured Article',
      description: 'The latest post with featured = true.',
      schema: NewsFeaturedSchema,
    },
    {
      key: 'news.feed',
      blockKey: 'rich-text-block',
      label: 'News Feed',
      description: '6\u201312 posts per page, filterable by category (Academic, Sports, Events, Achievements).',
      schema: NewsFeedSchema,
    },
  ],
};
