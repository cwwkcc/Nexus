// packages/contracts/src/features/people/principal.ts
//
// Principal profile and message contracts.
//
// Should contain:
//   PrincipalSchema        — name, title ('Principal'|'Acting Principal'|...),
//                            image? (R2 key), bio?, qualifications?: string[]
//   PrincipalMessageSchema — heading, body (RichText HTML), signature?
//   PrincipalData          — z.infer type
//   PrincipalMessageData   — z.infer type
//
// Notes:
//   name and title also live in SiteSettings (principal.name, principal.title)
//   for use in the footer and global contexts.
//   The full profile and message are stored in ContentEntry.

import { z } from 'zod';

export const PrincipalSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  image: z.string().optional(),
  bio: z.string().optional(),
  qualifications: z.array(z.string()).optional(),
});

export const PrincipalMessageSchema = z.object({
  heading: z.string().min(1),
  body: z.string().min(1),
  signature: z.string().optional(),
});

export type PrincipalData = z.infer<typeof PrincipalSchema>;
export type PrincipalMessageData = z.infer<typeof PrincipalMessageSchema>;
