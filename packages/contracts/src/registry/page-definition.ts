// packages/contracts/src/registry/page-definition.ts
//
// A full page's section list plus its SEO defaults, keyed by a closed PageKeyEnum.

import { z } from 'zod';
import { SectionDefinitionSchema } from './section-definition.js';

export const PAGE_KEY_VALUES = [
  'home',
  'about',
  'academics',
  'administration',
  'admissions',
  'contact',
  'events',
  'extracurriculars',
  'facilities',
  'gallery',
  'news',
  'results',
  'societies',
] as const;

export const PageKeyEnum = z.enum(PAGE_KEY_VALUES);

export type PageKeyEnumData = z.infer<typeof PageKeyEnum>;

export const PageDefinitionSchema = z.object({
  pageKey: PageKeyEnum,
  path: z.string(),
  sections: z.array(SectionDefinitionSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    canonicalUrl: z.string().optional(),
    socialImage: z.string().optional(),
  }),
});

export type PageDefinitionData = z.infer<typeof PageDefinitionSchema>;
