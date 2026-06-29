// packages/contracts/src/editorial/gallery/album.ts
//
// Photo album contract.
//
// Should contain:
//   AlbumSchema     — id, title, slug, description?, coverImage (R2 key),
//                     category?, date (ISO), photoCount, locale
//   AlbumCardSchema — id, title, slug, coverImage, date, photoCount
//   AlbumData       — z.infer type
//   AlbumCardData   — z.infer type
//
// Notes:
//   Albums are the top-level container. Individual photos are in gallery/photo.ts.
//   Gallery page shows AlbumCard grid; clicking opens the album lightbox.

import { z } from 'zod';

// TODO: implement
