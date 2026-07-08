import { z } from 'zod';

import { CtaSchema, type CtaData } from '../../blocks/generic/cta.ts';
import { HeroSchema, type HeroData } from '../../blocks/hero.ts';
import { StaffSchema } from '../../school/people/staff.ts';
import type { PageRegistry } from '../types.js';

export const AdministrationHeroSchema = HeroSchema;
export type AdministrationHeroData = HeroData;

export const AdministrationPrincipalSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  principal: StaffSchema,
});
export type AdministrationPrincipalData = z.infer<
  typeof AdministrationPrincipalSchema
>;

export const AdministrationStaffGridSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  staff: z.array(StaffSchema),
});
export type AdministrationStaffGridData = z.infer<
  typeof AdministrationStaffGridSchema
>;

export const AdministrationAdvisoryBoardSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  members: z.array(StaffSchema),
});
export type AdministrationAdvisoryBoardData = z.infer<
  typeof AdministrationAdvisoryBoardSchema
>;

export const AdministrationContactSchema = CtaSchema;
export type AdministrationContactData = CtaData;

export const administrationRegistry: PageRegistry = {
  page: 'administration',
  scope: 'page:administration',
  label: 'Administration',
  description:
    'Manage the Administration page content including the Principal, Vice Principals, Heads of Department, and Advisory Board.',
  sections: [
    {
      key: 'administration.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: AdministrationHeroSchema,
    },
    {
      key: 'administration.principal',
      blockKey: 'richText', // Using generic richText block key for custom schema
      label: 'Principal',
      description: 'The principal profile.',
      schema: AdministrationPrincipalSchema,
    },
    {
      key: 'administration.vicePrincipals',
      blockKey: 'richText',
      label: 'Vice Principals',
      description: 'Grid of vice principals.',
      schema: AdministrationStaffGridSchema,
    },
    {
      key: 'administration.headsOfDepartment',
      blockKey: 'richText',
      label: 'Heads of Department',
      description: 'Grid of department heads.',
      schema: AdministrationStaffGridSchema,
    },
    {
      key: 'administration.advisoryBoard',
      blockKey: 'richText',
      label: 'Advisory Board',
      description: 'List of advisory board members.',
      schema: AdministrationAdvisoryBoardSchema,
    },
    {
      key: 'administration.contact',
      blockKey: 'cta',
      label: 'Contact Section',
      description: 'Call to action for administration contact.',
      schema: AdministrationContactSchema,
    },
  ],
};
