// packages/contracts/src/core/cms/content-entry.ts
//
// Runtime shape of a ContentEntry row as it exists in the database.
// Defined here so non-database packages can reference the shape
// without importing @nexus/db.
//
// Should contain:
//   ContentEntrySchema         — id, sectionKey, scope, locale, contentType,
//                                data (unknown), createdAt, updatedAt, publishedAt?
//   ContentEntryVersionSchema  — id, contentEntryId, data, locale, createdAt, createdBy?
//   ContentEntry               — z.infer type
//   ContentEntryVersion        — z.infer type
//
// Notes:
//   Keep this in sync with packages/database/prisma/schema.prisma.
//   When the Prisma schema changes, update this file too.

import { z } from 'zod';

export const ContentEntrySchema = z.object({
  id: z.string(),
  sectionKey: z.string(),
  scope: z.string(),
  locale: z.string(),
  contentType: z.string(),
  data: z.unknown(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
});

export const ContentEntryVersionSchema = z.object({
  id: z.string(),
  contentEntryId: z.string(),
  data: z.unknown(),
  locale: z.string(),
  createdAt: z.string(),
  createdBy: z.string().optional(),
});

export type ContentEntry = z.infer<typeof ContentEntrySchema>;
export type ContentEntryVersion = z.infer<typeof ContentEntryVersionSchema>;
