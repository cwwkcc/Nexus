// packages/contracts/src/blocks/faq.ts
//
// FAQ block — accordion of frequently asked questions.
//
// Should contain:
//   FaqItemSchema — id, question, answer (may contain HTML from rich text editor)
//   FaqSchema     — eyebrow?, heading?, items: FaqItem[]
//   FaqData       — z.infer type
//   FaqItem       — z.infer type
//
// Used on: Admissions page, Societies page, Results page

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
