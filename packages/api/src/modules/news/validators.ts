// packages/api/src/modules/news/validators.ts
//
// M3 fixes applied here (see docs/Completion Plan.md M3 notes):
//
// 1. Category taxonomy — was a locally invented
//    z.enum(['Academic','Sports','Events','Achievements','General']),
//    which collided with the real Event and Achievement domain models
//    landing in M4 (a "News" article filed under category "Events" is a
//    different thing from a row in the future Event table). Now derives
//    from @nexus/contracts' NEWS_CATEGORIES, the canonical taxonomy
//    (academic/sports/cultural/community/general) already used by
//    ArticleCardSchema/NewsCard.
//
// 2. `content` — was `z.string()`. RichTextRenderer (@nexus/ui) expects a
//    Tiptap document object, not an HTML/plain string, and
//    RichTextEditor.tsx (admin) now produces exactly that via
//    `editor.getJSON()`. Validates against TiptapNodeSchema, matching the
//    Prisma column, which is now `Json` not `String @db.Text`.
//
// 3. Pagination — list/adminList now take @nexus/contracts' PageInputSchema
//    and return PaginationMetaSchema alongside items, instead of a bare
//    array. That primitive's own doc comment names "editorial/news/article.ts
//    — article list pagination" as an intended consumer; this is that.
//
// 4. `author` — added (free-text byline), matching the Prisma field added
//    for F-144's "author attribution" requirement, which the original
//    validators never accounted for.
//
// 5. create/update are no longer the same function silently switching on
//    whether `id` is present (see service.ts) — createInput forbids `id`,
//    updateInput requires it. A typo'd id on create silently overwriting an
//    unrelated row, and a missing id on update silently inserting a
//    duplicate, are both real footguns this closes.

import { LocaleEnum, NewsCategorySchema, PageInputSchema, PaginationMetaSchema, TiptapNodeSchema } from '@nexus/contracts';
import { z } from 'zod';

export const NewsStatusInput = z.enum(['draft', 'review', 'published', 'archived']);
export const NewsCategoryInput = NewsCategorySchema;

export const NewsListInput = PageInputSchema.extend({
  locale: LocaleEnum,
  status: z.enum(['all', 'draft', 'review', 'published', 'archived']).optional().default('all'),
  category: z
    .union([NewsCategoryInput, z.literal('all')])
    .optional()
    .default('all'),
  query: z.string().trim().max(200).optional(),
  /** F-164 admin list "filter by category and date" — filters on
   * `updatedAt`, not `publishedAt`: drafts have no publishedAt and would
   * otherwise disappear from a date-filtered view with no visible reason
   * why. Plain YYYY-MM-DD, matching <input type="date">'s native value
   * format. */
  dateFrom: z.string().date().optional(),
  dateTo: z.string().date().optional(),
});

const NewsArticleFields = {
  locale: LocaleEnum,
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, and hyphen-separated (e.g. "sports-day-2026").'),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().max(280).optional().nullable(),
  content: TiptapNodeSchema,
  category: NewsCategoryInput,
  author: z.string().trim().max(120).optional().nullable(),
  featured: z.boolean().default(false),
  imageUrl: z.string().url().optional().nullable(),
  publishedAt: z.string().datetime().optional().nullable(),
};

/** Always inserts. Rejects an `id` outright rather than silently updating. */
export const NewsArticleCreateInput = z.object({
  ...NewsArticleFields,
  status: NewsStatusInput.default('draft'),
});

/** Always targets an existing row by `id`; service.ts throws NOT_FOUND (P2025) if it's missing rather than inserting a duplicate. */
export const NewsArticleUpdateInput = z.object({
  id: z.string().min(1),
  ...NewsArticleFields,
  status: NewsStatusInput,
});

export const NewsArticleOutput = z.object({
  id: z.string(),
  locale: LocaleEnum,
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  content: TiptapNodeSchema,
  category: NewsCategoryInput,
  author: z.string().nullable(),
  status: NewsStatusInput,
  featured: z.boolean(),
  imageUrl: z.string().nullable(),
  publishedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const NewsListOutput = z.object({
  items: z.array(NewsArticleOutput),
  pagination: PaginationMetaSchema,
});

export const NewsBySlugInput = z.object({
  locale: LocaleEnum,
  slug: z.string().min(1),
});

export const NewsGetByIdInput = z.object({
  id: z.string().min(1),
});

export const NewsStatusUpdateInput = z.object({
  id: z.string().min(1),
  status: NewsStatusInput,
});

export const NewsBulkStatusUpdateInput = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100),
  status: NewsStatusInput,
});

export const NewsFeaturedInput = z.object({
  locale: LocaleEnum,
  limit: z.number().int().min(1).max(12).default(3),
});

export const NewsRelatedInput = z.object({
  locale: LocaleEnum,
  excludeId: z.string().min(1),
  category: NewsCategoryInput,
  limit: z.number().int().min(1).max(12).default(3),
});

/** F-143 "Featured Article" hero slot — see service.ts's getPinned. */
export const NewsPinnedInput = z.object({
  locale: LocaleEnum,
});
