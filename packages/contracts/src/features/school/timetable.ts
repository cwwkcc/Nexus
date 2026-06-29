// packages/contracts/src/features/school/timetable.ts
//
// Class timetable contracts (admin panel only — not shown publicly).
//
// Should contain:
//   DayOfWeek       — z.enum(['monday','tuesday','wednesday','thursday','friday'])
//   PeriodSchema    — id, startTime ('08:00'), endTime, subject, teacher?, room?
//   DaySchema       — day (DayOfWeek), periods: Period[]
//   TimetableSchema — grade (string e.g. '12'), stream? (ALStream), days: Day[]
//   TimetableData   — z.infer type
//
// Notes:
//   Admin panel only. Never import this in apps/web.

import { z } from 'zod';

// TODO: implement
