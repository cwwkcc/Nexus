import { z } from 'zod';

import { CtaSchema, type CtaData } from '../../blocks/cta.ts';
import { HeroSchema, type HeroData } from '../../blocks/hero.ts';
import { StreamSchema, StreamComparisonSchema } from '../../school/academics/stream.ts';
import type { PageRegistry } from '../types.js';

export const AcademicsHeroSchema = HeroSchema;
export type AcademicsHeroData = HeroData;

export const AcademicsStreamCardsSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  streams: z.array(StreamSchema),
});
export type AcademicsStreamCardsData = z.infer<typeof AcademicsStreamCardsSchema>;

export const AcademicsStreamComparisonSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  comparisons: z.array(StreamComparisonSchema),
});
export type AcademicsStreamComparisonData = z.infer<typeof AcademicsStreamComparisonSchema>;

export const AcademicsDepartmentContactSchema = z.object({
  id: z.string(),
  department: z.string(),
  headOfDepartment: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});
export type AcademicsDepartmentContactData = z.infer<typeof AcademicsDepartmentContactSchema>;

export const AcademicsContactsSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  contacts: z.array(AcademicsDepartmentContactSchema),
});
export type AcademicsContactsData = z.infer<typeof AcademicsContactsSchema>;

export const AcademicsCtaSchema = CtaSchema;
export type AcademicsCtaData = CtaData;

export const academicsRegistry: PageRegistry = {
  page: 'academics',
  scope: 'page:academics',
  label: 'Academics',
  description: 'Manage the Academic streams, comparisons, and department contacts.',
  sections: [
    {
      key: 'academics.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: AcademicsHeroSchema,
    },
    {
      key: 'academics.streams',
      blockKey: 'richText', // Reusing a generic blockKey since it is a custom schema
      label: 'Stream Cards',
      description: 'Grid of academic stream cards.',
      schema: AcademicsStreamCardsSchema,
    },
    {
      key: 'academics.comparison',
      blockKey: 'richText',
      label: 'Stream Comparison',
      description: 'Table comparing academic streams.',
      schema: AcademicsStreamComparisonSchema,
    },
    {
      key: 'academics.contacts',
      blockKey: 'richText',
      label: 'Department Contacts',
      description: 'List of departmental contact information.',
      schema: AcademicsContactsSchema,
    },
    {
      key: 'academics.cta',
      blockKey: 'cta',
      label: 'Call to Action',
      description: 'Call to action section at the bottom of the page.',
      schema: AcademicsCtaSchema,
    },
  ],
};
