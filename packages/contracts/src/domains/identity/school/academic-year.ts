// packages/contracts/src/domains/identity/school/academic-year.ts
//
// Academic year contract.
//
// Should contain:
//   AcademicYearSchema — year ('2024/2025'), startDate, endDate, terms: Term[]
//   AcademicYearData   — z.infer type
//
// Notes:
//   Sri Lankan school year: January–November, three terms.
//   Used by editorial/events/calendar.ts and features/academics/timetable.ts.

import { z } from 'zod';
import { TermSchema } from '../term.js';

export const AcademicYearSchema = z.object({
  year: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  terms: z.array(TermSchema),
});

export type AcademicYearData = z.infer<typeof AcademicYearSchema>;
