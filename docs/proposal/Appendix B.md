# Design System Summary

**Project:** Nexus – C.W.W. Kannangara Central College  
**Prepared by:** Kannangara ICT Society (KITS)  
**Date:** June 2026

> **Note:** This document is a high-level summary. The complete design system is defined in:
> 
> - [`Design System/Foundations.md`](../Design%20System/Foundations.md)
> - [`Design System/Tokens Reference.md`](../Design%20System/Tokens%20Reference.md)
> - [`Design System/Page Specifications.md`](../Design%20System/Page%20Specifications.md)

---

## Design Concept: "Stepping Into the Forest"

The Nexus visual identity is inspired by KCC's natural environment – moving from a sunlit canopy (hero section) to a deep forest floor (footer). The aesthetic uses light, glass panels, and radial gradients.

**Key principles:**

- Heritage before trend – timeless over fashionable.
- Glass before weight – translucent floating panels, no heavy blocks.
- Clarity before decoration – readability first.
- Motion with purpose – animation only to communicate transitions.

---

## Colour System

All colours are referenced via design tokens (no raw hex codes). See [`Tokens Reference.md`](../Design%20System/Tokens%20Reference.md) for exact values.

|Role|Token|
|---|---|
|Forest Green|`green-base`|
|Gold (accent)|`gold-base`|
|Surface Base|`surface-base`|
|Surface Inverse|`surface-inverse`|
|Text Primary|`text-primary`|
|Text Muted|`text-muted`|
|Text Inverse|`text-inverse`|

**Semantic colours:** `semantic-success-*`, `semantic-error-*`, `semantic-warning-*`, `semantic-info-*` (base and surface variants).

**Glass tokens:** `glass-surface-light`, `glass-surface-medium`, `glass-border`, `glass-shadow` – no `backdrop-filter`.

---

## Typography

### English Font Stack

|Role|Token|Font Family|
|---|---|---|
|Headings|`font-display`|Cormorant Garamond, Georgia, serif|
|Body / UI|`font-body`|Inter, system-ui, sans-serif|
|Quotes|`font-quote`|Cormorant Upright, serif|

### Sinhala Font Stack

|Role|Token|Font Family|
|---|---|---|
|Headings|`font-sinhala-display`|Maname, Noto Serif Sinhala, serif|
|Body|`font-sinhala-body`|Noto Serif Sinhala, serif|

### Tamil Font Stack

|Role|Token|Font Family|
|---|---|---|
|Headings|`font-tamil-display`|Noto Serif Tamil, serif|
|Body|`font-tamil-body`|Noto Serif Tamil, serif|

### Type Scale (Responsive, clamped)

|Token|Usage|
|---|---|
|`text-display`|Hero heading|
|`text-h1`|Page title|
|`text-h2`|Section heading|
|`text-body`|Paragraphs|
|`text-caption`|Fine print|

Complete scale (sizes, line heights, letter spacing) in Tokens Reference.

---

## Spacing & Grid

- Baseline: **4px**.
- Spacing tokens: `space-{n}` (n = number of 4px units). No arbitrary values.
- Breakpoints: `sm`(0px, 4 cols), `md`(768px, 8 cols), `lg`(1024px, 12 cols), `xl`(1280px, 12), `2xl`(1536px,12).
- Container max widths: `max-w-prose` (680px), `max-w-content` (960px), `max-w-wide` (1200px).

---

## Border Radius & Shadows

|Token|Value|Usage|
|---|---|---|
|`rounded-sm`|10px|Buttons, cards|
|`rounded-md`|15px|Modals|
|`rounded-lg`|20px|Hero containers|
|`rounded-full`|9999px|Avatars|

Shadows: `shadow-elevation-1` (buttons) to `shadow-elevation-5` (hero glass). See Tokens Reference.

---

## Motion & Animation

- **Framer Motion** – component-level (scroll reveals, hover, layout animations).
- **GSAP** – timeline-based sequences (crest drawing, page transitions).
- All durations and easings use tokens (e.g., `duration-fast`, `ease-out`).
- Respects `prefers-reduced-motion` via `useReducedMotion`.

---

## Accessibility

- WCAG 2.1 Level AA.
- Focus rings using `focus-ring-color` (gold), `focus-ring-width` (2px), `focus-ring-offset` (2px).
- Minimum touch target: 44×44px (`size-11`).
- Semantic HTML, ARIA labels, screen reader support.

---

## Component Library

Over 100 components built in `@nexus/ui`. Categories include:

- **Navigation** – Navbar, Footer, Breadcrumb, MobileMenu, LanguageSwitcher.
- **Layout** – Container, Grid, Stack, Drawer, Hero.
- **Cards** – NewsCard, StaffCard, SocietyCard, StatCard, etc.
- **Forms** – Input, Select, Checkbox, FileUploadZone, FormValidationSummary.
- **Feedback** – Alert, Modal, Toast, EmptyState, LoadingSkeleton.
- **Data** – DataTable, Timeline, ResultsDisplay.
- **Media** – ImageFrame, VideoFrame, Lightbox, AudioPlayer.

All components are documented in `Component Reference.md` (or Storybook).

---

## Internationalisation

- Fully trilingual at launch — English, Sinhala, and Tamil (via next-intl) — every public page in all three languages, not an English-only launch with the others added later.
- All Sinhala and Tamil strings reviewed by a native speaker before launch; machine translation used for drafts only.
- Sinhala body line-height: `leading-relaxed`.
- Assume 30–40% text expansion for Sinhala.

---

## Performance Budgets

- Lighthouse Performance Score (mobile) ≥ 90.
- LCP < 2.5s, CLS < 0.1.
- Initial JS bundle < 200KB, CSS < 50KB.
- All images via `next/image`, WebP, lazy loading.

---

_The full design system, including all component specifications and design tokens, is maintained in the project repository._  
_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_