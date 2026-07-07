// packages/contracts/src/blocks/block-registry.ts
//
// The schema map, the renderer map, and the combined discriminated-union schema over every block.
//
// NOTE: This is a simplified version. All block schemas need to be updated to include
// the blockType discriminant field before the full discriminated union can be built.

import { type BlockTypeEnumData } from './block-type.js';

// Renderer map: block type → renderer component name
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

// TODO: Build BLOCK_SCHEMA_MAP and BlockContentSchema once all block schemas have blockType discriminant

