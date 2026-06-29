// packages/contracts/src/features/people/alumni.ts
//
// Alumni profile contracts.
//
// Should contain:
//   AlumniSchema     — id, name, graduationYear, stream? (ALStream),
//                      currentRole?, currentOrg?, image? (R2 key),
//                      quote?, isFeatureworthy? (bool — shown in legacy section)
//   AlumniCardSchema — id, name, graduationYear, currentRole?, image?
//   AlumniData       — z.infer type
//   AlumniCardData   — z.infer type
//
// Notes:
//   Only isFeatureworthy: true alumni are shown on the public About page.
//   Migrate from packages/validation/src/people/.

import { z } from 'zod';

// TODO: implement
