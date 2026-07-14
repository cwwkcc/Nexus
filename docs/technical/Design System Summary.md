# Nexus — Design System Summary

**C.W.W. Kannangara Central College Digital Platform**

---

## Design Philosophy

**Thematic Concept:** _Stepping Into the Forest_ — an immersive journey from sunlit canopy to deep forest floor.

| Principle                     | Meaning                                                                |
| ----------------------------- | ---------------------------------------------------------------------- |
| **Heritage Before Trend**     | Built for a 153-year institution. Timeless over fashionable.           |
| **Forest Before Interface**   | Atmosphere guides layout. Interface serves the experience.             |
| **Glass Before Weight**       | Light, translucent, floating panels. No heavy blocks.                  |
| **Clarity Before Decoration** | Readability and usability first. Decoration only to reinforce meaning. |
| **Motion With Purpose**       | Animation communicates transitions, never distracts.                   |

---

## Visual Identity

### Color System

**Core Palette**

| Token         | Value                   | Usage                            |
| ------------- | ----------------------- | -------------------------------- |
| `green-base`  | `#1A4A2E`               | Primary institutional colour     |
| `green-light` | `#235C3A`               | Hover states, accents            |
| `gold-base`   | `#C9973A`               | Accent colour, links, highlights |
| `gold-light`  | `#E8B84B`               | Hover states for gold elements   |
| `gold-glow`   | `rgba(201,151,58,0.28)` | Subtle glow effects              |

**Surface Tokens**

| Token              | Value     | Usage              |
| ------------------ | --------- | ------------------ |
| `surface-base`     | `#E6F2EA` | Default background |
| `surface-default`  | `#D1E6D9` | Card backgrounds   |
| `surface-elevated` | `#F0F7F2` | Elevated surfaces  |
| `surface-inverse`  | `#0F2918` | Dark backgrounds   |

**Text Tokens**

| Token          | Value       | Usage                    |
| -------------- | ----------- | ------------------------ |
| `text-primary` | `#1C1A16`   | Primary body text        |
| `text-muted`   | `#4A5C4D`   | Secondary text           |
| `text-inverse` | `#F5EFE4`   | Text on dark backgrounds |
| `text-link`    | `gold-base` | Link colour              |

**Glass Tokens**

| Token                  | Value                        | Usage                 |
| ---------------------- | ---------------------------- | --------------------- |
| `glass-surface-light`  | `rgba(255,255,255,0.85)`     | Light floating panels |
| `glass-surface-medium` | `rgba(255,255,255,0.7)`      | Medium translucency   |
| `glass-border`         | `border-light` + `border-sm` | Glass panel border    |
| `glass-shadow`         | `shadow-elevation-2`         | Glass panel shadow    |

> **Important:** Glass **never** uses `backdrop-filter`. Glass is achieved through opacity and shadows only.

### Typography

**Font Stack (Unified Multilingual)**

```css
--font-family-display: 'Cormorant Garamond', 'Maname', 'Noto Serif Tamil', Georgia, serif;
--font-family-body: 'Inter', 'Noto Serif Sinhala', 'Noto Serif Tamil', system-ui, sans-serif;
```

| Script  | Display Font       | Body Font          | Quote Font        |
| ------- | ------------------ | ------------------ | ----------------- |
| English | Cormorant Garamond | Inter              | Cormorant Upright |
| Sinhala | Maname             | Noto Serif Sinhala | Maname            |
| Tamil   | Noto Serif Tamil   | Noto Serif Tamil   | Noto Serif Tamil  |

**Type Scale (Key Sizes)**

| Token          | Size                           | Usage            |
| -------------- | ------------------------------ | ---------------- |
| `text-display` | `clamp(3.86rem, 10vw, 4rem)`   | Hero heading     |
| `text-h1`      | `clamp(3.2rem, 7vw, 3.36rem)`  | Page title       |
| `text-h2`      | `clamp(2.4rem, 4.5vw, 2.8rem)` | Section heading  |
| `text-body`    | `1.05rem`                      | Paragraphs       |
| `text-label`   | `0.83rem`                      | Labels, metadata |
| `text-eyebrow` | `0.75rem`                      | All-caps labels  |
| `text-caption` | `0.69rem`                      | Fine print       |

**Line Heights**

| Token               | Value | Usage             |
| ------------------- | ----- | ----------------- |
| `leading-normal`    | `1.6` | Default           |
| `leading-relaxed`   | `1.8` | Sinhala body text |
| `leading-display`   | `1`   | Display text      |
| `leading-pullquote` | `1.3` | Pull quotes       |

### Spacing System

**Baseline:** 4px  
**All spacing tokens:** `space-{n}` where n = number of 4px units

| Token     | Value | Token      | Value |
| --------- | ----- | ---------- | ----- |
| `space-1` | 4px   | `space-6`  | 24px  |
| `space-2` | 8px   | `space-8`  | 32px  |
| `space-3` | 12px  | `space-10` | 40px  |
| `space-4` | 16px  | `space-12` | 48px  |
| `space-5` | 20px  | `space-16` | 64px  |

**Breakpoints (Mobile-first)**

| Breakpoint     | Min Width | Columns |
| -------------- | --------- | ------- |
| `sm` (default) | 0px       | 4       |
| `md`           | 768px     | 8       |
| `lg`           | 1024px    | 12      |
| `xl`           | 1280px    | 12      |
| `2xl`          | 1536px    | 12      |

---

## Component Architecture

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                          Pages                                  │
│                    (apps/web/src/app)                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Page Blocks                              │
│                  (apps/web/src/blocks)                          │
│  Home / About / Academics / Admissions / News / Events         │
│  Societies / Facilities / Extracurriculars / Gallery           │
│  Contact / Results / Administration                            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Shared UI Library                            │
│                     (packages/ui)                               │
│  Atoms → Cards → Forms → Layout → Navigation → Overlays        │
│  Media → Sections → Typography → Utilities → Visualization     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Design System Tokens                         │
│                   (packages/config)                             │
│  Colors / Typography / Spacing / Motion / Shadows / Glass      │
└─────────────────────────────────────────────────────────────────┘
```

### Key Components by Category

**Atoms** (Smallest building blocks)

- `Button`, `Badge`, `Avatar`, `Tag`, `InlineHelpText`
- `BeatLoader`, `ScaleLoader` (spinners)

**Brand** (Institutional identity)

- `CrestAnimation` (animated crest — defining visual)
- `CrestDiagram` (interactive crest explainer)
- `SchoolLogo` (multiple variants)

**Cards** (Primary content containers)

- `NewsCard`, `StaffCard`, `EventCard`, `SocietyCard`
- `FacilityCard`, `GalleryAlbumCard`, `AcademicStreamCard`
- `AchievementCard`, `ExtracurricularCard`, `StatCard`

**Forms** (Complete form system)

- `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`, `Toggle`
- `FileUploadZone`, `Calendar`, `FormValidationSummary`

**Layout** (Structural)

- `Container`, `Grid`, `Hero`, `Navigation`, `Footer`
- `Stack`, `MasonryGrid`, `QuickAccessPortal`

**Navigation** (Wayfinding)

- `Breadcrumb`, `FilterBar`, `LanguageSwitcher`, `Pagination`
- `SearchInput`, `TableOfContents`, `Tabs`

**Overlays** (Modals and popups)

- `Modal`, `Drawer`, `DropDownMenu`, `ShareSheet`, `ToolTip`

**Media** (Rich media)

- `AudioPlayer` (school anthem with visualiser)
- `ImageFrame`, `Lightbox`, `VideoFrame`, `MapEmbed`
- `PanoramicFacilityViewer`

**Sections** (Composite blocks)

- `StatsStrip`, `PrincipalMessage`, `AlumniLegacyBlock`
- `AchievementTicker`, `LifeAtKCCPhotoStrip`

**Visualization** (Data display)

- `DataTable`, `ResultsDisplay`, `ComparisonBar`
- `StreamComparisonTable`, `StudentJourneyFlow`

---

## Motion System

### Duration Tokens

| Token                 | Value  | Usage                                |
| --------------------- | ------ | ------------------------------------ |
| `duration-instant`    | 80ms   | Micro-interactions                   |
| `duration-fast`       | 150ms  | Button feedback, hover               |
| `duration-standard`   | 300ms  | Page transitions, card reveals       |
| `duration-gentle`     | 500ms  | Scroll-triggered animations          |
| `duration-slow`       | 800ms  | Complex animations                   |
| `duration-ceremonial` | 1200ms | Crest animation, special events      |
| `duration-epic`       | 2400ms | Loading screen, ceremonial sequences |

### Easing Tokens

| Token             | Value                               | Usage             |
| ----------------- | ----------------------------------- | ----------------- |
| `ease-snap`       | `cubic-bezier(0.25, 0, 0, 1)`       | Buttons, toggles  |
| `ease-out`        | `cubic-bezier(0.0, 0, 0.2, 1)`      | Standard easing   |
| `ease-in-out`     | `cubic-bezier(0.4, 0, 0.2, 1)`      | Page transitions  |
| `ease-ceremonial` | `cubic-bezier(0.16, 1, 0.3, 1)`     | Special sequences |
| `ease-ember`      | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Ambient particles |

### Transform Tokens

| Token              | Value  | Usage               |
| ------------------ | ------ | ------------------- |
| `scale-press`      | `0.98` | Button active state |
| `scale-card-hover` | `1.02` | Card hover lift     |

### Animation Philosophy

1. **Respect reduced motion:** All animations check `prefers-reduced-motion`
2. **Purposeful motion:** Animation communicates transitions, never distracts
3. **Institutional character:** Deliberate and dignified — not playful, not instant
4. **Framer Motion:** Component-level micro-interactions
5. **GSAP:** Timeline-based ceremonial sequences (crest drawing, page transitions)

---

## Accessibility Standards

Nexus targets **WCAG 2.1 Level AA**.

### Key Requirements

| Area                    | Standard                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------- |
| **Focus Ring**          | Gold 2px offset ring (`focus-ring-color`, `focus-ring-width`, `focus-ring-offset`) |
| **Keyboard Navigation** | All interactive elements reachable and operable                                    |
| **Screen Readers**      | Semantic HTML, `aria-label`/`aria-labelledby`, `sr-only` utility                   |
| **Colour Contrast**     | Normal text ≥4.5:1; Large text ≥3:1                                                |
| **Reduced Motion**      | `useReducedMotion` hook; skip non-essential animations                             |
| **Touch Targets**       | Minimum hit area 44×44px (all interactive elements)                                |

### Touch Target Requirements

| Element          | Requirement                          |
| ---------------- | ------------------------------------ |
| Buttons          | Minimum 44×44px (`size="md"`)        |
| Icon Buttons     | Minimum 44×44px with `aria-label`    |
| Navigation Links | Padding to reach 44px height         |
| Menu Items       | Minimum 44px height                  |
| Form Controls    | Label click area + control meet 44px |

**Exception:** Inline links in body text may be smaller but must have sufficient surrounding spacing.

---

## Image Standards

### Aspect Ratios (Tokens)

| Token             | Ratio | Usage                 |
| ----------------- | ----- | --------------------- |
| `aspect-hero`     | 16:9  | Hero images           |
| `aspect-news`     | 16:9  | News cards            |
| `aspect-portrait` | 3:4   | Staff profiles        |
| `aspect-square`   | 1:1   | Gallery thumbnails    |
| `aspect-event`    | 16:7  | Event featured images |

### Technical Standards

- `next/image` for all images
- `width`, `height`, `sizes` attributes required
- Lazy loading below-the-fold (`loading="lazy"`)
- WebP format with fallback
- Blur placeholders for progressive loading

### Photography Guidelines

- Natural lighting preferred
- Real students — no stock photography
- Showcase actual campus
- No heavy filters or artificial HDR

---

## Page States

| State              | Component             | Description                               |
| ------------------ | --------------------- | ----------------------------------------- |
| **Loading**        | `LoadingSkeleton`     | Shimmer placeholders for content areas    |
| **Loading (Page)** | `LoadingScreen`       | Full-page with CrestAnimation             |
| **Empty**          | `EmptyState`          | "No content yet" with next action         |
| **Error**          | `ErrorState`          | "Something went wrong" with retry         |
| **404**            | `NotFoundPage`        | Designed 404 with institutional treatment |
| **Offline**        | `OfflineBanner`       | Connectivity lost notification            |
| **Cookie Consent** | `CookieConsentBanner` | GDPR-compliant consent banner             |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**
