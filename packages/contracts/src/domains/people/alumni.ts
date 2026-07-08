// packages/contracts/src/features/people/alumni.ts
//
// Alumni profile contracts.
//
// Should contain:
//   AlumniSchema     — id, name, graduationYear, stream? (ALStream),
//                      currentRole?, currentOrg?, image? (R2 key),
//                      quote?, isFeatureworthy? (bool — shown in legacy section)
//   AlumniCardSchema — id, name, graduationYear, currentRole?, image?
//   AlumniData       — z.infer type
//   AlumniCardData   — z.infer type
//
// Notes:
//   Only isFeatureworthy: true alumni are shown on the public About page.
//   Migrate from packages/validation/src/people/.

import { z } from 'zod';
import { ALStreamEnum } from '../identity/school/stream';

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
export type Alumni = AlumniData;
