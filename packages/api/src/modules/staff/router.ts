// packages/api/src/modules/staff/router.ts
//
// `byRole` is the main public procedure — it's what
// apps/web/src/server/content/administration.ts calls for the
// principal/deputy/assistant/head-prefect sections (F-160). `byId` is a
// smaller public addition from Societies (Task 7.6, F-148) — see
// service.ts's own doc comment on why a lookup-by-id needed a separate,
// gracefully-degrading function rather than reusing the admin-only
// `getById`. Everything else is admin-panel-only, matching
// modules/media/router.ts's shape more than modules/news/router.ts's
// (News also has public list/bySlug/getFeatured/getRelated procedures
// beyond its own single admin-facing list).
//
// `delete` additionally requires the 'admin' role via adminOnlyMutation —
// same reasoning as modules/media/router.ts's hard delete: the Staff
// Module has no draft/archive state to fall back to (schema.prisma's
// Staff model doc comment), so removing a row is always permanent, and
// @nexus/contracts' RBAC matrix grants `staff: ['read','write']` to
// Editor but `[...,'admin']` to Admin. `reorder` stays on adminMutation —
// dragging display order isn't destructive or irreversible the way a hard
// delete is, so there's no reason to withhold it from Editors.

import { createStaff, deleteStaff, getById, adminList, byRole, publicById, reorderStaff, updateStaff } from './service.js';
import { StaffAdminListInput, StaffByRoleInput, StaffCreateInput, StaffDeleteInput, StaffGetByIdInput, StaffListOutput, StaffOutput, StaffReorderInput, StaffUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const staffRouter = router({
  byRole: publicProcedure
    .input(StaffByRoleInput)
    .output(StaffListOutput)
    .query(({ ctx, input }) => byRole(ctx.db, input)),

  byId: publicProcedure
    .input(StaffGetByIdInput)
    .output(StaffOutput.nullable())
    .query(({ ctx, input }) => publicById(ctx.db, input)),

  adminList: adminProcedure
    .input(StaffAdminListInput)
    .output(StaffListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(StaffGetByIdInput)
    .output(StaffOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(StaffCreateInput)
    .output(StaffOutput)
    .mutation(({ ctx, input }) => createStaff(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(StaffUpdateInput)
    .output(StaffOutput)
    .mutation(({ ctx, input }) => updateStaff(ctx.db, ctx.config, input)),

  reorder: adminMutation
    .input(StaffReorderInput)
    .output(StaffListOutput)
    .mutation(({ ctx, input }) => reorderStaff(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(StaffDeleteInput)
    .output(StaffDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteStaff(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type StaffRouter = typeof staffRouter;
