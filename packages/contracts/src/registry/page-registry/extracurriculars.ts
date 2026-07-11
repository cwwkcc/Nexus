// packages/contracts/src/registry/page-registry/extracurriculars.ts
//
// Page registry for: Extracurriculars (docs/Design System/Page
// Specifications.md section 08). The page spec names four subsections
// (Sports, Performing Arts, Scouts, National Cadet Corps), but
// ExtracurricularCategoryEnum has three values — Scouts and the NCC are
// both 'leadership', matching the real ExtracurricularCard component's own
// variant vocabulary (see Component Reference.md). They're still two
// separate ActivitySchema entries, just sharing a category.

import { z } from 'zod';

import { HeroSchema } from '../../blocks/index.ts';
import { ActivitySchema } from '../../domains/extracurriculars/activity.ts';
import type { PageRegistry } from '../types.ts';

export const ExtracurricularsHeroSchema = HeroSchema;

export const ExtracurricularsGridSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  activities: z.array(ActivitySchema),
});
export type ExtracurricularsGridData = z.infer<
  typeof ExtracurricularsGridSchema
>;

export const extracurricularsRegistry: PageRegistry = {
  page: 'extracurriculars',
  scope: 'page:extracurriculars',
  label: 'Extracurriculars',
  description:
    'Manage Extracurriculars — sports, performing arts, scouts, and the National Cadet Corps.',
  sections: [
    {
      key: 'extracurriculars.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: ExtracurricularsHeroSchema,
    },
    {
      key: 'extracurriculars.sports',
      blockKey: 'rich-text-block',
      label: 'Sports',
      description:
        'Cricket, athletics, volleyball, etc. ActivitySchema entries with category = sports.',
      schema: ExtracurricularsGridSchema,
    },
    {
      key: 'extracurriculars.performingArts',
      blockKey: 'rich-text-block',
      label: 'Performing Arts',
      description:
        'Western band, Eastern band, drama, etc. ActivitySchema entries with category = performing-arts.',
      schema: ExtracurricularsGridSchema,
    },
    {
      key: 'extracurriculars.leadership',
      blockKey: 'rich-text-block',
      label: 'Scouts and National Cadet Corps',
      description:
        'History, President\u2019s Award winners, teacher in charge, annual camps. ActivitySchema entries with category = leadership.',
      schema: ExtracurricularsGridSchema,
    },
  ],
};
