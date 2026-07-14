// packages/contracts/src/domains/people/staff-member.ts

// 'head-prefect' is a real StaffRole value even though prefects are students,

import { z } from 'zod';

import { AvatarSchema } from '../../primitives/media/index.ts';
import { DepartmentKeyEnum } from '../academics/department.ts';

export const StaffRoleEnum = z.enum(['principal', 'deputy-principal', 'assistant-principal', 'head-prefect', 'teacher', 'support']);

export const StaffSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: StaffRoleEnum,
  designation: z.string().min(1),
  department: DepartmentKeyEnum.optional(),
  portfolio: z.string().optional(),
  tenure: z.string().optional(),
  quote: z.string().optional(),
  bio: z.string().optional(),
  portrait: AvatarSchema.optional(),
  contactEmail: z.string().email().optional(),
  joinedYear: z.string().optional(),
});

export const StaffCardSchema = StaffSchema.omit({
  bio: true,
  joinedYear: true,
});

export type StaffRoleEnumData = z.infer<typeof StaffRoleEnum>;
export type StaffData = z.infer<typeof StaffSchema>;
export type StaffCardData = z.infer<typeof StaffCardSchema>;
