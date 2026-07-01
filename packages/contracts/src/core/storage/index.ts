// packages/contracts/src/core/storage/index.ts
//
// Storage contracts for R2/media handling.
//
// Should contain:
//   StorageFolder      — z.enum(['images', 'documents', 'media', 'avatars'])
//   StorageKey         — z.string() (R2 object key format)
//   StorageUrl         — z.string() (CDN URL format)
//
// Notes:
//   Not implemented in Phase 1. Scaffold now for future storage system.

import { z } from 'zod';

export const StorageFolder = z.enum(['images', 'documents', 'media', 'avatars']);

export const StorageKey = z.string();

export const StorageUrl = z.string();
