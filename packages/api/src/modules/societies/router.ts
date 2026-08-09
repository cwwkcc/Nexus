// packages/api/src/modules/societies/router.ts
//
// list/bySlug are public — F-147's Societies Hub and F-148's detail page
// (and the latter's generateStaticParams). Everything else is
// admin-panel-only, matching modules/staff/router.ts's shape.
//
// `delete` additionally requires the 'admin' role via adminOnlyMutation —
// same reasoning as modules/staff/router.ts's hard delete: Society has no
// archived/soft-deleted state to fall back to (schema.prisma's Society
// model doc comment), so removing a row is always permanent, and
// @nexus/contracts' RBAC matrix grants `societies: ['read','write']` to
// Editor but `[...,'admin']` to Admin.

import { adminList, bySlug, createSociety, deleteSociety, getById, list, updateSociety } from './service.js';
import { SocietyAdminListInput, SocietyBySlugInput, SocietyCreateInput, SocietyDeleteInput, SocietyGetByIdInput, SocietyListInput, SocietyListOutput, SocietyOutput, SocietyUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const societiesRouter = router({
  list: publicProcedure
    .input(SocietyListInput)
    .output(SocietyListOutput)
    .query(({ ctx, input }) => list(ctx.db, input)),

  bySlug: publicProcedure
    .input(SocietyBySlugInput)
    .output(SocietyOutput.nullable())
    .query(({ ctx, input }) => bySlug(ctx.db, input)),

  adminList: adminProcedure
    .input(SocietyAdminListInput)
    .output(SocietyListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(SocietyGetByIdInput)
    .output(SocietyOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(SocietyCreateInput)
    .output(SocietyOutput)
    .mutation(({ ctx, input }) => createSociety(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(SocietyUpdateInput)
    .output(SocietyOutput)
    .mutation(({ ctx, input }) => updateSociety(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(SocietyDeleteInput)
    .output(SocietyDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteSociety(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type SocietiesRouter = typeof societiesRouter;
