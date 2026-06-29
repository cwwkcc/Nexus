// packages/contracts/src/core/common/seo.ts
//
// SEO metadata contract attached to every public page.
//
// Should contain:
//   SeoSchema       — title, description, canonical?, ogImage? (R2 key),
//                     ogTitle?, ogDescription?, noIndex?: boolean,
//                     structuredData? (JSON-LD object)
//   SeoData         — z.infer<typeof SeoSchema>
//   OpenGraphSchema — subset: ogTitle, ogDescription, ogImage
//
// Notes:
//   The web app's generateMetadata() in each page.tsx maps SeoData to
//   Next.js Metadata format. Keep fields aligned with Next.js Metadata type.

import { z } from 'zod';

// TODO: implement
