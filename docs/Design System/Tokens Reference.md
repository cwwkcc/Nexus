This document is the **single source of truth for all token values** — colours, spacing, typography sizes, radii, shadows, motion, and everything else in the visual system. Foundations documents _usage rules and intent_; this document owns all numeric values. If the two ever conflict, this document takes precedence.

---

## Table of Contents

1. [Colour Tokens]
   - Core Palette
   - Semantic Colours
   - Surface Tokens
   - Text Tokens
   - Border & Overlay Tokens
   - State Tokens
2. [Typography Tokens]
   - Font Families
   - Font Sizes
   - Line Heights
   - Letter Spacing
   - Font Weights
3. [Spacing Tokens]
4. [Sizing Tokens]
5. [Container Max‑Width Tokens]
6. [Border Width Tokens]
7. [Border Radius Tokens]
8. [Shadow Tokens]
9. [Glass Tokens]
10. [Z‑Index Tokens]
11. [Opacity Tokens]
12. [Blur Tokens]
13. [Aspect Ratio Tokens]
14. [Transform Scale Tokens]
15. [Motion Tokens]
    - Duration
    - Easing
16. [Breakpoint Tokens]
17. [Icon Size Tokens]
18. [Focus Ring Tokens]
19. [Appendix: Component Utilities (Not Tokens)]

---

## 1. Colour Tokens

### Core Palette

| Token         | Value                    | Notes |
| ------------- | ------------------------ | ----- |
| `green-base`  | `#1A4A2E`                |       |
| `green-light` | `#235C3A`                |       |
| `green-hover` | references `green-light` |       |
| `gold-base`   | `#C9973A`                |       |
| `gold-light`  | `#E8B84B`                |       |
| `gold-pale`   | `#F2D98A`                |       |
| `gold-hover`  | `#D6A645`                |       |
| `gold-active` | `#B7852F`                |       |
| `gold-glow`   | `rgba(201,151,58,0.28)`  |       |

### Semantic Colours

| Token                      | Value     |
| -------------------------- | --------- |
| `semantic-success-base`    | `#3F6B4B` |
| `semantic-success-surface` | `#E6F0E8` |
| `semantic-error-base`      | `#8A3B32` |
| `semantic-error-surface`   | `#F6E8E5` |
| `semantic-warning-base`    | `#B07A2B` |
| `semantic-warning-surface` | `#FAF1DE` |
| `semantic-info-base`       | `#4A6475` |
| `semantic-info-surface`    | `#EAF0F4` |

### Surface Tokens

| Token              | Value     |
| ------------------ | --------- |
| `surface-base`     | `#E6F2EA` |
| `surface-default`  | `#D1E6D9` |
| `surface-deep`     | `#BEE0C9` |
| `surface-elevated` | `#F0F7F2` |
| `surface-inverse`  | `#0F2918` |

### Text Tokens

| Token             | Value        |
| ----------------- | ------------ |
| `text-primary`    | `#1C1A16`    |
| `text-muted`      | `#4A5C4D`    |
| `text-inverse`    | `#F5EFE4`    |
| `text-link`       | `gold-base`  |
| `text-link-hover` | `gold-hover` |

### Border & Overlay Tokens

| Token            | Value                 |
| ---------------- | --------------------- |
| `border-default` | `#D4C9B8`             |
| `border-light`   | `#E2D9CC`             |
| `border-focus`   | `gold-base`           |
| `border-error`   | `semantic-error-base` |
| `overlay-light`  | `rgba(28,26,22,0.32)` |
| `overlay-medium` | `rgba(28,26,22,0.56)` |
| `overlay-heavy`  | `rgba(28,26,22,0.78)` |

### State Tokens

| Token              | Value                         | Used For            |
| ------------------ | ----------------------------- | ------------------- |
| `surface-hover`    | `surface-default` (`#D1E6D9`) | Interactive hover   |
| `surface-active`   | `surface-deep` (`#BEE0C9`)    | Pressed state       |
| `surface-disabled` | `surface-base` (`#E6F2EA`)    | Disabled elements   |
| `opacity-disabled` | `0.5`                         | Disabled text/icons |
| `opacity-loading`  | `0.6`                         | Loading overlay     |

---

## 2. Typography Tokens

### Font Families (CSS custom properties)

| Token                    | Value                                              |
| ------------------------ | -------------------------------------------------- |
| `--font-display`         | `'Cormorant Garamond', Georgia, serif`             |
| `--font-body`            | `'Inter', system-ui, -apple-system, sans-serif`    |
| `--font-quote`           | `'Cormorant Upright', 'Cormorant Garamond', serif` |
| `--font-sinhala-display` | `'Maname', 'Noto Serif Sinhala', serif`            |
| `--font-sinhala-body`    | `'Noto Serif Sinhala', serif`                      |
| `--font-mono`            | `'IBM Plex Mono', Menlo, monospace`                |

### Font Sizes

All sizes are responsive (clamped) unless marked fixed.

| Token               | Value                            | Fixed? |
| ------------------- | -------------------------------- | ------ |
| `text-display`      | `clamp(3.86rem, 10vw, 4rem)`     | No     |
| `text-h1`           | `clamp(3.2rem, 7vw, 3.36rem)`    | No     |
| `text-h2`           | `clamp(2.4rem, 4.5vw, 2.8rem)`   | No     |
| `text-h3`           | `clamp(1.9rem, 2.8vw, 2.33rem)`  | No     |
| `text-h4`           | `clamp(1.55rem, 2vw, 1.94rem)`   | No     |
| `text-h5`           | `clamp(1.25rem, 1.6vw, 1.55rem)` | No     |
| `text-h6`           | `clamp(1rem, 1.25vw, 1.25rem)`   | No     |
| `text-pullquote`    | `clamp(1.35rem, 2.2vw, 1.6rem)`  | No     |
| `text-body`         | `1.05rem`                        | Yes    |
| `text-body-sm`      | `0.87rem`                        | Yes    |
| `text-label`        | `0.83rem`                        | Yes    |
| `text-label-sm`     | `0.83rem`                        | Yes    |
| `text-eyebrow`      | `0.75rem`                        | Yes    |
| `text-caption`      | `0.69rem`                        | Yes    |
| `text-code`         | `0.9em`                          | Yes    |
| `text-sinhala-h1`   | `clamp(3.2rem, 7vw, 3.36rem)`    | No     |
| `text-sinhala-h2`   | `clamp(2.4rem, 4.5vw, 2.8rem)`   | No     |
| `text-sinhala-body` | `1.05rem`                        | Yes    |

### Line Heights

| Token               | Value                                       |
| ------------------- | ------------------------------------------- |
| `leading-tight`     | `1`                                         |
| `leading-snug`      | `1.08`                                      |
| `leading-normal`    | `1.6`                                       |
| `leading-relaxed`   | `1.8` (updated from 1.7 to support Sinhala) |
| `leading-loose`     | `2.0` (corrected from 1.3)                  |
| `leading-display`   | `1`                                         |
| `leading-h1`        | `1.05`                                      |
| `leading-h2`        | `1.08`                                      |
| `leading-h3`        | `1.12`                                      |
| `leading-h4`        | `1.15`                                      |
| `leading-pullquote` | `1.3`                                       |
| `leading-body`      | `1.7`                                       |
| `leading-body-sm`   | `1.6`                                       |
| `leading-label`     | `1.4`                                       |
| `leading-label-sm`  | `1.4`                                       |
| `leading-eyebrow`   | `1.4`                                       |
| `leading-caption`   | `1.4`                                       |

### Letter Spacing

| Token               | Value     |
| ------------------- | --------- |
| `tracking-tight`    | `-0.02em` |
| `tracking-normal`   | `0em`     |
| `tracking-open`     | `0.08em`  |
| `tracking-wide`     | `0.15em`  |
| `tracking-extended` | `0.25em`  |
| `tracking-eyebrow`  | `0.25em`  |
| `tracking-label`    | `0.15em`  |
| `tracking-label-sm` | `0.15em`  |
| `tracking-caption`  | `0.08em`  |

### Font Weights

| Token           | Value |
| --------------- | ----- |
| `font-normal`   | `400` |
| `font-medium`   | `500` |
| `font-semibold` | `600` |

---

## 3. Spacing Tokens

All `space-*` tokens are in 4px increments.

| Token       | Value  | Token      | Value   |
| ----------- | ------ | ---------- | ------- |
| `space-0`   | `0px`  | `space-21` | `84px`  |
| `space-0p5` | `2px`  | `space-22` | `88px`  |
| `space-1`   | `4px`  | `space-23` | `92px`  |
| `space-1p5` | `6px`  | `space-24` | `96px`  |
| `space-2`   | `8px`  | `space-25` | `100px` |
| `space-2p5` | `10px` | `space-26` | `104px` |
| `space-3`   | `12px` | `space-27` | `108px` |
| `space-4`   | `16px` | `space-28` | `112px` |
| `space-5`   | `20px` | `space-29` | `116px` |
| `space-6`   | `24px` | `space-30` | `120px` |
| `space-7`   | `28px` | `space-31` | `124px` |
| `space-8`   | `32px` | `space-32` | `128px` |
| `space-9`   | `36px` | `space-33` | `132px` |
| `space-10`  | `40px` | `space-34` | `136px` |
| `space-11`  | `44px` | `space-35` | `140px` |
| `space-12`  | `48px` | `space-36` | `144px` |
| `space-13`  | `52px` | `space-37` | `148px` |
| `space-14`  | `56px` | `space-38` | `152px` |
| `space-15`  | `60px` | `space-39` | `156px` |
| `space-16`  | `64px` | `space-40` | `160px` |
| `space-17`  | `68px` |            |         |
| `space-18`  | `72px` |            |         |
| `space-19`  | `76px` |            |         |
| `space-20`  | `80px` |            |         |

---

## 4. Sizing Tokens

Used for `width`, `height`, `min-*`, `max-*`.

| Token      | Value   | Token      | Value    |
| ---------- | ------- | ---------- | -------- |
| `size-0`   | `0px`   | `size-40`  | `160px`  |
| `size-px`  | `1px`   | `size-44`  | `176px`  |
| `size-0p5` | `2px`   | `size-48`  | `192px`  |
| `size-1`   | `4px`   | `size-56`  | `224px`  |
| `size-1p5` | `6px`   | `size-60`  | `240px`  |
| `size-2`   | `8px`   | `size-64`  | `256px`  |
| `size-2p5` | `10px`  | `size-68`  | `272px`  |
| `size-3`   | `12px`  | `size-72`  | `288px`  |
| `size-3p5` | `14px`  | `size-76`  | `304px`  |
| `size-4`   | `16px`  | `size-80`  | `320px`  |
| `size-5`   | `20px`  | `size-84`  | `336px`  |
| `size-6`   | `24px`  | `size-88`  | `352px`  |
| `size-7`   | `28px`  | `size-92`  | `368px`  |
| `size-8`   | `32px`  | `size-96`  | `384px`  |
| `size-9`   | `36px`  | `size-100` | `400px`  |
| `size-10`  | `40px`  | `size-104` | `416px`  |
| `size-11`  | `44px`  | `size-108` | `432px`  |
| `size-12`  | `48px`  | `size-112` | `448px`  |
| `size-13`  | `52px`  | `size-116` | `464px`  |
| `size-14`  | `56px`  | `size-120` | `480px`  |
| `size-15`  | `60px`  | `size-128` | `512px`  |
| `size-16`  | `64px`  | `size-136` | `544px`  |
| `size-20`  | `80px`  | `size-144` | `576px`  |
| `size-22`  | `88px`  | `size-152` | `608px`  |
| `size-24`  | `96px`  | `size-160` | `640px`  |
| `size-26`  | `104px` | `size-168` | `672px`  |
| `size-28`  | `112px` | `size-176` | `704px`  |
| `size-30`  | `120px` | `size-180` | `720px`  |
| `size-32`  | `128px` | `size-192` | `768px`  |
| `size-34`  | `136px` | `size-200` | `800px`  |
| `size-36`  | `144px` | `size-210` | `840px`  |
| `size-38`  | `152px` | `size-220` | `880px`  |
|            |         | `size-225` | `900px`  |
|            |         | `size-240` | `960px`  |
|            |         | `size-256` | `1024px` |
|            |         | `size-280` | `1120px` |
|            |         | `size-300` | `1200px` |
|            |         | `size-320` | `1280px` |
|            |         | `size-360` | `1440px` |
|            |         | `size-384` | `1536px` |

---

## 5. Container Max‑Width Tokens

| Token           | Value    | Usage                                      |
| --------------- | -------- | ------------------------------------------ |
| `max-w-prose`   | `680px`  | Reading width (articles, long‑form)        |
| `max-w-content` | `960px`  | Default container                          |
| `max-w-wide`    | `1200px` | Large containers (hero, featured sections) |

---

## 6. Border Width Tokens

| Token         | Value |
| ------------- | ----- |
| `border-none` | `0px` |
| `border-sm`   | `1px` |
| `border-md`   | `2px` |
| `border-lg`   | `4px` |
| `border-xl`   | `6px` |
| `border-2xl`  | `8px` |

---

## 7. Border Radius Tokens

| Token          | Value    | Notes                                                                      |
| -------------- | -------- | -------------------------------------------------------------------------- |
| `rounded-none` | `0px`    |                                                                            |
| `rounded-sm`   | `10px`   | Intentionally larger than typical Tailwind – supports soft‑glass aesthetic |
| `rounded-md`   | `15px`   |                                                                            |
| `rounded-lg`   | `20px`   |                                                                            |
| `rounded-full` | `9999px` |                                                                            |

---

## 8. Shadow Tokens

| Token                | Value                              |
| -------------------- | ---------------------------------- |
| `shadow-elevation-0` | `none`                             |
| `shadow-elevation-1` | `0 2px 4px rgba(28,26,22,0.08)`    |
| `shadow-elevation-2` | `0 8px 20px rgba(28,26,22,0.12)`   |
| `shadow-elevation-3` | `0 16px 40px rgba(28,26,22,0.15)`  |
| `shadow-elevation-4` | `0 24px 64px rgba(28,26,22,0.18)`  |
| `shadow-elevation-5` | `0 32px 80px rgba(28,26,22,0.22)`  |
| `shadow-elevation-6` | `0 48px 120px rgba(28,26,22,0.26)` |

---

## 9. Glass Tokens

| Token                  | Value                                         | Usage                 |
| ---------------------- | --------------------------------------------- | --------------------- |
| `glass-surface-light`  | `rgba(255,255,255,0.85)`                      | Light floating panels |
| `glass-surface-medium` | `rgba(255,255,255,0.7)`                       | Medium translucency   |
| `glass-border`         | `border-light` (colour) + `border-sm` (width) | Glass panel border    |
| `glass-shadow`         | `shadow-elevation-2`                          | Glass panel shadow    |

**Important:** Glass never uses `backdrop-filter`. These tokens enforce that.

---

## 10. Z‑Index Tokens

| Token        | Value |
| ------------ | ----- |
| `z-base`     | `0`   |
| `z-raised`   | `10`  |
| `z-sticky`   | `100` |
| `z-dropdown` | `200` |
| `z-overlay`  | `300` |
| `z-modal`    | `400` |
| `z-toast`    | `500` |
| `z-loading`  | `900` |

---

## 11. Opacity Tokens

| Token        | Value  | Token         | Value |
| ------------ | ------ | ------------- | ----- |
| `opacity-0`  | `0`    | `opacity-60`  | `0.6` |
| `opacity-5`  | `0.05` | `opacity-70`  | `0.7` |
| `opacity-10` | `0.1`  | `opacity-80`  | `0.8` |
| `opacity-20` | `0.2`  | `opacity-90`  | `0.9` |
| `opacity-30` | `0.3`  | `opacity-100` | `1`   |
| `opacity-40` | `0.4`  |               |       |
| `opacity-50` | `0.5`  |               |       |

---

## 12. Blur Tokens

| Token     | Value  | Permitted usage                                 |
| --------- | ------ | ----------------------------------------------- |
| `blur-xs` | `2px`  | Image effects, decorative glows, loading states |
| `blur-sm` | `4px`  | (same)                                          |
| `blur-md` | `8px`  | (same)                                          |
| `blur-lg` | `16px` | (same)                                          |

> **Note:** Blur filters are **never** used for glass panels. Glass uses opacity and shadows only.

---

## 13. Aspect Ratio Tokens

| Token             | Value    | Usage                 |
| ----------------- | -------- | --------------------- |
| `aspect-hero`     | `16 / 9` | Hero images           |
| `aspect-news`     | `16 / 9` | News cards            |
| `aspect-portrait` | `3 / 4`  | Staff profiles        |
| `aspect-square`   | `1 / 1`  | Gallery thumbnails    |
| `aspect-event`    | `16 / 7` | Event featured images |

---

## 14. Transform Scale Tokens

| Token              | Value  | Usage               |
| ------------------ | ------ | ------------------- |
| `scale-press`      | `0.98` | Button active state |
| `scale-card-hover` | `1.02` | Card hover lift     |

---

## 15. Motion Tokens

### Duration

| Token                 | Value    |
| --------------------- | -------- |
| `duration-instant`    | `80ms`   |
| `duration-fast`       | `150ms`  |
| `duration-standard`   | `300ms`  |
| `duration-gentle`     | `500ms`  |
| `duration-slow`       | `800ms`  |
| `duration-ceremonial` | `1200ms` |
| `duration-epic`       | `2400ms` |

### Easing

| Token             | Value                               |
| ----------------- | ----------------------------------- |
| `ease-snap`       | `cubic-bezier(0.25, 0, 0, 1)`       |
| `ease-out`        | `cubic-bezier(0.0, 0, 0.2, 1)`      |
| `ease-in-out`     | `cubic-bezier(0.4, 0, 0.2, 1)`      |
| `ease-ceremonial` | `cubic-bezier(0.16, 1, 0.3, 1)`     |
| `ease-ember`      | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## 16. Breakpoint Tokens

| Token | Value    |
| ----- | -------- |
| `sm`  | `0px`    |
| `md`  | `768px`  |
| `lg`  | `1024px` |
| `xl`  | `1280px` |
| `2xl` | `1536px` |

---

## 17. Icon Size Tokens

| Token     | Value  |
| --------- | ------ |
| `icon-sm` | `16px` |
| `icon-md` | `20px` |
| `icon-lg` | `24px` |
| `icon-xl` | `32px` |

---

## 18. Focus Ring Tokens

| Token               | Value       |
| ------------------- | ----------- |
| `focus-ring-color`  | `gold-base` |
| `focus-ring-width`  | `2px`       |
| `focus-ring-offset` | `2px`       |

---

## Appendix: Component Utilities (Not Tokens)

The following identifiers appear in Foundations but are **not design tokens** — they are components or CSS utility classes from `@nexus/ui`. They are listed here to avoid confusion.

| Identifier           | Type              | Description                                                                                      |
| -------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `input-base`         | CSS utility class | Shared base styles for `<input>`, `<select>`, and `<textarea>` elements. Applied via class name. |
| `FormFieldGroup`     | React component   | Layout wrapper for a single form field (label + input + error message).                          |
| `FormSectionWrapper` | React component   | Layout wrapper for a group of related `FormFieldGroup` elements within a form.                   |

These have no token values to define here. For their API and usage, see the component documentation in `Component Reference.md`.

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_
