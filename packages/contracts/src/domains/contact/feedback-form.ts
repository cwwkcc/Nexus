// packages/contracts/src/features/contact/feedback.ts
//
// Feedback form input contract.
//
// Should contain:
//   FeedbackCategory   — z.enum(['website','academic','facilities','staff','other'])
//   FeedbackFormSchema — category, rating? (1–5), message (min 10),
//                        isAnonymous? (bool), email? (required if not anonymous)
//   FeedbackFormInput  — z.infer type
//
// Notes:
//   Used by the FeedbackForm component in @nexus/ui.
//   Unlike contact form submissions, feedback may be stored in the DB.

import { z } from 'zod';

export const FeedbackCategoryEnum = z.enum([
  'website',
  'academic',
  'facilities',
  'staff',
  'other',
]);

export const FeedbackFormSchema = z.object({
  category: FeedbackCategoryEnum,
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(10),
  isAnonymous: z.boolean().optional(),
  email: z.string().email().optional(),
});

export type FeedbackCategory = z.infer<typeof FeedbackCategoryEnum>;
export type FeedbackFormInput = z.infer<typeof FeedbackFormSchema>;
export type Feedback = FeedbackFormInput;
