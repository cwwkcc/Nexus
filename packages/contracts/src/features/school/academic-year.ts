// packages/contracts/src/features/school/academic-year.ts
//
// Academic year and term contracts.
//
// Should contain:
//   TermName           — z.enum(['Term 1', 'Term 2', 'Term 3'])
//   TermSchema         — name (TermName), startDate (ISO), endDate (ISO)
//   AcademicYearSchema — year ('2024/2025'), startDate, endDate, terms: Term[]
//   AcademicYear       — z.infer type
//   Term               — z.infer type
//
// Notes:
//   Sri Lankan school year: January–November, three terms.
//   Used by editorial/events/calendar.ts and features/academics/timetable.ts.

import { z } from 'zod';

// TODO: implement
