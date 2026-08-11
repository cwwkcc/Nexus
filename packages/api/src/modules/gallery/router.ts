// packages/api/src/modules/gallery/router.ts
//
// list/bySlug are public — F-151's Gallery listing and F-152's album page
// (and the latter's generateStaticParams). Everything else is
// admin-panel-only, matching modules/societies/router.ts's shape.
//
// `delete` requires the 'admin' role via adminOnlyMutation — same
// reasoning as every other hard-delete in this codebase: GalleryAlbum has
// no archived/soft-deleted state to fall back to. `reorder` stays on
// adminMutation (any signed-in Editor or Admin), matching
// modules/staff/router.ts's own reorder — moving an album's position
// isn't the kind of irreversible action the admin-only gate exists for.

import { adminList, bySlug, createAlbum, deleteAlbum, getById, list, reorderAlbums, updateAlbum } from './service.js';
import { GalleryAlbumAdminListInput, GalleryAlbumBySlugInput, GalleryAlbumCreateInput, GalleryAlbumDeleteInput, GalleryAlbumGetByIdInput, GalleryAlbumListInput, GalleryAlbumListOutput, GalleryAlbumOutput, GalleryAlbumReorderInput, GalleryAlbumSummaryOutput, GalleryAlbumUpdateInput } from './validators.js';
import { adminMutation, adminOnlyMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const galleryRouter = router({
  list: publicProcedure
    .input(GalleryAlbumListInput)
    .output(GalleryAlbumListOutput)
    .query(({ ctx, input }) => list(ctx.db, input)),

  bySlug: publicProcedure
    .input(GalleryAlbumBySlugInput)
    .output(GalleryAlbumOutput.nullable())
    .query(({ ctx, input }) => bySlug(ctx.db, input)),

  adminList: adminProcedure
    .input(GalleryAlbumAdminListInput)
    .output(GalleryAlbumListOutput)
    .query(({ ctx, input }) => adminList(ctx.db, input)),

  adminGetById: adminProcedure
    .input(GalleryAlbumGetByIdInput)
    .output(GalleryAlbumOutput)
    .query(({ ctx, input }) => getById(ctx.db, input)),

  create: adminMutation
    .input(GalleryAlbumCreateInput)
    .output(GalleryAlbumOutput)
    .mutation(({ ctx, input }) => createAlbum(ctx.db, ctx.config, input)),

  update: adminMutation
    .input(GalleryAlbumUpdateInput)
    .output(GalleryAlbumOutput)
    .mutation(({ ctx, input }) => updateAlbum(ctx.db, ctx.config, input)),

  reorder: adminMutation
    .input(GalleryAlbumReorderInput)
    .output(GalleryAlbumSummaryOutput.array())
    .mutation(({ ctx, input }) => reorderAlbums(ctx.db, ctx.config, input)),

  delete: adminOnlyMutation
    .input(GalleryAlbumDeleteInput)
    .output(GalleryAlbumDeleteInput)
    .mutation(async ({ ctx, input }) => {
      await deleteAlbum(ctx.db, ctx.config, input);
      return { id: input.id };
    }),
});

export type GalleryRouter = typeof galleryRouter;
