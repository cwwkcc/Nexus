// packages/api/src/modules/alumni/validators.ts
//
// Input/output schemas for the alumni router (Task 7.18, F-154/F-180).
// Mirrors the validators.ts pattern from modules/news/validators.ts.

import { z } from 'zod';

import { AlumniInputSchema, AlumniStatusEnum, AlumniUpdateSchema } from '@nexus/contracts';

// ─── Input schemas ────────────────────────────────────────────────────────

export const AlumniListInput = z.object({
  status: AlumniStatusEnum.optional(),
  graduationYear: z.string().optional(),
  profession: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

export const AlumniGetByIdInput = z.object({
  id: z.string().min(1),
});

export const AlumniCreateInput = AlumniInputSchema;

export const AlumniUpdateInput = AlumniUpdateSchema;

export const AlumniStatusUpdateInput = z.object({
  id: z.string().min(1),
  status: AlumniStatusEnum,
  rejectionReason: z.string().optional(),
});

export const AlumniBulkStatusUpdateInput = z.object({
  ids: z.array(z.string().min(1)).min(1),
  status: AlumniStatusEnum,
  rejectionReason: z.string().optional(),
});

// ─── Output schemas ───────────────────────────────────────────────────────

export const AlumniOutput = z.object({
  id: z.string(),
  name: z.string(),
  graduationYear: z.string(),
  stream: z.string().nullable(),
  currentRole: z.string().nullable(),
  currentOrg: z.string().nullable(),
  portrait: z.object({ src: z.string(), alt: z.string() }).nullable(),
  quote: z.string().nullable(),
  isFeatureworthy: z.boolean(),
  status: AlumniStatusEnum,
  rejectionReason: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AlumniListOutput = z.object({
  items: AlumniOutput.array(),
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

export type AlumniList = z.infer<typeof AlumniListInput>;
export type AlumniGetById = z.infer<typeof AlumniGetByIdInput>;
export type AlumniCreate = z.infer<typeof AlumniCreateInput>;
export type AlumniUpdate = z.infer<typeof AlumniUpdateInput>;
export type AlumniStatusUpdate = z.infer<typeof AlumniStatusUpdateInput>;
export type AlumniBulkStatusUpdate = z.infer<typeof AlumniBulkStatusUpdateInput>;
