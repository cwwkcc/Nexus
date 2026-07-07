// packages/contracts/src/content/navigation.ts
//
// Navigation structure contracts.
//
// Should contain:
//   TocSectionSchema      — id, label
//   TocSectionData        — z.infer type
//   FilterOptionSchema    — value, label, count?
//   FilterOptionData      — z.infer type

import { z } from 'zod';

export const TocSectionSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type TocSectionData = z.infer<typeof TocSectionSchema>;

export const FilterOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
  count: z.number().optional(),
});

export type FilterOptionData = z.infer<typeof FilterOptionSchema>;
