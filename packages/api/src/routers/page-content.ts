// packages/api/src/routers/page-content.ts
//
// F-175. Sibling to the not-yet-built pageConfigRouter (F-055): PageConfig
// will decide whether a section is shown and in what order, this router
// decides what the section says.

import {
  ABOUT_SECTION_SCHEMAS,
  LocaleSchema,
  PageContentUpdateInputSchema,
  type AboutSectionKey,
} from '@nexus/validation';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure, adminProcedure, router } from '../trpc.js';

const SECTION_SCHEMAS: Record<
  string,
  (typeof ABOUT_SECTION_SCHEMAS)[AboutSectionKey]
> = ABOUT_SECTION_SCHEMAS;

export const pageContentRouter = router({
  /**
   * Returns every PageContent section for a page, in the requested locale.
   * Any section missing a translation for that locale falls back to English
   * rather than rendering blank — a missing Tamil paragraph is better shown
   * in English than not shown at all.
   */
  getByPage: publicProcedure
    .input(z.object({ page: z.string().min(1), locale: LocaleSchema }))
    .query(async ({ ctx, input }) => {
      const { page, locale } = input;

      const [localized, fallback] = await Promise.all([
        ctx.db.pageContent.findMany({ where: { page, locale } }),
        locale === 'en'
          ? Promise.resolve([])
          : ctx.db.pageContent.findMany({ where: { page, locale: 'en' } }),
      ]);

      const bySectionKey = new Map(
        fallback.map((row) => [row.sectionKey, row]),
      );
      for (const row of localized) bySectionKey.set(row.sectionKey, row);

      const sections: Record<string, unknown> = {};
      for (const row of bySectionKey.values()) {
        sections[row.sectionKey] = row.data;
      }
      return sections;
    }),

  /**
   * Upserts one section. Snapshots the previous value into
   * PageContentVersion before overwriting, mirroring F-152's pattern for
   * News. Gated by adminProcedure — see trpc.ts for the temporary-auth
   * caveat.
   */
  update: adminProcedure
    .input(PageContentUpdateInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { page, sectionKey, locale, data } = input;

      const schema = SECTION_SCHEMAS[sectionKey];
      if (!schema) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `No validation schema registered for sectionKey "${sectionKey}". Add it to ABOUT_SECTION_SCHEMAS in @nexus/validation first.`,
        });
      }

      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Invalid data for section "${sectionKey}": ${parsed.error.message}`,
        });
      }

      const existing = await ctx.db.pageContent.findUnique({
        where: { page_sectionKey_locale: { page, sectionKey, locale } },
      });

      if (existing) {
        await ctx.db.pageContentVersion.create({
          data: {
            page,
            sectionKey,
            locale,
            version: existing.version,
            data: existing.data as object,
            updatedAt: existing.updatedAt,
            updatedBy: existing.updatedBy,
          },
        });
      }

      return ctx.db.pageContent.upsert({
        where: { page_sectionKey_locale: { page, sectionKey, locale } },
        create: {
          page,
          sectionKey,
          locale,
          data: parsed.data,
          version: 1,
          // TODO(Task 6.3): set from the authenticated admin session once
          // Auth.js / Google Workspace OAuth replaces the adminProcedure
          // shared-secret stub.
          updatedBy: null,
        },
        update: {
          data: parsed.data,
          version: { increment: 1 },
          updatedBy: null,
        },
      });
    }),
});
