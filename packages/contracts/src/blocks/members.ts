// packages/contracts/src/blocks/members.ts
//
// Members block — rendered list of people within a page section.
// Distinct from features/people/ (the authoritative people data model).
//
// Should contain:
//   MemberSchema  — id, name, role, image? (R2 key), bio?
//   MembersSchema — eyebrow?, heading?, members: Member[]
//   MembersData   — z.infer type
//   MemberItem    — z.infer type

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
