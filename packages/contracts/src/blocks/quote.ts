// packages/contracts/src/blocks/quote.ts
//
// Quote block — highlighted pull-quote with optional attribution.
//
// Should contain:
//   QuoteSchema — eyebrow?, quote (string), attribution?
//   QuoteData   — z.infer type
//
// Notes:
//   Also used as a structural base for the Ethos section on the About page,
//   which extends it with vision, mission, and motto fields in registry/pages/about.ts.

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
