// packages/api/src/modules/extracurriculars/router.ts
//
// `list` is public — F-161's Extracurriculars page. Everything else is
// admin-panel-only, matching modules/societies/router.ts's shape. No
// `bySlug` here — see this module's own header comment on validators.ts
// for why there's no individually routable detail page.
//
// `delete` additionally requires the 'admin' role via adminOnlyMutation —
// same reasoning as modules/societies/router.ts's hard delete:
// ExtracurricularActivity has no archived state beyond `isActive` (which
// any Editor can already toggle through the normal `update` mutation) to
// fall back to, so removing a row outright is always permanent, and
// @nexus/contracts' RBAC matrix grants `extracurriculars: ['read','write']`
// to Editor but `[...,'admin']` to Admin.

import { adminList, createActivity, deleteActivity, getById, list, updateActivity } from './service.js';
import { ExtracurricularActivityAdminListInput, ExtracurricularActivityCreateInput, ExtracurricularActivityDeleteInput, ExtracurricularActivityGetByIdInput, ExtracurricularActivityListInput, ExtracurricularActivityListOutput, ExtracurricularActivityOutput, ExtracurricularActivityUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const extracurricularsRouter = router({
  list: publicProcedure
    .input(ExtracurricularActivityListInput)
    .output(ExtracurricularActivityListOutput)
    .query(({ ctx, input }) => list(ctx.db, input)),

  adminList: adminProcedure
    .input(ExtracurricularActivityAdminListInput)
    .output(ExtracurricularActivityListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(ExtracurricularActivityGetByIdInput)
    .output(ExtracurricularActivityOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(ExtracurricularActivityCreateInput)
    .output(ExtracurricularActivityOutput)
    .mutation(({ ctx, input }) => createActivity(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(ExtracurricularActivityUpdateInput)
    .output(ExtracurricularActivityOutput)
    .mutation(({ ctx, input }) => updateActivity(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(ExtracurricularActivityDeleteInput)
    .output(ExtracurricularActivityDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteActivity(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type ExtracurricularsRouter = typeof extracurricularsRouter;
