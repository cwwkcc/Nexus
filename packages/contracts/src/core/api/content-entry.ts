// packages/contracts/src/core/api/content-entry.ts
//
// Input/output schemas for the contentEntry tRPC router.
//
// Should contain:
//   CreateContentEntryInput  — sectionKey, scope, locale, contentType, data (unknown)
//   UpdateContentEntryInput  — id + partial of create fields
//   GetByScopeInput          — scope, locale
//   GetByKeyInput            — sectionKey, locale
//   AdminGetByScopeInput     — scope (returns all locales)
//   ContentEntryOutput       — id, sectionKey, scope, locale, contentType, data, updatedAt
//   ContentEntryListOutput   — items: ContentEntryOutput[], meta: PaginationMeta
//
// Notes:
//   data is typed unknown at the API boundary — callers parse it against
//   the correct block schema from registry/.
//   The router in packages/api/src/routers/content-entry.ts imports these
//   as procedure .input() schemas.

import { z } from 'zod';

// TODO: implement
