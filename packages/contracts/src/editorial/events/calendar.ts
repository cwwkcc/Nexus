// packages/contracts/src/editorial/events/calendar.ts
//
// Academic calendar and recurring event contracts.
//
// Notes:
//   Stored in ContentEntry with scope 'editorial:calendar'.
//   The events page and home page upcoming strip both read from this.

import { z } from 'zod';

import { EventCategorySchema } from './category.ts';

export const CalendarEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  category: EventCategorySchema,
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  notes: z.string().optional(),
});

export const AcademicCalendarSchema = z.object({
  academicYear: z.string().min(1),
  entries: z.array(CalendarEntrySchema),
});

export type CalendarEntryData = z.infer<typeof CalendarEntrySchema>;
export type AcademicCalendarData = z.infer<typeof AcademicCalendarSchema>;
export type Calendar = AcademicCalendarData;
