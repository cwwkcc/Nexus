// packages/contracts/src/school/timetable.ts
//
// Timetable contracts.
//
// Should contain:
//   TimetableEntrySchema — period, time, monday-saturday?
//   TimetableEntryData  — z.infer type

import { z } from 'zod';

export const TimetableEntrySchema = z.object({
  period: z.string(),
  time: z.string(),
  monday: z.string().optional(),
  tuesday: z.string().optional(),
  wednesday: z.string().optional(),
  thursday: z.string().optional(),
  friday: z.string().optional(),
  saturday: z.string().optional(),
});

export type TimetableEntryData = z.infer<typeof TimetableEntrySchema>;
