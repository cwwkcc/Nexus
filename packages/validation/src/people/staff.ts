import { z } from 'zod';

export const StaffRoleSchema = z.enum([
  'principal',
  'deputy-principal',
  'head-of-department',
  'teacher',
  'counsellor',
  'administrative',
]);

export const StaffMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  title: z.string().min(1),
  role: StaffRoleSchema,
  department: z.string().optional(),
  tenure: z.string().optional(),
  quote: z.string().optional(),
  imageSrc: z.string().url().optional(),
  imageAlt: z.string().optional(),
  portfolio: z.string().optional(),
  href: z.string().optional(),
  order: z.number().int().default(0),
});

export const PrincipalMessageSchema = z.object({
  staffMember: StaffMemberSchema,
  message: z.string().min(1),
  quote: z.string().optional(),
  fullMessageHref: z.string(),
});

// --- Inferred types ---
export type StaffRole = z.infer<typeof StaffRoleSchema>;
export type StaffMember = z.infer<typeof StaffMemberSchema>;
export type PrincipalMessage = z.infer<typeof PrincipalMessageSchema>;
