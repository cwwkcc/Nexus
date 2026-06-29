// packages/contracts/src/editorial/news/article.ts
//
// News article contract.
//
// Should contain:
//   ArticleCategory    — z.enum(['academic','sports','cultural','community',
//                                'announcement','achievement'])
//   ArticleSchema      — id, title, slug, excerpt, content (RichText HTML),
//                        coverImage? (R2 key), category (ArticleCategory),
//                        author?, publishedAt (ISO datetime), tags?: string[],
//                        seo? (SeoData), locale (Locale)
//   ArticleCardSchema  — lighter projection for list views:
//                        id, title, slug, excerpt, coverImage?, category, publishedAt
//   ArticleData        — z.infer type
//   ArticleCardData    — z.infer type
//
// Notes:
//   Articles are stored as ContentEntry rows with scope 'editorial:news'.
//   Full content is Tiptap HTML — render with RichTextRenderer in @nexus/ui.

import { z } from 'zod';

// TODO: implement
