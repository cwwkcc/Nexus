// packages/api/src/modules/media/router.ts
//
// Every procedure here is gated to at least a signed-in staff member
// (adminProcedure/adminMutation) — the Media Library is an admin-panel-only
// feature with no public equivalent, unlike news which also has public
// `list`/`bySlug` procedures. Hard delete (single and bulk) additionally
// requires the 'admin' role via adminOnlyMutation: @nexus/contracts' RBAC
// matrix grants `media: ['read','write']` to Editor but
// `['read','write','publish','admin']` to Admin — Editors can upload and
// edit metadata, but only an Admin can permanently remove an asset.

import { z } from 'zod';

import { bulkDeleteAssets, confirmUpload, deleteAsset, getById, getUsage, listMedia, requestUpload, updateAsset } from './service.js';
import { MediaAssetOutput, MediaBulkDeleteInput, MediaConfirmUploadInput, MediaDeleteInput, MediaGetByIdInput, MediaListInput, MediaListOutput, MediaRequestUploadInput, MediaRequestUploadOutput, MediaUpdateInput, MediaUsageInput, MediaUsageOutput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, router } from '../../trpc.js';

export const mediaRouter = router({
  list: adminProcedure
    .input(MediaListInput)
    .output(MediaListOutput)
    .query(({ ctx, input }) => listMedia(ctx.db, ctx.config, input)),

  getById: adminProcedure
    .input(MediaGetByIdInput)
    .output(MediaAssetOutput)
    .query(({ ctx, input }) => getById(ctx.db, ctx.config, input)),

  getUsage: adminProcedure
    .input(MediaUsageInput)
    .output(MediaUsageOutput)
    .query(({ ctx, input }) => getUsage(ctx.db, ctx.config, input)),

  requestUpload: adminMutation
    .input(MediaRequestUploadInput)
    .output(MediaRequestUploadOutput)
    .mutation(({ ctx, input }) => requestUpload(ctx.config, input)),

  confirmUpload: adminMutation
    .input(MediaConfirmUploadInput)
    .output(MediaAssetOutput)
    .mutation(({ ctx, input }) => confirmUpload(ctx.db, ctx.config, input, ctx.session.userId)),

  update: adminMutation
    .input(MediaUpdateInput)
    .output(MediaAssetOutput)
    .mutation(({ ctx, input }) => updateAsset(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(MediaDeleteInput)
    .output(z.void())
    .mutation(({ ctx, input }) => deleteAsset(ctx.db, ctx.config, input)),

  bulkDelete: adminOnlyMutation
    .input(MediaBulkDeleteInput)
    .output(z.object({ deletedCount: z.number().int().nonnegative() }))
    .mutation(({ ctx, input }) => bulkDeleteAssets(ctx.db, ctx.config, input)),
});
