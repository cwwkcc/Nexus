import { z } from 'zod';

export const NewsCategorySchema = z.enum([
  'academic',
  'sports',
  'arts',
  'community',
  'announcement',
  'achievement',
]);

export const NewsStatusSchema = z.enum([
  'draft',
  'review',
  'published',
  'archived',
]);

export const NewsArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(3, 'Title too short').max(120, 'Title too long'),
  slug: z.string(),
  excerpt: z.string().max(160).optional(),
  category: NewsCategorySchema,
  status: NewsStatusSchema,
  date: z.string(), // ISO yyyy-mm-dd
  href: z.string(),
  imageSrc: z.string().url().optional(),
  imageAlt: z.string().optional(),
  readTime: z.string().optional(),
  author: z.string().optional(),
  viewCount: z.number().int().default(0),
  publishedAt: z.string().datetime().optional(),
});

// Form schema — subset used in admin create/edit forms.
// Omits server-generated fields.
export const NewsArticleFormSchema = NewsArticleSchema.omit({
  id: true,
  viewCount: true,
  publishedAt: true,
}).extend({
  status: NewsStatusSchema.default('draft'),
});

// --- Inferred types ---
export type NewsCategory = z.infer<typeof NewsCategorySchema>;
export type NewsStatus = z.infer<typeof NewsStatusSchema>;
export type NewsArticle = z.infer<typeof NewsArticleSchema>;
export type NewsArticleForm = z.infer<typeof NewsArticleFormSchema>;
