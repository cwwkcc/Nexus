// packages/contracts/src/registry/page-registry/societies.ts
//
// Page registry for: Societies Hub (docs/Design System/Page
// Specifications.md section 09). Individual society pages
// (/societies/[slug]) aren't part of this page registry entry — their
// Leadership, Achievements, Recent Events, and Gallery sections are
// composed at the page-fetcher level from StaffSchema, SocietyAchievement,
// editorial events, and gallery albums queried by society id, not from
// registry sections.

import { z } from 'zod';

import { HeroSchema } from '../../blocks/index.ts';
import { SocietyCardSchema } from '../../domains/societies/society-profile.ts';
import type { PageRegistry } from '../types.ts';

export const SocietiesHeroSchema = HeroSchema;

export const SocietiesGridSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  societies: z.array(SocietyCardSchema),
});
export type SocietiesGridData = z.infer<typeof SocietiesGridSchema>;

export const societiesRegistry: PageRegistry = {
  page: 'societies',
  scope: 'page:societies',
  label: 'Societies Hub',
  description: 'Manage the Societies Hub — the filterable grid of all societies, with KITS featured.',
  sections: [
    {
      key: 'societies.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: SocietiesHeroSchema,
    },
    {
      key: 'societies.grid',
      blockKey: 'rich-text-block',
      label: 'Society Grid',
      description: 'All societies, filterable by category (Academic, Sports, Arts, Technology). KITS shows as the featured card via isFeatured.',
      schema: SocietiesGridSchema,
    },
  ],
};
