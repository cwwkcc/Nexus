import { z } from 'zod';
import { adminProcedure, router, publicProcedure } from '../trpc.js';

export const pageConfigRouter = router({
  getByPage: publicProcedure
    .input(z.object({ page: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.pageConfig.findMany({
        where: { page: input.page },
        orderBy: { order: 'asc' },
      });
    }),

  update: adminMutation
    .input(
      z.object({
        page: z.string().min(1),
        sectionKey: z.string().min(1),
        enabled: z.boolean(),
        order: z.number().int().nonnegative(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { page, sectionKey, enabled, order } = input;
      return ctx.db.pageConfig.upsert({
        where: { page_sectionKey: { page, sectionKey } },
        create: { page, sectionKey, enabled, order },
        update: { enabled, order },
      });
    }),
});
