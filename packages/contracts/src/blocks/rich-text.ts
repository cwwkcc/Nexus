// packages/contracts/src/blocks/rich-text.ts
//
// Rich text block — freeform Tiptap HTML content.
//
// Should contain:
//   RichTextSchema — z.object({ content: z.string() })
//   RichTextData   — z.infer type
//
// Notes:
//   Wraps core/common/rich-text.ts as a named BLOCKS entry so it appears
//   in the block registry and can be assigned to page sections.

import { z } from 'zod';

// TODO: implement
