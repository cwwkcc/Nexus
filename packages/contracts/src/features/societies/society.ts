// packages/contracts/src/features/societies/society.ts
//
// Society profile contract.
//
// Should contain:
//   SocietyType      — z.enum(['academic','sports','cultural','service','religious','other'])
//   SocietySchema    — id, slug, name, type, description, coverImage? (R2 key),
//                      logo? (R2 key), founded? (year string), advisor?,
//                      memberCount?, meetingSchedule?, locale
//   SocietyCardSchema — id, slug, name, type, coverImage?, memberCount?
//   SocietyData      — z.infer type
//   SocietyCardData  — z.infer type
//
// Notes:
//   Each society gets a detail page at /societies/{slug}.



// TODO: implement

export type Society = unknown;
