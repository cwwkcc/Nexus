// packages/contracts/src/registry/globals/footer.ts
//
// Footer content schema.
//
// Should contain:
//   FooterLinkSchema    — id, label, href
//   FooterColumnSchema  — id, heading, links: FooterLink[]
//   FooterContentSchema — tagline?, columns: FooterColumn[],
//                         copyright?, legalLinks?: FooterLink[]
//   FooterContentData   — z.infer type
//   FooterColumn        — z.infer type
//
// Notes:
//   Stored in ContentEntry: sectionKey 'footer.main', scope 'global:footer'.
//   The Footer component in @nexus/ui reads FooterContentData.
//   Migrate from packages/validation/src/global-registry/index.ts.



// TODO: implement

export type Footer = unknown;
