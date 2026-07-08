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

export const HotspotSchema = z.object({
  id: z.string().min(1),
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
  label: z.string().min(1),
  description: z.string().optional(),
});

export const PanoramicViewerSchema = z.object({
  facilityId: z.string().min(1),
  panoramaUrl: z.string().min(1),
  hotspots: z.array(HotspotSchema),
});

export type HotspotData = z.infer<typeof HotspotSchema>;
export type PanoramicViewerData = z.infer<typeof PanoramicViewerSchema>;
export type Panoramic = PanoramicViewerData;
