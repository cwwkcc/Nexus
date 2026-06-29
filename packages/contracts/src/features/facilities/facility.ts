// packages/contracts/src/features/facilities/facility.ts
//
// Campus facility contract.
//
// Should contain:
//   FacilityType      — z.enum(['classroom','laboratory','library','sports',
//                               'auditorium','canteen','administrative','other'])
//   FacilitySchema    — id, slug, name, type, description,
//                       images: GalleryImage[], capacity?, features?: string[],
//                       hasPanorama? (bool), locale
//   FacilityCardSchema — id, slug, name, type, coverImage?
//   FacilityData      — z.infer type
//   FacilityCardData  — z.infer type
//
// Notes:
//   hasPanorama: true → renders PanoramicFacilityViewer with data from panoramic.ts.

import { z } from 'zod';

// TODO: implement
