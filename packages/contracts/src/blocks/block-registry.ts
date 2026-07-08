// packages/contracts/src/blocks/block-registry.ts
//
// NOTE: According to the documentation, blocks should not have a separate registry file.
// The block identifier system is now part of the single content-type system in
// registry/content-type-key.ts. This file is kept for backward compatibility but
// should be removed once the full content-type system is implemented.

import { type BlockTypeEnumData } from './block-type.js';

// Renderer map: block type → renderer component name
// NOTE: This mapping should live in packages/ui, not here.
export const BLOCK_RENDERER_MAP = {
  hero: 'HeroBlock',
  stats: 'StatsBlock',
  timeline: 'TimelineBlock',
  quote: 'QuoteBlock',
  faq: 'FaqBlock',
  cta: 'CtaBlock',
  gallery: 'GalleryBlock',
  downloads: 'DownloadsBlock',
  announcement: 'AnnouncementBlock',
  'contact-info': 'ContactInfoBlock',
  map: 'MapBlock',
  'staff-grid': 'StaffGridBlock',
  'photo-strip': 'PhotoStripBlock',
  'process-steps': 'ProcessStepsBlock',
  'results-display': 'ResultsDisplayBlock',
  'rich-text-block': 'RichTextBlock',
  'key-dates': 'KeyDatesBlock',
  'crest-symbols': 'CrestSymbolsBlock',
  anthem: 'AnthemBlock',
  'values-grid': 'ValuesGridBlock',
} as const satisfies Record<BlockTypeEnumData, string>;

