// packages/contracts/src/registry/pages/facilities.ts

import { z } from 'zod';

import { CtaSchema, type CtaData } from '../../blocks/cta.ts';
import { HeroSchema, type HeroData } from '../../blocks/hero.ts';
import { StatsSchema, type StatsData } from '../../blocks/stats.ts';
import type { PageRegistry } from '../types.ts';

// ── Section schemas ─────────────────────────────────────────────────────

export const FacilitiesHeroSchema = HeroSchema;
export type FacilitiesHeroData = HeroData;

export const FacilitiesStatsSchema = StatsSchema;
export type FacilitiesStatsData = StatsData;

export const FacilityCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  capacity: z.string().optional(),
  features: z.array(z.string()).optional(),
});

export const FacilitiesGridSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  facilities: z.array(FacilityCardSchema),
});
export type FacilitiesGridData = z.infer<typeof FacilitiesGridSchema>;

export const FacilitiesCtaSchema = CtaSchema;
export type FacilitiesCtaData = CtaData;

// ── Page registry ───────────────────────────────────────────────────────

export const facilitiesRegistry: PageRegistry = {
  page: 'facilities',
  scope: 'page:facilities',
  label: 'Facilities',
  description:
    'The Facilities page showcases KCC campus infrastructure — classrooms, laboratories, libraries, sports facilities, and student amenities.',
  sections: [
    {
      key: 'facilities.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description:
        'Eyebrow text (e.g. "Campus Infrastructure"), page headline, optional emphasised word, and subtitle shown at the top of the page.',
      schema: FacilitiesHeroSchema,
    },
    {
      key: 'facilities.stats',
      blockKey: 'stats',
      label: 'Stats Strip',
      description:
        'The counter strip below the hero (classrooms, labs, etc). Each stat has a target number, label, and optional prefix/suffix.',
      schema: FacilitiesStatsSchema,
    },
    {
      key: 'facilities.grid',
      blockKey: 'richText',
      label: 'Facilities Grid',
      description:
        'Grid of facility cards — each with name, description, optional icon/image, capacity, and features list.',
      schema: FacilitiesGridSchema,
    },
    {
      key: 'facilities.cta',
      blockKey: 'cta',
      label: 'Call-to-Action',
      description:
        'Bottom section with heading, subtitle, and button(s) to encourage visits or contact.',
      schema: FacilitiesCtaSchema,
    },
  ],
};
