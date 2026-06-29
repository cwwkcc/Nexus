// packages/contracts/src/registry/types.ts
//
// Type definitions for page and global section registries.
//
// Should contain:
//   SectionDefinition       — { key: string, blockKey: BlockKey, label: string,
//                               description?: string, schema: ZodTypeAny }
//                             key    → sectionKey stored in ContentEntry
//                             schema → may be a BLOCKS schema or a page-specific extension
//   PageRegistry            — { page, scope, label, description?, sections: SectionDefinition[] }
//   GlobalSectionDefinition — { key, scope, contentType, label, description?, schema }
//
// Notes:
//   Migrate from packages/validation/src/page-registry/types.ts.

import type { ZodTypeAny } from 'zod';

// TODO: implement
