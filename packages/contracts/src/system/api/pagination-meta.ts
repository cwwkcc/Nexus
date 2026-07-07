// packages/contracts/src/system/api/pagination-meta.ts
//
// The response-side pagination metadata (total items, total pages, current page).

import { z } from 'zod';

export const PaginationMetaSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
});

export type PaginationMetaData = z.infer<typeof PaginationMetaSchema>;
