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

// TODO: implement
