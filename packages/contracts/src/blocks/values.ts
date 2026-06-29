// packages/contracts/src/blocks/values.ts
//
// Values block — list of core values, each with a title, description, optional icon.
//
// Should contain:
//   ValueItemSchema — id, title, description, icon? (icon name in @nexus/ui Icon registry)
//   ValuesSchema    — eyebrow?, heading?, values: ValueItem[]
//   ValuesData      — z.infer type
//   ValueItem       — z.infer type
//
// Used on: About page (four school values)

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
