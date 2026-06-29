// packages/contracts/src/blocks/gallery.ts
//
// Gallery block — image grid with optional lightbox.
//
// Should contain:
//   GalleryImageSchema — id, src (R2 key), alt, caption?
//   GallerySchema      — eyebrow?, heading?, images: GalleryImage[]
//   GalleryData        — z.infer type
//   GalleryImage       — z.infer type
//
// Notes:
//   src is an R2 object key resolved to a CDN URL at render time.
//   Used on: About page (crest images), Facilities, Gallery album views.



// TODO: implement (migrate from packages/validation/src/content-types/index.ts)

export type Gallery = unknown;
