// packages/contracts/src/blocks/contact-info.ts

import { z } from 'zod';

export const ContactInfoBlockSchema = z.object({
  address: z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }),
  phone: z.string(),
  email: z.string(),
  officeHours: z.string().optional(),
  admissionsPhone: z.string().optional(),
  admissionsEmail: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
});

export type ContactInfoBlockData = z.infer<typeof ContactInfoBlockSchema>;
