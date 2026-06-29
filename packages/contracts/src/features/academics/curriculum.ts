// packages/contracts/src/features/academics/curriculum.ts
//
// High-level curriculum overview contracts.
//
// Should contain:
//   CurriculumLevel   — z.enum(['OL', 'AL'])
//   SyllabusSchema    — level (CurriculumLevel), subject, board ('NIE'), year (string)
//   CurriculumSchema  — level, streams?: ALStream[], subjects: Syllabus[]
//   CurriculumData    — z.infer type
//
// Notes:
//   High-level only. Detailed syllabus documents are managed as Downloads blocks.

import { z } from 'zod';

// TODO: implement
