// packages/contracts/src/core/common/link.ts
//
// Shared link contracts for navigation, CTAs, and inline links.
//
// Should contain:
//   InternalLinkSchema  — { type: 'internal', href: string (relative), label: string }
//   ExternalLinkSchema  — { type: 'external', href: string (absolute URL),
//                           label: string, openInNewTab?: boolean }
//   LinkSchema          — z.discriminatedUnion('type', [InternalLink, ExternalLink])
//   LinkData            — z.infer<typeof LinkSchema>
//
// Used by:
//   blocks/cta.ts              — primary and secondary button links
//   blocks/downloads.ts        — downloadable document hrefs
//   registry/globals/navigation.ts — nav link hrefs

import { z } from 'zod';

// TODO: implement
