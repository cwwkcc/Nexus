// packages/contracts/src/features/school/academic-stream.ts
//
// A/L academic stream definitions for KCC.
//
// Should contain:
//   ALStream     — z.enum(['combined-maths','bio-science','commerce','arts','technology'])
//   StreamSchema — key (ALStream), name (display label), subjects: string[],
//                  description?, icon?
//   StreamData   — z.infer type
//
// Used by: academics page, admissions requirements, results display
// Note: Combined Maths stream is you. Don't get the subjects wrong.

import { z } from 'zod';

// TODO: implement
