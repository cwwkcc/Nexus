// packages/contracts/src/editorial/news/article.ts
//
// News article contract.
//
// NewsArticleSchema     — the full entity: id, title, slug, excerpt,
//                         content (RichText HTML), coverImage? (R2 key),
//                         category (NewsCategoryKey), author?, publishedAt (ISO),
//                         tags?: string[], seo? (SeoData), locale
// ArticleCardSchema     — lighter projection for list views (used by @nexus/ui)
//
// Notes:
//   Articles are stored as ContentEntry rows with scope 'editorial:news'.
//   Full content is Tiptap HTML — render with RichTextRenderer in @nexus/ui.
//   Category reuses NewsCategorySchema from category.ts rather than a
//   separate ArticleCategory enum.

import { z } from 'zod';

import { NewsCategorySchema } from './category.ts';
import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from '../../constants/index.ts';
import { ImageSchema, LocaleEnum, RichTextSchema, SeoSchema } from '../../primitives/index.ts';

export const NEWS_ARTICLE_CONTENT_TYPE = 'news-article';

// The full entity — CMS/admin CRUD and ContentEntry storage.
export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string().max(MAX_TITLE_LENGTH),
  slug: z.string(),
  excerpt: z.string().max(MAX_DESCRIPTION_LENGTH),
  content: RichTextSchema,
  coverImage: ImageSchema.optional(),
  category: NewsCategorySchema,
  author: z.string().optional(),
  publishedAt: z.string(), // ISO datetime
  tags: z.array(z.string()).optional(),
  seo: SeoSchema.optional(),
  locale: LocaleEnum,
});

export type NewsArticleData = z.infer<typeof NewsArticleSchema>;

export const NewsCardVariant = z.enum(['featured', 'standard', 'compact']);

// Card projection — matches @nexus/ui's NewsCardProps exactly.
export const ArticleCardSchema = z.object({
  variant: NewsCardVariant.optional(),
  title: z.string(),
  excerpt: z.string().optional(),
  category: z.string(),
  date: z.string(),
  href: z.string(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  readTime: z.string().optional(),
});

export type ArticleCardData = z.infer<typeof ArticleCardSchema>;
export type NewsCardVariantType = z.infer<typeof NewsCardVariant>;

export const NewsCardVariantValues = NewsCardVariant.enum;
