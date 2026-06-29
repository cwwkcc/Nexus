// packages/contracts/src/core/cms/content-entry.ts
//
// Runtime shape of a ContentEntry row as it exists in the database.
// Defined here so non-database packages can reference the shape
// without importing @nexus/db.
//
// Should contain:
//   ContentEntrySchema         — id, sectionKey, scope, locale, contentType,
//                                data (unknown), createdAt, updatedAt, publishedAt?
//   ContentEntryVersionSchema  — id, contentEntryId, data, locale, createdAt, createdBy?
//   ContentEntry               — z.infer type
//   ContentEntryVersion        — z.infer type
//
// Notes:
//   Keep this in sync with packages/database/prisma/schema.prisma.
//   When the Prisma schema changes, update this file too.

import { z } from 'zod';

// TODO: implement
