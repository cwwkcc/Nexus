// packages/contracts/src/blocks/crest.ts
//
// Crest block — visual explanation of the school crest and its symbols.
//
// Should contain:
//   CrestSymbolSchema — id, name, meaning, position? (e.g. 'top-left')
//   CrestSchema       — eyebrow?, heading?, intro?, symbols: CrestSymbol[]
//   CrestData         — z.infer type
//   CrestSymbol       — z.infer type
//
// Used on: About page (Crest Explained section)

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content/page-content.ts AboutCrestSchema)
