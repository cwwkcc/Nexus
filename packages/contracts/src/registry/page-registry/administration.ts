// packages/contracts/src/registry/page-registry/administration.ts
//
// Page registry for: Administration (docs/Design System/Page
// Specifications.md section 03). Data source is the Staff Module, filtered
// by role and ordered by hierarchy — this page has no content type of its
// own, just a query over StaffSchema. Rebuilt from scratch: the previous
// version referenced a StaffSchema import path that never existed
// ('../../school/people/staff.ts') and modeled sections ("Vice Principals",
// "Heads of Department", "Advisory Board") that don't match the real page
// spec at all (Institutional Statement, Principal, Deputy Principals,
// Assistant Principals, Head Prefects, School Development Society).

import { z } from 'zod';

import { CtaSchema, HeroSchema } from '../../blocks/index.ts';
import { StaffSchema } from '../../domains/people/staff-member.ts';
import type { PageRegistry } from '../types.ts';

export const AdministrationHeroSchema = HeroSchema;

export const AdministrationStatementSchema = z.object({
  body: z.string(),
});
export type AdministrationStatementData = z.infer<
  typeof AdministrationStatementSchema
>;

export const AdministrationPrincipalSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  principal: StaffSchema,
  messageLinkHref: z.string().optional(),
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

export const AdministrationSdsSchema = z.object({
  description: z.string(),
  contact: z.string().optional(),
  linkHref: z.string().optional(),
});
export type AdministrationSdsData = z.infer<typeof AdministrationSdsSchema>;

export const administrationRegistry: PageRegistry = {
  page: 'administration',
  scope: 'page:administration',
  label: 'Administration',
  description:
    'Manage the Administration page — principal, deputy and assistant principals, head prefects, and the School Development Society. All content is drawn from the Staff Module.',
  sections: [
    {
      key: 'administration.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: AdministrationHeroSchema,
    },
    {
      key: 'administration.institutional',
      blockKey: 'rich-text-block',
      label: 'Institutional Statement',
      description: 'One-sentence philosophy of administration.',
      schema: AdministrationStatementSchema,
    },
    {
      key: 'administration.principal',
      blockKey: 'rich-text-block',
      label: 'Principal',
      description:
        'Portrait, name, title, tenure, quote, and link to the full message. StaffSchema entry with role = principal.',
      schema: AdministrationPrincipalSchema,
    },
    {
      key: 'administration.deputyPrincipals',
      blockKey: 'staff-grid',
      label: 'Deputy Principals',
      description:
        'Portrait, name, title, portfolio, tenure. StaffSchema entries with role = deputy-principal.',
      schema: AdministrationStaffGridSchema,
    },
    {
      key: 'administration.assistantPrincipals',
      blockKey: 'staff-grid',
      label: 'Assistant Principals',
      description:
        'Portrait, name, title, portfolio. StaffSchema entries with role = assistant-principal.',
      schema: AdministrationStaffGridSchema,
    },
    {
      key: 'administration.headPrefects',
      blockKey: 'staff-grid',
      label: 'Head Prefects (Current Year)',
      description:
        'Name, title, optional portrait. StaffSchema entries with role = head-prefect.',
      schema: AdministrationStaffGridSchema,
    },
    {
      key: 'administration.sds',
      blockKey: 'rich-text-block',
      label: 'School Development Society',
      description: 'Description, contact, and link to the SDS page.',
      schema: AdministrationSdsSchema,
    },
    {
      key: 'administration.contact',
      blockKey: 'cta',
      label: 'Contact Section',
      description: 'Call to action for administration contact.',
      schema: CtaSchema,
    },
  ],
};
