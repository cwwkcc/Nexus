// packages/contracts/src/features/people/alumni.ts

// Alumni profile contracts.

import { z } from 'zod';

import { ALStreamEnum } from '../academics/al-stream.ts';

export const AlumniSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  graduationYear: z.string().min(1),
  stream: ALStreamEnum.optional(),
  currentRole: z.string().optional(),
  currentOrg: z.string().optional(),
  image: z.string().optional(),
  quote: z.string().optional(),
  isFeatureworthy: z.boolean().optional(),
});

export const AlumniCardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  graduationYear: z.string().min(1),
  currentRole: z.string().optional(),
  image: z.string().optional(),
});

export type AlumniData = z.infer<typeof AlumniSchema>;
export type AlumniCardData = z.infer<typeof AlumniCardSchema>;
