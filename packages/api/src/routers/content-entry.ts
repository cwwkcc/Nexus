// packages/api/src/routers/content-entry.ts
//
// The canonical CMS router: reads and writes ContentEntry / ContentEntryVersion.
//
// Read paths are defensive on purpose — a DB hiccup degrades to `{}` instead of
// throwing, so a public page or the admin content index doesn't 500 (see
// README's "don't let a failed query crash the whole appRouter"). The write
// path does NOT swallow errors: silently eating a failed save would look like
// a successful publish to the editor, which is worse than a visible error.
//
// NOTE: ContentEntrySchema (@nexus/contracts) types `status` against the
// 4-state PublishStatusEnum (draft/in-review/published/archived), but the
// Prisma ContentStatus enum backing this table only has 3 states — no
// in-review. This router validates against the 3 states that actually exist
// in the schema. Reconciling that gap (add in-review to the DB, or narrow the
// contract) is a separate decision, not made here.

import { LocaleEnum } from '@nexus/contracts';
import type { Prisma } from '@nexus/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { adminMutation, adminProcedure, publicProcedure, router } from '../trpc.js';

const ScopeLocaleInput = z.object({
  scope: z.string().min(1),
  locale: LocaleEnum,
});

// Matches the Prisma `ContentStatus` enum (draft/published/archived) — see
// the file-level note above re: the 4-state contract vs. 3-state DB enum.
const ContentStatusInput = z.enum(['draft', 'published', 'archived']);

const UpdateInput = z.object({
  scope: z.string().min(1),
  sectionKey: z.string().min(1),
  contentType: z.string().min(1),
  locale: LocaleEnum,
  data: z.unknown(),
  status: ContentStatusInput,
});

export const contentEntryRouter = router({
  /**
   * Public read. Published entries only, keyed by sectionKey straight to the
   * raw data payload — this is what apps/web's footer/nav/page content
   * readers cast directly to their block data types (e.g. FooterContentData).
   */
  getByScope: publicProcedure.input(ScopeLocaleInput).query(async ({ ctx, input }) => {
    try {
      const entries = await ctx.db.contentEntry.findMany({
        where: { scope: input.scope, locale: input.locale, status: 'published' },
      });

      return entries.reduce<Record<string, unknown>>((acc, entry) => {
        acc[entry.sectionKey] = entry.data;
        return acc;
      }, {});
    } catch (err) {
      console.error('[contentEntry.getByScope] falling back to {} —', err);
      return {};
    }
  }),

  /**
   * Admin read. Every status, keyed by sectionKey to { status, version, data }
   * so the page editor can show draft/published state and version number.
   * Must degrade to {} on DB failure — asserted directly by
   * __tests__/auth.test.ts ("content entry reads degrade gracefully when the
   * database is unavailable").
   */
  adminGetByScope: adminProcedure.input(ScopeLocaleInput).query(async ({ ctx, input }) => {
    try {
      const entries = await ctx.db.contentEntry.findMany({
        where: { scope: input.scope, locale: input.locale },
      });

      return entries.reduce<Record<string, { status: string; version: number; data: unknown }>>((acc, entry) => {
        acc[entry.sectionKey] = {
          status: entry.status,
          version: entry.version,
          data: entry.data,
        };
        return acc;
      }, {});
    } catch (err) {
      console.error('[contentEntry.adminGetByScope] falling back to {} —', err);
      return {};
    }
  }),

  /**
   * Admin write. Upserts the ContentEntry row (unique on scope+sectionKey+
   * locale) and snapshots the new data into ContentEntryVersion in the same
   * transaction. Version is a simple increment — no optimistic-concurrency
   * check against a client-supplied "expected version" yet, so two editors
   * saving the same section back-to-back will silently last-write-wins rather
   * than conflict. Worth revisiting once there's more than one admin editing.
   */
  update: adminMutation.input(UpdateInput).mutation(async ({ ctx, input }) => {
    const { scope, sectionKey, contentType, locale, data, status } = input;
    const jsonData = data as Prisma.InputJsonValue;

    try {
      return await ctx.db.$transaction(async (tx) => {
        const existing = await tx.contentEntry.findUnique({
          where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
        });

        const version = (existing?.version ?? 0) + 1;

        const entry = await tx.contentEntry.upsert({
          where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
          create: { scope, sectionKey, locale, contentType, status, data: jsonData, version },
          update: { contentType, status, data: jsonData, version },
        });

        await tx.contentEntryVersion.create({
          data: { contentEntryId: entry.id, version, data: jsonData },
        });

        return entry;
      });
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to save content entry.',
        cause: err,
      });
    }
  }),
});

export type ContentEntryRouter = typeof contentEntryRouter;
