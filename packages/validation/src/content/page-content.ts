import { z } from 'zod';

export const LocaleSchema = z.enum(['en', 'si', 'ta']);
export type Locale = z.infer<typeof LocaleSchema>;
export const SUPPORTED_LOCALES = LocaleSchema.options;

export const AboutHeroSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  titleEm: z.string().optional(),
  subtitle: z.string(),
});
export type AboutHeroData = z.infer<typeof AboutHeroSchema>;

export const AboutStorySchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  headingEm: z.string().optional(),
  paragraph: z.string(),
  quote: z.string().optional(),
  quoteAuthor: z.string().optional(),
});
export type AboutStoryData = z.infer<typeof AboutStorySchema>;

export const AboutKannangaraSchema = z.object({
  eyebrow: z.string(),
  name: z.string(),
  position: z.string(),
  portraitAlt: z.string(),
  portraitCaption: z.string().optional(),
  portraitSrc: z.string().optional(),
  paragraph: z.string(),
  quote: z.string().optional(),
  attribution: z.string().optional(),
});
export type AboutKannangaraData = z.infer<typeof AboutKannangaraSchema>;

export const AboutTimelineMilestoneSchema = z.object({
  id: z.string(),
  year: z.string(),
  title: z.string(),
  description: z.string(),
  era: z.string(),
});
export type AboutTimelineMilestone = z.infer<
  typeof AboutTimelineMilestoneSchema
>;

export const AboutTimelineSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  milestones: z.array(AboutTimelineMilestoneSchema),
});
export type AboutTimelineData = z.infer<typeof AboutTimelineSchema>;

export const AboutEthosSchema = z.object({
  mottoEyebrow: z.string(),
  motto: z.string(),
  visionEyebrow: z.string(),
  visionText: z.string(),
  missionEyebrow: z.string(),
  missionText: z.string(),
});
export type AboutEthosData = z.infer<typeof AboutEthosSchema>;

export const AboutValuesItemSchema = z.object({
  id: z.string(),
  english: z.string(),
  latin: z.string(),
  desc: z.string(),
});
export const AboutValuesSchema = z.object({
  valuesEyebrow: z.string(),
  values: z.array(AboutValuesItemSchema),
});
export type AboutValuesData = z.infer<typeof AboutValuesSchema>;

export const AboutCrestSymbolSchema = z.object({
  id: z.string(),
  name: z.string(),
  meaning: z.string(),
  position: z.string(),
});
export type AboutCrestSymbol = z.infer<typeof AboutCrestSymbolSchema>;

export const AboutCrestSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  symbols: z.array(AboutCrestSymbolSchema),
});
export type AboutCrestData = z.infer<typeof AboutCrestSchema>;

export const AboutLegacySchema = z.object({
  spirit: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    paragraph: z.string(),
    quote: z.string(),
    attribution: z.string(),
  }),
  heritage: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    caption: z.string(),
  }),
});
export type AboutLegacyData = z.infer<typeof AboutLegacySchema>;

export const AboutAnthemSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  paragraph: z.string(),
  playerTitle: z.string(),
  playerSubtitle: z.string(),
  lyricsSinhala: z.string(),
  anthemSrc: z.string(),
});
export type AboutAnthemData = z.infer<typeof AboutAnthemSchema>;

export const AboutClosingSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
  rule: z.string(),
});
export type AboutClosingData = z.infer<typeof AboutClosingSchema>;

export const ABOUT_SECTION_SCHEMAS = {
  'about.hero': AboutHeroSchema,
  'about.story': AboutStorySchema,
  'about.aboutKannangara': AboutKannangaraSchema,
  'about.timeline': AboutTimelineSchema,
  'about.ethos': AboutEthosSchema,
  'about.values': AboutValuesSchema,
  'about.crest': AboutCrestSchema,
  'about.legacy': AboutLegacySchema,
  'about.anthem': AboutAnthemSchema,
  'about.closing': AboutClosingSchema,
} as const;

export type AboutSectionKey = keyof typeof ABOUT_SECTION_SCHEMAS;
export type PageContentUpdateInput = z.infer<
  typeof PageContentUpdateInputSchema
>;

export const PageContentUpdateInputSchema = z.object({
  page: z.string().min(1),
  sectionKey: z.string().min(1),
  locale: LocaleSchema,
  data: z.unknown(),
});
