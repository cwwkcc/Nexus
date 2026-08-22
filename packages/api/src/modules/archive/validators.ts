// packages/api/src/modules/archive/validators.ts
//
// Input/output schemas for the archive router (Task 7.20, F-155/F-182).
// Mirrors the validators.ts pattern from modules/achievements/validators.ts.

import { z } from 'zod';

import { ArchiveCategory, ArchiveInputSchema, ArchiveOutputSchema, ArchiveUpdateSchema } from '@nexus/contracts';

// ─── Input schemas ────────────────────────────────────────────────────────

export const ArchiveListInput = z.object({
  category: ArchiveCategory.optional(),
  year: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

export const ArchiveGetByIdInput = z.object({
  id: z.string().min(1),
});

export const ArchiveCreateInput = ArchiveInputSchema;

export const ArchiveUpdateInput = ArchiveUpdateSchema;

// ─── Output schemas ───────────────────────────────────────────────────────

export const ArchiveOutput = ArchiveOutputSchema;

export const ArchiveListOutput = z.object({
  items: ArchiveOutputSchema.array(),
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

export type ArchiveList = z.infer<typeof ArchiveListInput>;
export type ArchiveGetById = z.infer<typeof ArchiveGetByIdInput>;
export type ArchiveCreate = z.infer<typeof ArchiveCreateInput>;
export type ArchiveUpdate = z.infer<typeof ArchiveUpdateInput>;
