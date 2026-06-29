// packages/contracts/src/core/common/image.ts
//
// Shared image contract used across all feature areas and blocks.
//
// Should contain:
//   ImageSchema   — src (R2 key or URL), alt, width?, height?, caption?
//   ImageData     — z.infer<typeof ImageSchema>
//   AvatarSchema  — src + alt only, for person thumbnails
//   AvatarData    — z.infer<typeof AvatarSchema>
//
// Notes:
//   src is an R2 object key, not a full CDN URL.
//   The web app resolves keys via apps/web/src/lib/cdn.ts at render time.
//   Never store full CDN URLs — keys are portable if the CDN domain changes.

import { z } from 'zod';

// TODO: implement
