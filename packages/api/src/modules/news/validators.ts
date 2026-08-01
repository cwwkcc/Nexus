import { LocaleEnum } from '@nexus/contracts';
import { z } from 'zod';

export const NewsStatusInput = z.enum(['draft', 'published', 'archived']);
export const NewsCategoryInput = z.enum(['Academic', 'Sports', 'Events', 'Achievements', 'General']);

export const NewsListInput = z.object({
  locale: LocaleEnum,
  status: z.enum(['all', 'draft', 'published', 'archived']).optional(),
  category: z.enum(['all', 'Academic', 'Sports', 'Events', 'Achievements', 'General']).optional(),
  query: z.string().optional(),
});

export const NewsArticleInput = z.object({
  id: z.string().optional(),
  locale: LocaleEnum,
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().max(280).optional().nullable(),
  content: z.string().min(1),
  category: NewsCategoryInput,
  status: NewsStatusInput,
  featured: z.boolean().default(false),
  imageUrl: z.string().url().optional().nullable(),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const NewsArticleOutput = z.object({
  id: z.string(),
  locale: LocaleEnum,
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  category: NewsCategoryInput,
  status: NewsStatusInput,
  featured: z.boolean(),
  imageUrl: z.string().nullable(),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const NewsListOutput = z.array(NewsArticleOutput);

export const NewsBySlugInput = z.object({
  locale: LocaleEnum,
  slug: z.string().min(1),
});

export const NewsStatusUpdateInput = z.object({
  id: z.string(),
  status: NewsStatusInput,
});
