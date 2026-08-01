import { getBySlug, listNews, saveArticle, updateStatus } from './service.js';
import { NewsArticleInput, NewsBySlugInput, NewsListInput, NewsListOutput, NewsStatusUpdateInput } from './validators.js';
import { adminMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const newsRouter = router({
  list: publicProcedure
    .input(NewsListInput)
    .output(NewsListOutput)
    .query(({ ctx, input }) => listNews(ctx.db, input)),

  bySlug: publicProcedure.input(NewsBySlugInput).query(({ ctx, input }) => getBySlug(ctx.db, input)),

  adminList: adminProcedure
    .input(NewsListInput)
    .output(NewsListOutput)
    .query(({ ctx, input }) => listNews(ctx.db, input)),

  create: adminMutation.input(NewsArticleInput).mutation(({ ctx, input }) => saveArticle(ctx.db, input)),

  update: adminMutation.input(NewsArticleInput).mutation(({ ctx, input }) => saveArticle(ctx.db, input)),

  setStatus: adminMutation.input(NewsStatusUpdateInput).mutation(({ ctx, input }) => updateStatus(ctx.db, input)),
});

export type NewsRouter = typeof newsRouter;
