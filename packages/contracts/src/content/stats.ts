// packages/contracts/src/content/stats.ts
//
// Statistics display contract.
//
// Should contain:
//   StatSchema       — id, target, label, suffix?, prefix?, description?,
//                       tooltip?, disableCountUp? (bool)
//   StatCardSchema   — value, suffix?, label, trend?, trendValue?, trendLabel?
//   StatData         — z.infer type
//   StatCardData     — z.infer type
//
// Notes:
//   Used for homepage stats section and other metric displays.

import { z } from 'zod';

export const TrendDirection = z.enum(['up', 'down', 'neutral']);

export const StatCardVariant = z.enum(['single', 'with-trend']);

export const StatSchema = z.object({
  variant: StatCardVariant.optional(),
  value: z.number(),
  suffix: z.string().optional(),
  label: z.string(),
  trend: TrendDirection.optional(),
  trendValue: z.string().optional(),
  trendLabel: z.string().optional(),
});

export type StatData = z.infer<typeof StatSchema>;
export type TrendDirectionType = z.infer<typeof TrendDirection>;
export type StatCardVariantType = z.infer<typeof StatCardVariant>;

// Runtime enum values for comparisons
export const TrendDirectionValues = TrendDirection.enum;
export const StatCardVariantValues = StatCardVariant.enum;
