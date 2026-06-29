// packages/contracts/src/blocks/index.ts
//
// Reusable CMS block schemas — the atomic content units of Nexus.
// Pages are assembled from blocks via the registry.
//
// Each block file exports:
//   {Name}Schema  — Zod schema (runtime validation + type inference)
//   {Name}Data    — z.infer type
//
// Naming convention:
//   Schema:  HeroSchema, TimelineSchema, StatsSchema ...
//   Type:    HeroData, TimelineData, StatsData ...
//   Key:     'hero', 'timeline', 'stats' ...
//
// When adding a new block:
//   1. Create blocks/{name}.ts
//   2. Export from this index
//   3. Add to BLOCKS map below
//   4. Add a renderer in apps/web/src/components/blocks/{Name}.tsx
//   5. Register in core/cms/renderer.ts

export * from './hero.js';
export * from './timeline.js';
export * from './stats.js';
export * from './gallery.js';
export * from './quote.js';
export * from './cta.js';
export * from './values.js';
export * from './faq.js';
export * from './announcement.js';
export * from './downloads.js';
export * from './members.js';
export * from './rich-text.js';
export * from './anthem.js';
export * from './crest.js';
export * from './map.js';
export * from './contact-info.js';
export * from './results-display.js';
export * from './photo-strip.js';
export * from './process-steps.js';
export * from './key-dates.js';

import { HeroSchema } from './hero.js';
import { TimelineSchema } from './timeline.js';
import { StatsSchema } from './stats.js';
import { GallerySchema } from './gallery.js';
import { QuoteSchema } from './quote.js';
import { CtaSchema } from './cta.js';
import { ValuesSchema } from './values.js';
import { FaqSchema } from './faq.js';
import { AnnouncementSchema } from './announcement.js';
import { DownloadsSchema } from './downloads.js';
import { MembersSchema } from './members.js';
import { RichTextSchema } from './rich-text.js';

export const BLOCKS = {
  hero: HeroSchema,
  timeline: TimelineSchema,
  stats: StatsSchema,
  gallery: GallerySchema,
  quote: QuoteSchema,
  cta: CtaSchema,
  values: ValuesSchema,
  faq: FaqSchema,
  announcement: AnnouncementSchema,
  downloads: DownloadsSchema,
  members: MembersSchema,
  richText: RichTextSchema,
} as const;

export type BlockKey = keyof typeof BLOCKS;
