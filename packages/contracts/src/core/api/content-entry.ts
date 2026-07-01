// packages/contracts/src/core/api/content-entry.ts

import { z } from 'zod';

export const CreateContentEntryInput = z.object({
  sectionKey: z.string(),
  scope: z.string(),
  locale: z.string(),
  contentType: z.string(),
  data: z.unknown(),
});

export const UpdateContentEntryInput = z.object({
  id: z.string(),
  sectionKey: z.string().optional(),
  scope: z.string().optional(),
  locale: z.string().optional(),
  contentType: z.string().optional(),
  data: z.unknown().optional(),
});

export const GetByScopeInput = z.object({
  scope: z.string(),
  locale: z.string(),
});

export const GetByKeyInput = z.object({
  sectionKey: z.string(),
  locale: z.string(),
});

export const AdminGetByScopeInput = z.object({
  scope: z.string(),
});

export const ContentEntryOutput = z.object({
  id: z.string(),
  sectionKey: z.string(),
  scope: z.string(),
  locale: z.string(),
  contentType: z.string(),
  data: z.unknown(),
  updatedAt: z.string(),
});

export const PaginationMeta = z.object({
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const ContentEntryListOutput = z.object({
  items: z.array(ContentEntryOutput),
  meta: PaginationMeta,
});
