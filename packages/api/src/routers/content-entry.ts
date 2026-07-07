// packages/api/src/routers/content-entry.ts
//
// F-175 (revised). tRPC router for the ContentEntry model.
// Replaces the old pageContentRouter which referenced the now-removed
// `pageContent` Prisma model.
//
// Scope convention:
//   'page:about'        → About page sections
//   'page:home'         → Homepage sections
//   'global:navigation' → Site navigation
//   'global:footer'     → Footer
//
// Public procedures return only `status: 'published'` entries.
// Admin procedures return all statuses and are gated by adminSecret.

import {
  LocaleSchema,
  getAllSectionSchemas,
  getGlobalSectionSchemas,
} from '@nexus/contracts';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  publicProcedure,
  adminProcedure,
  adminMutation,
  router,
} from '../trpc.js';

// ── Input schemas ─────────────────────────────────────────────────────────────

const ScopedLocaleInput = z.object({
  scope: z.string().min(1),
  locale: LocaleSchema,
});

const SectionLocaleInput = z.object({
  scope: z.string().min(1),
  sectionKey: z.string().min(1),
  locale: LocaleSchema,
});

const StatusSchema = z
  .enum(['draft', 'published', 'archived'])
  .default('draft');

// ── Router ────────────────────────────────────────────────────────────────────

export const contentEntryRouter = router({
  /**
   * PUBLIC — returns all *published* sections for a scope + locale.
   *
   * Falls back to English for any section that has no translation in the
   * requested locale. A missing Tamil paragraph is better shown in English
   * than left blank.
   *
   * Used by: apps/web typed fetchers (getAboutPageContent, etc.)
   */
  getByScope: publicProcedure
    .input(ScopedLocaleInput)
    .query(async ({ ctx, input }) => {
      const { scope, locale } = input;

      try {
        const [localized, fallback] = await Promise.all([
          ctx.db.contentEntry.findMany({
            where: { scope, locale, status: 'published' },
          }),
          locale === 'en'
            ? Promise.resolve([])
            : ctx.db.contentEntry.findMany({
                where: { scope, locale: 'en', status: 'published' },
              }),
        ]);

        // English rows provide the baseline; locale rows override them.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bySectionKey = new Map<string, any>(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fallback.map((row: any): [string, any] => [row.sectionKey, row]),
        );
        for (const row of localized) bySectionKey.set(row.sectionKey, row);

        const sections: Record<string, unknown> = {};
        for (const row of bySectionKey.values()) {
          sections[row.sectionKey] = row.data;
        }
        return sections;
      } catch {
        return {};
      }
    }),

  /**
   * ADMIN — returns ALL sections for a scope + locale, regardless of status.
   *
   * Returns { data, status, version, updatedAt } per sectionKey so the admin
   * editor can show draft/published badges and version numbers.
   *
   * Used by: apps/admin content editor pages.
   */
  adminGetByScope: adminProcedure
    .input(ScopedLocaleInput)
    .query(async ({ ctx, input }) => {
      const { scope, locale } = input;

      try {
        const rows = await ctx.db.contentEntry.findMany({
          where: { scope, locale },
        });

        type AdminEntry = {
          data: unknown;
          status: string;
          version: number;
          updatedAt: Date;
          updatedBy: string | null;
        };
        const sections: Record<string, AdminEntry> = {};
        for (const row of rows) {
          sections[row.sectionKey] = {
            data: row.data,
            status: row.status,
            version: row.version,
            updatedAt: row.updatedAt,
            updatedBy: row.updatedBy,
          };
        }
        return sections;
      } catch {
        return {};
      }
    }),

  /**
   * ADMIN — returns version history for one section (newest first, max 30).
   *
   * Used by: admin version history drawer (future).
   */
  getVersionHistory: adminProcedure
    .input(SectionLocaleInput)
    .query(async ({ ctx, input }) => {
      const { scope, sectionKey, locale } = input;
      const entry = await ctx.db.contentEntry.findUnique({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
        include: {
          versions: {
            orderBy: { version: 'desc' },
            take: 30,
          },
        },
      });
      return entry?.versions ?? [];
    }),

  /**
   * ADMIN — upsert one section.
   *
   * Snapshots the current version into ContentEntryVersion before overwriting,
   * so every save is recoverable. Validates the incoming `data` against the
   * registered schema for the sectionKey.
   *
   * Defaults to `status: 'draft'`. To publish immediately, pass `status: 'published'`.
   */
  update: adminMutation
    .input(
      z.object({
        scope: z.string().min(1),
        sectionKey: z.string().min(1),
        contentType: z.string().min(1),
        locale: LocaleSchema,
        data: z.unknown(),
        status: StatusSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { scope, sectionKey, contentType, locale, data, status } = input;

      // Validate against the registered section schema.
      // Merges page schemas and global schemas into one lookup.
      const schemas = {
        ...getAllSectionSchemas(),
        ...getGlobalSectionSchemas(),
      };
      const schema = schemas[sectionKey];
      if (!schema) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            `No schema registered for sectionKey "${sectionKey}". ` +
            `Register it in packages/contracts/src/page-registry/ or global-registry/ first.`,
        });
      }

      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `contracts failed for "${sectionKey}": ${parsed.error.message}`,
        });
      }

      // Snapshot the current version before overwriting.
      const existing = await ctx.db.contentEntry.findUnique({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
      });

      if (existing) {
        await ctx.db.contentEntryVersion.create({
          data: {
            contentEntryId: existing.id,
            version: existing.version,
            data: existing.data as object,
            changedBy: ctx.adminSecret ?? 'unknown',
          },
        });
      }

      return ctx.db.contentEntry.upsert({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
        create: {
          scope,
          sectionKey,
          contentType,
          locale,
          data: parsed.data as object,
          status,
          version: 1,
          updatedBy: ctx.adminSecret ?? null,
        },
        update: {
          data: parsed.data as object,
          status,
          version: { increment: 1 },
          updatedBy: ctx.adminSecret ?? null,
        },
      });
    }),

  /**
   * ADMIN — change the publish status of an existing entry without touching
   * the content. Used for the "Publish" / "Unpublish" / "Archive" actions.
   */
  setStatus: adminMutation
    .input(
      z.object({
        scope: z.string().min(1),
        sectionKey: z.string().min(1),
        locale: LocaleSchema,
        status: z.enum(['draft', 'published', 'archived']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { scope, sectionKey, locale, status } = input;
      const existing = await ctx.db.contentEntry.findUnique({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
      });
      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No entry found for ${scope}/${sectionKey}/${locale}.`,
        });
      }
      return ctx.db.contentEntry.update({
        where: { scope_sectionKey_locale: { scope, sectionKey, locale } },
        data: { status, updatedBy: ctx.adminSecret ?? null },
      });
    }),
});
