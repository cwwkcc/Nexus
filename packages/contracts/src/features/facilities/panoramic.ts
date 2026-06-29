// packages/contracts/src/features/facilities/panoramic.ts
//
// Panoramic facility viewer — 360° photo with interactive hotspots.
//
// Should contain:
//   HotspotSchema         — id, x (0–100%), y (0–100%), label, description?
//   PanoramicViewerSchema — facilityId, panoramaUrl (R2 key, equirectangular image),
//                           hotspots: Hotspot[]
//   PanoramicViewerData   — z.infer type
//
// Notes:
//   x/y are percentages of the panorama image dimensions.
//   The PanoramicFacilityViewer component in @nexus/ui reads this data.

import { z } from 'zod';

// TODO: implement
