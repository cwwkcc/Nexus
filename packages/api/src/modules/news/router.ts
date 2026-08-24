// packages/api/src/modules/news/router.ts
//
// M3 additions beyond the original create/update/setStatus/list/bySlug:
//   - Output validation added to every procedure (was missing on
//     create/update/bySlug) — defense-in-depth and self-documentation,
//     matching modules/content/router.ts's convention.
//   - getById (admin edit-by-id page), getFeatured (home "Latest News"),
//     getRelated (article page "related articles"), bulkSetStatus (admin
//     bulk actions).
//   - create/update split onto NewsArticleCreateInput/NewsArticleUpdateInput
//     instead of sharing one NewsArticleInput — see validators.ts's note.

import { bulkUpdateStatus, createArticle, getById, getBySlug, getFeatured, getPinned, getRelated, listNews, updateArticle, updateStatus } from './service.js';
import { NewsArticleCreateInput, NewsArticleOutput, NewsArticleUpdateInput, NewsBulkStatusUpdateInput, NewsBySlugInput, NewsFeaturedInput, NewsGetByIdInput, NewsListInput, NewsListOutput, NewsPinnedInput, NewsRelatedInput, NewsStatusUpdateInput } from './validators.js';
import { adminMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const newsRouter = router({
  list: publicProcedure
    .input(NewsListInput)
    .output(NewsListOutput)
    .query(({ ctx, input }) => listNews(ctx.db, input)),

  bySlug: publicProcedure
    .input(NewsBySlugInput)
    .output(NewsArticleOutput.nullable())
    .query(({ ctx, input }) => getBySlug(ctx.db, input)),

  getFeatured: publicProcedure
    .input(NewsFeaturedInput)
    .output(NewsArticleOutput.array())
    .query(({ ctx, input }) => getFeatured(ctx.db, input)),

  getPinned: publicProcedure
    .input(NewsPinnedInput)
    .output(NewsArticleOutput.nullable())
    .query(({ ctx, input }) => getPinned(ctx.db, input)),

  getRelated: publicProcedure
    .input(NewsRelatedInput)
    .output(NewsArticleOutput.array())
    .query(({ ctx, input }) => getRelated(ctx.db, input)),

  adminList: adminProcedure
    .input(NewsListInput)
    .output(NewsListOutput)
    .query(({ ctx, input }) => listNews(ctx.db, input)),

  adminGetById: adminProcedure
    .input(NewsGetByIdInput)
    .output(NewsArticleOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(NewsArticleCreateInput)
    .output(NewsArticleOutput)
    .mutation(({ ctx, input }) => createArticle(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(NewsArticleUpdateInput)
    .output(NewsArticleOutput)
    .mutation(({ ctx, input }) => updateArticle(ctx.db, ctx.config, input)),

  setStatus: adminMutation
    .input(NewsStatusUpdateInput)
    .output(NewsArticleOutput)
    .mutation(({ ctx, input }) => updateStatus(ctx.db, ctx.config, input)),

  bulkSetStatus: adminMutation
    .input(NewsBulkStatusUpdateInput)
    .output(NewsArticleOutput.array())
    .mutation(({ ctx, input }) => bulkUpdateStatus(ctx.db, ctx.config, input)),
});

export type NewsRouter = typeof newsRouter;
