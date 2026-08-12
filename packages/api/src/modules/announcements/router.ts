// packages/api/src/modules/announcements/router.ts
//
// getActive is public — the site-wide banner slot (F-141/F-031).
// Everything else is admin-panel-only, matching modules/societies/
// router.ts's shape.
//
// `delete` requires the 'admin' role via adminOnlyMutation — same
// reasoning as every other hard-delete in this codebase: no archived/
// soft-deleted state to fall back to. `deactivate` stays on adminMutation
// (any signed-in Editor or Admin) — it's exactly as reversible as any
// other field edit an Editor can already make via `update`, just phrased
// as its own single-click action (F-172's own wording).

import { adminList, createAnnouncement, deactivateAnnouncement, deleteAnnouncement, getActive, getById, updateAnnouncement } from './service.js';
import { ActiveAnnouncementInput, AnnouncementAdminListInput, AnnouncementCreateInput, AnnouncementDeactivateInput, AnnouncementDeleteInput, AnnouncementGetByIdInput, AnnouncementListOutput, AnnouncementOutput, AnnouncementUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const announcementsRouter = router({
  getActive: publicProcedure
    .input(ActiveAnnouncementInput)
    .output(AnnouncementOutput.nullable())
    .query(({ ctx, input }) => getActive(ctx.db, input)),

  adminList: adminProcedure
    .input(AnnouncementAdminListInput)
    .output(AnnouncementListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(AnnouncementGetByIdInput)
    .output(AnnouncementOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(AnnouncementCreateInput)
    .output(AnnouncementOutput)
    .mutation(({ ctx, input }) => createAnnouncement(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(AnnouncementUpdateInput)
    .output(AnnouncementOutput)
    .mutation(({ ctx, input }) => updateAnnouncement(ctx.db, ctx.config, input)),

  deactivate: adminMutation
    .input(AnnouncementDeactivateInput)
    .output(AnnouncementOutput)
    .mutation(({ ctx, input }) => deactivateAnnouncement(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(AnnouncementDeleteInput)
    .output(AnnouncementDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteAnnouncement(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type AnnouncementsRouter = typeof announcementsRouter;
