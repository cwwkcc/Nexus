// packages/contracts/src/blocks/timeline.ts
//
// Timeline block — ordered list of historical milestones grouped by era.
//
// Should contain:
//   TimelineItemSchema — id, year (string e.g. '1950'), title, description,
//                        era? ('early' | 'mid' | 'modern')
//   TimelineSchema     — eyebrow?, heading?, items: TimelineItem[]
//   TimelineData       — z.infer type
//   TimelineItem       — z.infer type
//
// Used by:
//   registry/pages/about.ts — school history timeline



// TODO: implement (migrate from packages/validation/src/content-types/index.ts)

export type Timeline = unknown;
