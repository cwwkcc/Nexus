## Overview

This document lists every production asset required for the Nexus website. All assets must be stored in Cloudflare R2 or the `public/` directory. Use `next/image` for raster images.

---

## Global Assets

|Asset|Format|Dimensions|File size|Source|Owner|Usage|
|---|---|---|---|---|---|---|
|School crest|SVG|vector|< 50KB|Designer|KITS|Header, footer, loading screen, 404 page|
|School flag|SVG / PNG|vector, also 1200×800px|< 100KB|Designer|Administration|Download, about page|
|Favicon|ICO / PNG|32×32, 16×16|< 5KB|Derived from crest|KITS|Browser tab|

---

## Photography

### Campus & Facilities

|Asset|Format|Dimensions|File size|Source|Owner|Notes|
|---|---|---|---|---|---|---|
|Campus aerial|WebP|1920×1080|≤ 500KB|Drone shoot|Media Unit|Home hero background|
|Main building|WebP|1920×1080, 1200×800|≤ 500KB|Photographer|Administration|Facilities card, gallery|
|Science laboratory|WebP|1200×800|≤ 300KB|Photographer|Administration|Facilities card|
|ICT laboratory|WebP|1200×800|≤ 300KB|Photographer|Administration|Facilities card|
|Auditorium|WebP|1200×800|≤ 300KB|Photographer|Administration|Facilities card|
|Sports ground|WebP|1920×1080, 1200×800|≤ 500KB|Photographer|Sports Unit|Facilities card|
|Swimming pool|WebP|1920×1080, 1200×800|≤ 500KB|Photographer|Administration|Facilities card + panorama|
|Library|WebP|1200×800|≤ 300KB|Photographer|Administration|Facilities card|

### People

|Asset|Format|Dimensions|File size|Source|Owner|Notes|
|---|---|---|---|---|---|---|
|Dr. Kannangara portrait|WebP|600×800 (3:4)|≤ 150KB|Archives|Administration|About page|
|Principal portrait|WebP|800×1000 (3:4)|≤ 200KB|Photographer|Administration|Principal message|
|Deputy principals portraits|WebP|600×800|≤ 150KB each|Photographer|Administration|Admin page|
|Head prefects portraits (current year)|WebP|400×533|≤ 100KB each|Photographer|Administration|Admin page|
|Society committee members|WebP|400×533|≤ 100KB each|Society or photographer|Each society|Society pages|

### Heritage & Historical

|Asset|Format|Dimensions|File size|Source|Owner|Notes|
|---|---|---|---|---|---|---|
|Old building 1920s|WebP|1200×800|≤ 300KB|Archives|Administration|About → Legacy section|
|School hall 1950s|WebP|1200×800|≤ 300KB|Archives|Administration|About → Legacy section|
|Dr. Kannangara with students (historical)|WebP|1200×800|≤ 300KB|Archives|Administration|About → OurNameSake|

### Life at KCC (photo strip)

|Asset|Format|Dimensions|File size|Source|Owner|Notes|
|---|---|---|---|---|---|---|
|Sports action shots|WebP|800×600 (4:3)|≤ 200KB each|Sports photographer|Sports Unit|LifeAtKCCPhotoStrip|
|Event photos (prize giving, cultural)|WebP|800×600|≤ 200KB each|Media Unit|Media Unit|LifeAtKCCPhotoStrip|
|Classroom / academic moments|WebP|800×600|≤ 200KB each|Staff / Media Unit|Academics|LifeAtKCCPhotoStrip|

---

## Audio

|Asset|Format|Bitrate|File size|Source|Owner|Notes|
|---|---|---|---|---|---|---|
|School anthem|MP3|128 kbps|≤ 5MB|School choir|Music Department|AudioPlayer on about page|

---

## Logos & Brand Assets (Societies)

Each society should provide:

- Logo (SVG preferred, or 200×200 PNG)
- Banner image (16:9, 1920×1080, WebP)

Stored in R2 under `/societies/{society-slug}/`.

---

## Photo Assets (Extracurriculars)

Each sports team or co-curricular activity should provide:

- Cover photo (16:9, 1920×1080, WebP, ≤ 500KB) — used by `ExtracurricularCard`
- Action/achievement photos (4:3, 800×600, WebP, ≤ 200KB each, optional) — same treatment as society galleries, not a separate format

Stored in R2 under `/extracurriculars/{activity-slug}/`, mirroring the societies structure since the two modules are built identically (Feature Registry F‑168).

---

## Documents (PDFs)

|Document|Format|File size|Source|Owner|Location|
|---|---|---|---|---|---|
|Admission application form|PDF|≤ 2MB|Administration|Admissions Office|R2 `/documents/admission-form.pdf`|
|School prospectus|PDF|≤ 5MB|Administration|Administration|R2 `/documents/prospectus.pdf`|
|Fee structure|PDF|≤ 1MB|Administration|Bursar|R2 `/documents/fee-structure.pdf`|
|Past results summaries (by year)|PDF|≤ 500KB each|Examinations Office|Examinations Office|R2 `/results/`|
|Annual magazine|PDF|≤ 10MB|Editorial team|Administration|R2 `/publications/` (future)|

All PDFs must be **optimised** (Acrobat “Save as Optimised” or Ghostscript) before upload.

---

## OG Image Generation

Generated programmatically via `next/og` (`ImageResponse`) in an `opengraph-image.tsx` per route — not a designer-produced asset, and not a separate static file to keep updated. See [SEO & Search Strategy](https://claude.ai/technical/SEO%20%26%20Search%20Strategy.md) and Roadmap Task 10.1b.

**Template components:**

- School crest
- Page title (truncated)
- “C.W.W. Kannangara Central College” footer
- Green background with gold accent

**Fallback:** a route with no `opengraph-image.tsx` of its own inherits the nearest parent route's generated image automatically — there is no `/images/og-fallback.jpg` to produce or maintain.

---

## Asset Naming Convention

All assets must follow:

`{content-type}/{slug}/{purpose}-{unique-id}.{ext}`

Examples:

- `news/2026-05-01-nexus-launch/hero.webp`
- `societies/kits/banner.webp`
- `staff/principal/portrait.webp`

No spaces, only lowercase, hyphens for word separation.

---

## Storage & CDN

- **Raster images, PDFs, audio** → Cloudflare R2 (public bucket).
- **SVGs, small assets (< 100KB)** → `public/` directory (Vercel edge).
- All images must be served via `next/image` with proper `sizes` attribute.

**R2 bucket structure:**

```
nexus-assets/
├── news/
│   └── {slug}/
│       ├── hero.webp
│       └── gallery/
├── societies/
│   └── {slug}/
│       ├── banner.webp
│       ├── logo.svg
│       └── gallery/
├── extracurriculars/
│   └── {slug}/
│       ├── cover.webp
│       └── gallery/
├── staff/
│   └── {slug}/
│       └── portrait.webp
├── facilities/
│   └── {slug}/
│       ├── hero.webp
│       └── gallery/
├── gallery/
│   └── {album-slug}/
│       ├── cover.webp
│       └── photos/
├── documents/
└── results/
```

---

## Asset Checklist for Launch

|Asset|Status|Owner|
|---|---|---|
|School crest (SVG)|☐|KITS|
|School flag (SVG)|☐|Administration|
|Favicon|☐|KITS|
|Campus aerial|☐|Media Unit|
|Main building photos (x3)|☐|Administration|
|Science lab photos (x2)|☐|Administration|
|ICT lab photos (x2)|☐|Administration|
|Auditorium photo|☐|Administration|
|Sports ground photo|☐|Sports Unit|
|Extracurricular activity cover photos (x3)|☐|Sports Unit / Administration|
|Swimming pool photos (x3)|☐|Administration|
|Library photos (x2)|☐|Administration|
|Dr. Kannangara portrait|☐|Administration|
|Principal portrait|☐|Administration|
|Deputy principals portraits (x3)|☐|Administration|
|Head prefects portraits (x2)|☐|Administration|
|Heritage photos (x4)|☐|Archives|
|Life at KCC photos (x12)|☐|Media Unit|
|School anthem MP3|☐|Music Department|
|Admission form PDF|☐|Admissions Office|
|Prospectus PDF|☐|Administration|
|Fee structure PDF|☐|Bursar|

---

## Related Documents

- [Foundations](https://claude.ai/chat/Foundations.md) – image standards
- [Page Specifications](https://claude.ai/chat/Page%20Specifications.md) – where each asset is used
- [Assets Inventory](https://claude.ai/chat/Assets%20Inventory.md) – image field requirements

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_