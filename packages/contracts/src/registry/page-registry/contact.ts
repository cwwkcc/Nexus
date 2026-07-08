// packages/contracts/src/registry/pages/contact.ts
//
// Page registry for: Contact
//
// Should contain:
//   contactRegistry — PageRegistry object:
//     page:        'contact'
//     scope:       'page:contact'
//     label:       'Contact'
//     description: What this page is and who manages it
//     sections:    SectionDefinition[] — one entry per block on this page
//
// Each SectionDefinition:
//   key:         'contact.{sectionName}'  → stored as ContentEntry.sectionKey
//   blockKey:    key from BLOCKS registry (e.g. 'hero', 'stats', 'timeline')
//   label:       Section name shown in the admin editor
//   description: Help text for content editors explaining what this section is
//   schema:      The block schema — either a BLOCKS schema directly, or a
//                page-specific extension: HeroSchema.extend({ extraField: z.string() })
//
// When adding a section:
//   1. Add a SectionDefinition entry here
//   2. Add seed data in packages/database/prisma/seed-contact.ts
//   3. Update the page fetcher in apps/web/src/server/content.ts
//   4. Build the block in apps/web/src/blocks/contact/

import {
  ContactInfoBlockSchema,
  type ContactInfoBlockData,
} from '../../blocks/page-specific/contact-info.ts';
import { CtaSchema, type CtaData } from '../../blocks/generic/cta.ts';
import { HeroSchema, type HeroData } from '../../blocks/hero.ts';
import type { PageRegistry } from '../types.js';

export const ContactHeroSchema = HeroSchema;
export type ContactHeroData = HeroData;

export const ContactInfoSchema = ContactInfoBlockSchema;
export type ContactInfoData = ContactInfoBlockData;

export const ContactCtaSchema = CtaSchema;
export type ContactCtaData = CtaData;

export const contactRegistry: PageRegistry = {
  page: 'contact',
  scope: 'page:contact',
  label: 'Contact',
  description:
    'Manage the Contact page content, including hero, contact details, and enquiry CTA.',
  sections: [
    {
      key: 'contact.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: ContactHeroSchema,
    },
    {
      key: 'contact.info',
      blockKey: 'contact-info',
      label: 'Contact Information',
      description:
        'School contact details, address, admissions contact and map.',
      schema: ContactInfoSchema,
    },
    {
      key: 'contact.cta',
      blockKey: 'cta',
      label: 'Call to Action',
      description: 'Bottom of page call-to-action for enquiries.',
      schema: ContactCtaSchema,
    },
  ],
};
