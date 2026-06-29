// packages/contracts/src/registry/globals/navigation.ts
//
// Main navigation content schema.
//
// Should contain:
//   NavLinkSchema            — id, label, href (relative path)
//   NavGroupSchema           — id, label, href?, children?: NavLink[]
//                              children enable one-level dropdown menus
//   NavigationContentSchema  — links: NavGroup[], ctaLabel?, ctaHref?
//   NavigationContentData    — z.infer type
//   NavGroup                 — z.infer type
//   NavLink                  — z.infer type
//
// Notes:
//   Stored in ContentEntry: sectionKey 'navigation.main', scope 'global:navigation'.
//   The Navigation component in @nexus/ui reads NavigationContentData.
//   Migrate from packages/validation/src/global-registry/index.ts.

import { z } from 'zod';

// TODO: implement
