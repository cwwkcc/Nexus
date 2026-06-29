// packages/contracts/src/core/storage/index.ts
//
// Cloudflare R2 object storage contracts.
//
// Should contain:
//   R2Folder      — z.enum(['images', 'documents', 'media', 'avatars'])
//   R2ObjectKey   — z.string() with convention: '{folder}/{uuid}.{ext}'
//                   e.g. 'images/abc123.jpg', 'documents/xyz789.pdf'
//   StoredAsset   — key (R2ObjectKey), folder (R2Folder), originalName,
//                   contentType (MIME), sizeBytes, uploadedAt
//
// Notes:
//   CDN URL: `${process.env.NEXT_PUBLIC_R2_URL}/${key}`
//   Never store full CDN URLs in the database — store keys only.
//   CDN base URLs can change; R2 keys are permanent.

import { z } from 'zod';

// TODO: implement
