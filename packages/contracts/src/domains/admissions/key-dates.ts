// packages/contracts/src/features/admissions/key-dates.ts
//
// Admissions key dates.
//
// Should contain:
//   AdmissionsDateCategory   — z.enum(['application','exam','results','enrollment','other'])
//   AdmissionsDateSchema     — id, title, date (ISO), category, description?, isPast?
//   AdmissionsCalendarSchema — academicYear, dates: AdmissionsDate[]
//   AdmissionsCalendarData   — z.infer type
//
// Notes:
//   isPast is computed by the web app at render time — don't store it in the DB.

import { z } from 'zod';

export const AdmissionsDateCategoryEnum = z.enum([
  'application',
  'exam',
  'results',
  'enrollment',
  'other',
]);

export const AdmissionsDateSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  category: AdmissionsDateCategoryEnum,
  description: z.string().optional(),
});

export const AdmissionsCalendarSchema = z.object({
  academicYear: z.string().min(1),
  dates: z.array(AdmissionsDateSchema),
});

export type AdmissionsDateCategory = z.infer<typeof AdmissionsDateCategoryEnum>;
export type AdmissionsDateData = z.infer<typeof AdmissionsDateSchema>;
export type AdmissionsCalendarData = z.infer<typeof AdmissionsCalendarSchema>;
export type KeyDates = AdmissionsCalendarData;
