// packages/contracts/src/features/contact/form.ts
//
// General contact form input contract.
//
// Should contain:
//   ContactFormSchema — name (min 2), email (valid), phone?,
//                       subject (min 5), message (min 20, max 2000),
//                       locale (Locale)
//   ContactFormInput  — z.infer type — used as tRPC procedure input
//
// Notes:
//   Used by apps/web ContactForm and the API router that sends the email.
//   .min() / .max() constraints are read by the UI for validation feedback.
//   Never store contact form submissions in the DB — email them directly.

import { z } from 'zod';
import { LocaleEnum } from '../../primitives/locale';

export const ContactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(20).max(2000),
  locale: LocaleEnum,
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type Form = ContactFormInput;
