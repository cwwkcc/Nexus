// packages/api/src/modules/content/router.ts
//
// The canonical CMS router: reads and writes ContentEntry / ContentEntryVersion.
// Validates input (validators.ts) and delegates all Prisma access to
// service.ts — this file should stay thin. See README's "adding a new
// module" note.
//
// NOTE: ContentEntrySchema (@nexus/contracts) types `status` against the
// 4-state PublishStatusEnum (draft/in-review/published/archived), but the
// Prisma ContentStatus enum backing this table only has 3 states — no
// in-review. validators.ts's ContentStatusInput matches the 3 states that
// actually exist in the DB. Reconciling that gap (add in-review to the DB,
// or narrow the contract) is a separate decision, not made here.

import * as contentService from './service.js';
import { AdminGetByScopeOutput, ContentEntryOutput, GetByScopeOutput, ScopeLocaleInput, SetStatusInput, UpdateInput } from './validators.js';
import { adminMutation, adminProcedure, publicProcedure, router } from '../../trpc.js';

export const contentEntryRouter = router({
  /**
   * Public read. Falls back to English per-section when the requested
   * locale has no published entry yet (F-088) — see service.ts.
   */
  getByScope: publicProcedure
    .input(ScopeLocaleInput)
    .output(GetByScopeOutput)
    .query(({ ctx, input }) => contentService.getByScope(ctx.db, input)),

  /** Admin read — every status, keyed by sectionKey. */
  adminGetByScope: adminProcedure
    .input(ScopeLocaleInput)
    .output(AdminGetByScopeOutput)
    .query(({ ctx, input }) => contentService.adminGetByScope(ctx.db, input)),

  /** Admin write — upserts + version snapshot + revalidation. */
  update: adminMutation
    .input(UpdateInput)
    .output(ContentEntryOutput)
    .mutation(({ ctx, input }) => contentService.updateEntry(ctx.db, ctx.config, input)),

  /** Admin write — status transition only (draft/published/archived). */
  setStatus: adminMutation
    .input(SetStatusInput)
    .output(ContentEntryOutput)
    .mutation(({ ctx, input }) => contentService.setEntryStatus(ctx.db, ctx.config, input)),
});

export type ContentEntryRouter = typeof contentEntryRouter;
