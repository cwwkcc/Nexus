import { z } from 'zod';
// packages/contracts/src/blocks/hero.ts
//
// Hero block — top-of-page banner used on most pages.
//
// Fields:
//   eyebrow  — small label above the headline (e.g. 'Est. 1873 · Mathugama')
//   title    — main page headline
//   titleEm  — optional word within the title rendered with typographic emphasis
//              (italic in English, weight change in Sinhala/Tamil)
//   subtitle — optional subheadline below the title
//
// Page-specific extensions (e.g. AboutHeroSchema) are defined in
// registry/pages/about.ts via HeroSchema.extend({ ... }).



export const HeroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  titleEm: z.string().optional(),
  subtitle: z.string().optional(),
});

export type HeroData = z.infer<typeof HeroSchema>;
