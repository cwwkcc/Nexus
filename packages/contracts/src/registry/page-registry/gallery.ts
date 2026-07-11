// packages/contracts/src/registry/page-registry/gallery.ts
//
// Page registry for: Gallery (docs/Design System/Page Specifications.md
// section 10). The Instagram embed and YouTube video section are optional,
// static-config sections — no CMS content type needed for either.

import { z } from 'zod';

import { HeroSchema } from '../../blocks/index.ts';
import { GalleryAlbumCardSchema } from '../../editorial/gallery/album.ts';
import type { PageRegistry } from '../types.ts';

export const GalleryHeroSchema = HeroSchema;

export const GalleryAlbumsGridSchema = z.object({
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  albums: z.array(GalleryAlbumCardSchema),
});
export type GalleryAlbumsGridData = z.infer<typeof GalleryAlbumsGridSchema>;

export const GalleryVideoSectionSchema = z.object({
  heading: z.string().optional(),
  youtubePlaylistUrl: z.string(),
});
export type GalleryVideoSectionData = z.infer<typeof GalleryVideoSectionSchema>;

export const galleryRegistry: PageRegistry = {
  page: 'gallery',
  scope: 'page:gallery',
  label: 'Gallery',
  description:
    'Manage the Gallery page — featured albums grid and the optional video section. Individual photos live inside each album, not as page sections.',
  sections: [
    {
      key: 'gallery.hero',
      blockKey: 'hero',
      label: 'Hero Banner',
      description: 'Top-of-page headline and eyebrow text.',
      schema: GalleryHeroSchema,
    },
    {
      key: 'gallery.albums',
      blockKey: 'gallery',
      label: 'Featured Albums Grid',
      description:
        'Curated albums, filterable by category (Events, Sports, Academic, Cultural).',
      schema: GalleryAlbumsGridSchema,
    },
    {
      key: 'gallery.video',
      blockKey: 'rich-text-block',
      label: 'Video Section',
      description: 'Optional YouTube playlist embed of school event videos.',
      schema: GalleryVideoSectionSchema,
    },
  ],
};
