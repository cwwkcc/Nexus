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
import { ALStreamSchema } from './al-stream.ts';

export const CurriculumLevelEnum = z.enum(['OL', 'AL']);

export const SyllabusSchema = z.object({
  level: CurriculumLevelEnum,
  subject: z.string().min(1),
  board: z.string().default('NIE'),
  year: z.string().min(1),
});

export const CurriculumSchema = z.object({
  level: CurriculumLevelEnum,
  streams: z.array(ALStreamSchema).optional(),
  subjects: z.array(SyllabusSchema),
});

export type CurriculumLevelEnumData = z.infer<typeof CurriculumLevelEnum>;
export type SyllabusData = z.infer<typeof SyllabusSchema>;
export type CurriculumData = z.infer<typeof CurriculumSchema>;
