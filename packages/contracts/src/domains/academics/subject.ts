// packages/contracts/src/features/academics/subject.ts
//
// Subject contracts.
//
// Should contain:
//   SubjectLevel  — z.enum(['OL', 'AL', 'both'])
//   SubjectSchema — id, name, code?, level (SubjectLevel),
//                   streams?: ALStream[], department? (DepartmentKey), description?
//   SubjectData   — z.infer type

import { z } from 'zod';
import { DepartmentKeyEnum } from './department';
import { StreamSchema } from './al-stream';

export const SubjectLevelEnum = z.enum(['OL', 'AL', 'both']);

export const SubjectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  code: z.string().optional(),
  level: SubjectLevelEnum,
  streams: z.array(StreamSchema).optional(),
  department: DepartmentKeyEnum.optional(),
  description: z.string().optional(),
});

export type SubjectLevel = z.infer<typeof SubjectLevelEnum>;
export type SubjectData = z.infer<typeof SubjectSchema>;
export type Subject = SubjectData;
