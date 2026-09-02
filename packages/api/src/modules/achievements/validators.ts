// packages/api/src/modules/achievements/validators.ts
//
// Input/output schemas for the achievements router (Task 7.19, F-156/F-181).
// Mirrors the validators.ts pattern from modules/alumni/validators.ts.

import { z } from 'zod';

import { AchievementCategory, AchievementInputSchema, AchievementOutputSchema, AchievementUpdateSchema } from '@nexus/contracts';

// ─── Input schemas ────────────────────────────────────────────────────────

export const AchievementListInput = z.object({
  category: AchievementCategory.optional(),
  year: z.string().optional(),
  /** The admin search box and public page both send this — was captured
   * from the URL and displayed in the search input, but never actually
   * reached this schema or the query, so typing a search term silently
   * did nothing. */
  query: z.string().trim().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

export const AchievementGetByIdInput = z.object({
  id: z.string().min(1),
});

export const AchievementCreateInput = AchievementInputSchema;

export const AchievementUpdateInput = AchievementUpdateSchema;

// ─── Output schemas ───────────────────────────────────────────────────────

export const AchievementOutput = AchievementOutputSchema;

export const AchievementListOutput = z.object({
  items: AchievementOutputSchema.array(),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

// ─── Types ─────────────────────────────────────────────────────────────────

export type AchievementList = z.infer<typeof AchievementListInput>;
export type AchievementGetById = z.infer<typeof AchievementGetByIdInput>;
export type AchievementCreate = z.infer<typeof AchievementCreateInput>;
export type AchievementUpdate = z.infer<typeof AchievementUpdateInput>;
