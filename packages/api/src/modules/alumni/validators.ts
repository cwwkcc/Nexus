// packages/api/src/modules/alumni/validators.ts
//
// Input/output schemas for the alumni router (Task 7.18, F-154/F-180).
// Mirrors the validators.ts pattern from modules/news/validators.ts.

import { z } from 'zod';

import { AlumniInputSchema, AlumniStatusEnum, AlumniUpdateSchema } from '@nexus/contracts';

// ─── Input schemas ────────────────────────────────────────────────────────

export const AlumniListInput = z.object({
  /** Free-text search across name/currentRole/currentOrg — powers the admin
   * list's "Search" box (`apps/admin/src/app/alumni/AlumniListClient.tsx`).
   * Same `.trim().max(200)` shape as News's own `query` field (see
   * modules/news/validators.ts) for consistency across admin list search
   * boxes. Distinct from `profession` below, which is a narrower filter
   * over currentRole/currentOrg only — a caller can combine both. */
  query: z.string().trim().max(200).optional(),
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

/**
 * F-180's public entry path — a visitor submitting their own profile via
 * `SubmitProfileBlock` on the public Alumni Directory page. Deliberately a
 * narrow `.pick()` off `AlumniInputSchema` rather than a hand-written
 * duplicate: it reuses the exact same field validators (so a submission is
 * held to the same bar as an admin-entered one) while structurally
 * excluding everything a public caller must never set —
 * `status`/`isFeatureworthy`/`rejectionReason` (moderation-only fields) and
 * `portrait` (Media Library uploads are admin-only, see
 * modules/media/router.ts). Even if a malicious client sent those fields
 * anyway, Zod silently strips unrecognized keys from a plain `z.object()`
 * by default, so they'd never reach `submitProfile` — see that function's
 * own header note in service.ts for why it also forces them server-side
 * rather than relying on this alone.
 */
export const AlumniSubmitInput = AlumniInputSchema.pick({
  name: true,
  graduationYear: true,
  stream: true,
  currentRole: true,
  currentOrg: true,
  quote: true,
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

/** Deliberately minimal — an ack, not the created record. A public
 * submission endpoint has no reason to hand the internal id (or anything
 * else) back to an anonymous caller, and there's nothing meaningful for
 * the submitter to do with the record until an admin approves it. */
export const AlumniSubmitOutput = z.object({
  success: z.boolean(),
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
export type AlumniSubmit = z.infer<typeof AlumniSubmitInput>;
