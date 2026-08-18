// packages/api/src/modules/archive/router.ts
//
// Archive router (Task 7.20, F-155/F-182). Mirrors the router.ts pattern
// from modules/achievements/router.ts.
//
// Public procedures:
//   - list: public digital archive
// Admin procedures:
//   - adminList: all archive entries (filterable by category/year)
//   - adminGetById: single archive entry for edit
//   - create: create new archive entry
//   - update: edit existing archive entry
//   - delete: hard delete an archive entry

import { z } from 'zod';

import { createArchive, deleteArchive, getById, listArchive, updateArchive } from './service.js';
import { ArchiveCreateInput, ArchiveGetByIdInput, ArchiveListInput, ArchiveListOutput, ArchiveOutput, ArchiveUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const archiveRouter = router({
  list: publicProcedure
    .input(ArchiveListInput)
    .output(ArchiveListOutput)
    .query(({ ctx, input }) => listArchive(ctx.db, input)),

  adminList: adminProcedure
    .input(ArchiveListInput)
    .output(ArchiveListOutput)
    .query(({ ctx, input }) => listArchive(ctx.db, input)),

  adminGetById: adminProcedure
    .input(ArchiveGetByIdInput)
    .output(ArchiveOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(ArchiveCreateInput)
    .output(ArchiveOutput)
    .mutation(({ ctx, input }) => createArchive(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(ArchiveUpdateInput)
    .output(ArchiveOutput)
    .mutation(({ ctx, input }) => updateArchive(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(ArchiveGetByIdInput)
    .output(z.object({ success: z.boolean() }))
    .mutation(({ ctx, input }) => deleteArchive(ctx.db, ctx.config, input)),
});

export type ArchiveRouter = typeof archiveRouter;
