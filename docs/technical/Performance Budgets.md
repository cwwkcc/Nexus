## Overview

Nexus must be fast on all devices, especially on mobile networks in Sri Lanka. This document defines page‑specific performance budgets enforced via **Lighthouse CI** and **bundler analysis**.

All budgets refer to **initial page load** (first view, uncached).

---

## Global Thresholds

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance Score (mobile) | ≥ 90 | Lighthouse CI |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse / Web Vitals |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse / Web Vitals |
| Total Blocking Time (TBT) | < 300ms | Lighthouse |
| First Input Delay (FID) | < 100ms | Web Vitals |
| Total JavaScript bundle (initial) | < 200KB | `next build` analysis |
| Total CSS bundle | < 50KB | `next build` analysis |

---

## Page‑Specific Budgets

Budgets include all assets (HTML, JS, CSS, images, fonts, third‑party scripts) except deferred/lazy‑loaded content.

| Page | JS budget | Image budget | Total assets | Notes |
|------|-----------|--------------|--------------|-------|
| Home | ≤ 200KB | ≤ 1.5MB | ≤ 2MB | Hero image optimised; lazy load below‑fold |
| About | ≤ 150KB | ≤ 1MB | ≤ 1.5MB | Timeline images lazy loaded |
| Administration | ≤ 150KB | ≤ 800KB | ≤ 1.2MB | Staff portraits lazy loaded |
| Academics | ≤ 150KB | ≤ 800KB | ≤ 1.2MB | Stream comparison table |
| Admissions | ≤ 120KB | ≤ 500KB | ≤ 800KB | Mostly static, forms |
| News listing | ≤ 150KB | ≤ 800KB | ≤ 1MB | Thumbnails optimised, pagination |
| News article | ≤ 120KB | ≤ 1MB (deferred) | ≤ 1.5MB | Body images lazy loaded |
| Results | ≤ 100KB | ≤ 100KB | ≤ 500KB | No hero image, minimal UI |
| Facilities | ≤ 150KB | ≤ 1MB | ≤ 1.5MB | Gallery images lazy loaded |
| Extracurriculars | ≤ 150KB | ≤ 1MB | ≤ 1.5MB | Photo strip lazy loaded |
| Societies hub | ≤ 150KB | ≤ 800KB | ≤ 1.2MB | Grid of images lazy loaded |
| Society page | ≤ 150KB | ≤ 1MB | ≤ 1.5MB | Gallery lazy loaded |
| Gallery album | ≤ 150KB | ≤ 2MB (deferred) | ≤ 2.5MB | Thumbnails + lightbox on demand |
| Contact | ≤ 100KB | ≤ 300KB | ≤ 500MB | No hero image, static map |

---

## Image Optimisation Rules

- All images must use `next/image` with `sizes` attribute.
- Maximum image dimensions:
  - Hero images: 1920×1080 (WebP, ≤ 500KB)
  - Card thumbnails: 800×600 (WebP, ≤ 200KB)
  - Gallery images: 1920px on long edge (WebP, ≤ 500KB each)
  - Staff portraits: 600×800 (WebP, ≤ 150KB)
- Lazy load all images below the fold (`loading="lazy"`).
- Use `priority` only for LCP image (usually hero on homepage).

---

## Font Loading Strategy

- Self‑host fonts (no external CDN) to avoid redirects.
- Use `font-display: swap`.
- Preload only critical fonts: `Inter` (body) and `Cormorant Garamond` (headings).
- Sinhala fonts loaded asynchronously (`preload: false`).

---

## Third‑Party Scripts

- Umami analytics: loaded after consent, deferred (`loading="lazy"`, `async`).
- No external libraries unless approved.
- All third‑party scripts audited for performance impact.

---

## JavaScript Bundle Optimisation

- Use dynamic imports for heavy components:
  - `CrestDiagram` (about page)
  - `PanoramicFacilityViewer` (facilities page)
  - `AudioPlayer` (about page)
  - `Lightbox` (gallery page)
- Tree shaking enabled (ES modules, `sideEffects: false`).
- No duplicate dependencies (checked via `pnpm why`).

---

## Lighthouse CI Configuration

`.lighthouserc.js` example:

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/en/about',
        'http://localhost:3000/en/news',
        'http://localhost:3000/en/results',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

Run in CI:

```bash
npx lhci autorun
```

---

## Monitoring

- **Sentry** – performance monitoring (if enabled)
- **Umami** – page load times (via custom event)
- **Lighthouse CI** – automated regression

---

## Remediation Process

If a page exceeds budget:

1. Identify largest assets using `next build --analyze` or Lighthouse report.
2. Optimise images (lower dimensions, stronger compression).
3. Defer non‑critical JavaScript (dynamic import).
4. Remove unused CSS/dependencies.
5. Re‑run Lighthouse CI.

Budgets enforced at PR time via GitHub Actions.

---

## Related Documents

- [Foundations – Performance Rules](../Design%20System/Foundations.md#27-performance-rules)
- [Page Specifications – Asset Expectations](../Design%20System/Page%20Specifications.md)

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*
