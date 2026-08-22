// packages/api/src/modules/alumni/router.ts
//
// Alumni router (Task 7.18, F-154/F-180). Mirrors the router.ts pattern
// from modules/news/router.ts.
//
// Public procedures:
//   - list: public alumni directory (APPROVED only)
//   - submit: public profile submission (F-180) — the first public
//     mutation in this codebase; every other router's mutations are
//     admin-gated. See validators.ts's `AlumniSubmitInput` and
//     service.ts's `submitProfile` for why this is safe to leave open.
// Admin procedures:
//   - adminList: all profiles (filterable by status)
//   - adminGetById: single profile for edit
//   - create: admin-direct entry (can set status to APPROVED)
//   - update: edit existing profile
//   - setStatus: approve/reject single profile
//   - bulkSetStatus: approve/reject multiple profiles
//   - delete: hard delete a profile

import { z } from 'zod';

import { bulkUpdateStatus, createProfile, deleteProfile, getById, listAdminAlumni, listPublicAlumni, submitProfile, updateProfile, updateStatus } from './service.js';
import { AlumniBulkStatusUpdateInput, AlumniCreateInput, AlumniGetByIdInput, AlumniListInput, AlumniListOutput, AlumniOutput, AlumniStatusUpdateInput, AlumniSubmitInput, AlumniSubmitOutput, AlumniUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const alumniRouter = router({
  list: publicProcedure
    .input(AlumniListInput.omit({ status: true }))
    .output(AlumniListOutput)
    .query(({ ctx, input }) => listPublicAlumni(ctx.db, input)),

  submit: publicProcedure
    .input(AlumniSubmitInput)
    .output(AlumniSubmitOutput)
    .mutation(({ ctx, input }) => submitProfile(ctx.db, ctx.config, input)),

  adminList: adminProcedure
    .input(AlumniListInput)
    .output(AlumniListOutput)
    .query(({ ctx, input }) => listAdminAlumni(ctx.db, input)),

  adminGetById: adminProcedure
    .input(AlumniGetByIdInput)
    .output(AlumniOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(AlumniCreateInput)
    .output(AlumniOutput)
    .mutation(({ ctx, input }) => createProfile(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(AlumniUpdateInput)
    .output(AlumniOutput)
    .mutation(({ ctx, input }) => updateProfile(ctx.db, ctx.config, input)),

  setStatus: adminMutation
    .input(AlumniStatusUpdateInput)
    .output(AlumniOutput)
    .mutation(({ ctx, input }) => updateStatus(ctx.db, ctx.config, input)),

  bulkSetStatus: adminMutation
    .input(AlumniBulkStatusUpdateInput)
    .output(AlumniOutput.array())
    .mutation(({ ctx, input }) => bulkUpdateStatus(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(AlumniGetByIdInput)
    .output(z.object({ success: z.boolean() }))
    .mutation(({ ctx, input }) => deleteProfile(ctx.db, ctx.config, input)),
});

export type AlumniRouter = typeof alumniRouter;
