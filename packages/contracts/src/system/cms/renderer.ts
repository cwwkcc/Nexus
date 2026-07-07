// packages/contracts/src/core/cms/renderer.ts
//
// Renderer registry — maps a contentType string to a React component.
// The web app uses this to look up which block component renders a given
// ContentEntry.contentType value.
//
// Should contain:
//   RendererKey           — union of all valid contentType strings
//                           (mirrors keys of BLOCKS in blocks/index.ts)
//   RendererMap           — Record<RendererKey, string>
//                           value is the component display name for dynamic import
//   ContentRendererSchema — z.object({ contentType: RendererKeySchema, data: z.unknown() })
//
// Notes:
//   The actual React component lookup lives in apps/web/src/lib/renderer.ts.
//   This file only defines the contract — which contentType keys are valid.
//   Keep RendererKey in sync with the BLOCKS registry in blocks/index.ts.

import { z } from 'zod';

export const RendererKey = z.enum([
  'announcement',
  'anthem',
  'contact-info',
  'crest',
  'cta',
  'downloads',
  'faq',
  'gallery',
  'hero',
  'key-dates',
  'map',
  'members',
  'photo-strip',
  'process-steps',
  'quote',
  'results-display',
  'rich-text',
  'stats',
  'timeline',
  'values',
]);

export type RendererMap = Record<z.infer<typeof RendererKey>, string>;

export const ContentRendererSchema = z.object({
  contentType: RendererKey,
  data: z.unknown(),
});
