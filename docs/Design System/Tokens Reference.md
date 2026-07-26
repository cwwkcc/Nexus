This document is the **single source of truth for all token values** — colours, spacing, typography sizes, radii, shadows, motion, and everything else in the visual system. Foundations documents _usage rules and intent_; this document owns all numeric values. If the two ever conflict, this document takes precedence. Every value below is taken directly from `packages/tokens/src`, the package that generates the real CSS variables and Tailwind theme — not hand-copied, so it won't drift the way a manually maintained table does.

**Theme status:** the token _values_ below reflect the shipped light "parchment + forest" palette. The runtime theme-switching functions (`getDarkTheme()`, `getLightTheme()`) in `packages/tokens/src/themes/` both currently throw `"not implemented yet"` — only the static primitive/semantic values exist today; there is no working light/dark toggle yet, and `themes/high-contrast.ts` is a separate, also-unwired stub.

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

The `forest` ramp is light-dominant (parchment/cream surfaces, warm-ink text) and runs light→dark, `50`→`900`. It was previously dark-native running the opposite direction (`900`→`100`); the ramp direction flipped when the shipped theme moved from dark to light.

| Token         | Value                   | Notes                                                   |
| ------------- | ----------------------- | ------------------------------------------------------- |
| `forest-50`   | `#FBF9F2`               | Parchment paper — lightest, base page floor             |
| `forest-100`  | `#F5EFE0`               | Warm cream — default surface                            |
| `forest-200`  | `#EDE6D0`               | Deeper cream — recessed/"deep" panel                    |
| `forest-300`  | `#DCEADE`               | Pale leaf mint — canopy accent surface ("forest glass") |
| `forest-400`  | `#B8CDB8`               | Pale sage — borders, dividers, disabled fills           |
| `forest-500`  | `#8FA898`               | Sage — muted/placeholder text, subtle borders           |
| `forest-600`  | `#5C7A68`               | Mid forest green — secondary text, hover accents        |
| `forest-700`  | `#3D5C52`               | Dark forest green — headings, strong accents            |
| `forest-800`  | `#1F3B32`               | Deep forest — near-primary text                         |
| `forest-900`  | `#1C1A16`               | Warm near-black ink — primary text                      |
| `green-base`  | `#1A4A2E`               | Brand green, base                                       |
| `green-light` | `#8EB69B`               | Brand green, light (visibly lighter hover state)        |
| `gold-base`   | `#C9973A`               |                                                         |
| `gold-light`  | `#E8B84B`               |                                                         |
| `gold-pale`   | `#F2D98A`               |                                                         |
| `gold-hover`  | `#D6A645`               |                                                         |
| `gold-active` | `#B7852F`               |                                                         |
| `gold-glow`   | `rgba(201,151,58,0.32)` |                                                         |

### Semantic Colours

Each status colour has a `base` (for text/icons/borders) and a `surface` — a light wash at 12% opacity, appropriate for a light background.

| Token                      | Value                   |
| -------------------------- | ----------------------- |
| `semantic-success-base`    | `#3E8F5E`               |
| `semantic-success-surface` | `rgba(62,143,94,0.12)`  |
| `semantic-error-base`      | `#C24A4A`               |
| `semantic-error-surface`   | `rgba(194,74,74,0.12)`  |
| `semantic-warning-base`    | `#B7852F`               |
| `semantic-warning-surface` | `rgba(183,133,47,0.12)` |
| `semantic-info-base`       | `#3E7EA8`               |
| `semantic-info-surface`    | `rgba(62,126,168,0.12)` |

### Surface Tokens

| Token              | Value                    | Notes                                            |
| ------------------ | ------------------------ | ------------------------------------------------ |
| `surface-base`     | `forest-50` (`#FBF9F2`)  | Page floor                                       |
| `surface-default`  | `forest-100` (`#F5EFE0`) | Default card surface                             |
| `surface-deep`     | `forest-200` (`#EDE6D0`) | Recessed panel                                   |
| `surface-elevated` | `#FFFFFF`                | Modals/popovers — pure white, pops off parchment |
| `surface-canopy`   | `forest-300` (`#DCEADE`) | Pale leaf-mint accent surface ("forest glass")   |
| `surface-inverse`  | `forest-900` (`#1C1A16`) | Dark surface for chips/badges on a light page    |
| `surface-hover`    | `#F0E9D8`                | Subtle tint lift between default and deep        |
| `surface-active`   | `forest-200` (`#EDE6D0`) | Pressed/active — same as deep                    |
| `surface-disabled` | `forest-100` (`#F5EFE0`) | Disabled = default surface                       |

### Text Tokens

| Token          | Value                    |
| -------------- | ------------------------ |
| `text-primary` | `forest-900` (`#1C1A16`) |
| `text-heading` | `forest-800` (`#1F3B32`) |
| `text-muted`   | `forest-700` (`#3D5C52`) |
| `text-subtle`  | `forest-600` (`#5C7A68`) |
| `text-inverse` | `forest-50` (`#FBF9F2`)  |
| `text-gold`    | `gold-base` (`#C9973A`)  |

`text-heading` and `text-subtle` are real, distinct tokens — not aliases of `primary`/`muted` — and both are new since the palette flip: headings read a shade darker/richer than body text, and `subtle` sits between `muted` and a disabled state for tertiary/placeholder copy.

### Border & Overlay Tokens

| Token              | Value                   |
| ------------------ | ----------------------- |
| `border-default`   | `rgba(28,26,22,0.10)`   |
| `border-light`     | `rgba(28,26,22,0.06)`   |
| `border-strong`    | `rgba(28,26,22,0.18)`   |
| `border-highlight` | `rgba(255,255,255,0.6)` |
| `overlay-light`    | `rgba(28,26,22,0.20)`   |
| `overlay-medium`   | `rgba(28,26,22,0.45)`   |
| `overlay-heavy`    | `rgba(15,13,10,0.72)`   |

### State Tokens

| Token              | Value                    | Used For            |
| ------------------ | ------------------------ | ------------------- |
| `surface-hover`    | `#F0E9D8`                | Interactive hover   |
| `surface-active`   | `forest-200` (`#EDE6D0`) | Pressed state       |
| `surface-disabled` | `forest-100` (`#F5EFE0`) | Disabled elements   |
| `opacity-disabled` | `0.5`                    | Disabled text/icons |
| `opacity-loading`  | `0.6`                    | Loading overlay     |

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

The Tailwind `fontFamily` theme stacks these CSS variables together per role (e.g. `display` = `var(--font-display)` → `var(--font-sinhala-display)` → `var(--font-tamil-display)` → `Georgia` → `serif`), so the browser resolves the correct script automatically — see ADR-008.

### Font Sizes

All sizes are responsive (clamped) unless marked fixed. The clamp formula used throughout is `clamp(<min>, <min-rem> + <fluid-vw>, <max>)`, not a flat vw-only formula.

| Token            | Value                                       | Fixed? |
| ---------------- | ------------------------------------------- | ------ |
| `text-display`   | `clamp(2.25rem, 1.75rem + 2.5vw, 4rem)`     | No     |
| `text-h1`        | `clamp(2rem, 1.61rem + 1.94vw, 3.36rem)`    | No     |
| `text-h2`        | `clamp(1.75rem, 1.45rem + 1.5vw, 2.8rem)`   | No     |
| `text-h3`        | `clamp(1.5rem, 1.26rem + 1.19vw, 2.33rem)`  | No     |
| `text-h4`        | `clamp(1.3rem, 1.12rem + 0.91vw, 1.94rem)`  | No     |
| `text-h5`        | `clamp(1.15rem, 1.04rem + 0.57vw, 1.55rem)` | No     |
| `text-h6`        | `clamp(1rem, 0.93rem + 0.36vw, 1.25rem)`    | No     |
| `text-pullquote` | `clamp(1.2rem, 1.09rem + 0.57vw, 1.6rem)`   | No     |
| `text-body`      | `1.05rem`                                   | Yes    |
| `text-body-sm`   | `0.87rem`                                   | Yes    |
| `text-label`     | `0.83rem`                                   | Yes    |
| `text-label-sm`  | `0.83rem`                                   | Yes    |
| `text-eyebrow`   | `0.75rem`                                   | Yes    |
| `text-caption`   | `0.69rem`                                   | Yes    |
| `text-code`      | `0.9em`                                     | Yes    |

`text-label` and `text-label-sm` are intentionally identical today (`0.83rem`) — kept as separate tokens so components can reach for the size-context-appropriate name without implying the two will always match.

**Sinhala and Tamil variants exist for every row above** (`text-sinhala-h1`, `text-tamil-h1`, and so on through display/h1–h6/pullquote/body/body-sm/label/label-sm/eyebrow/caption/code). Each script mirrors the English physical size exactly but carries its own line-height, letter-spacing, and font-weight tuned for that script's readability — for example, Sinhala and Tamil headings use a looser line-height (`1.15`–`1.3`) than the English equivalent (`1.05`–`1.2`), and body copy uses `1.8` instead of English's `1.7`. These per-script values are bundled directly into each font-size token rather than pulled from the shared Line Heights/Letter Spacing tables below.

### Line Heights

| Token               | Value  |
| ------------------- | ------ |
| `leading-tight`     | `1`    |
| `leading-snug`      | `1.08` |
| `leading-normal`    | `1.6`  |
| `leading-relaxed`   | `1.7`  |
| `leading-loose`     | `1.3`  |
| `leading-display`   | `1`    |
| `leading-h1`        | `1.05` |
| `leading-h2`        | `1.08` |
| `leading-h3`        | `1.12` |
| `leading-h4`        | `1.15` |
| `leading-h5`        | `1.2`  |
| `leading-h6`        | `1.3`  |
| `leading-pullquote` | `1.3`  |
| `leading-body`      | `1.7`  |
| `leading-body-sm`   | `1.6`  |
| `leading-label`     | `1.4`  |
| `leading-label-sm`  | `1.4`  |
| `leading-eyebrow`   | `1.4`  |
| `leading-caption`   | `1.4`  |

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

Sinhala and Tamil each have their own, tighter `tracking-*` scale (`open`/`wide`/`extended` at `0.04em`/`0.08em`/`0.12em` rather than English's `0.08em`/`0.15em`/`0.25em`) — the wider English tracking values don't suit those scripts.

### Font Weights

| Token           | Value |
| --------------- | ----- |
| `font-normal`   | `400` |
| `font-medium`   | `500` |
| `font-semibold` | `600` |

---

## 3. Spacing Tokens

All `space-*` tokens are in 4px increments, running from `space-0` (`0px`) up to `space-96` (`384px`), plus a full mirrored set of negative values (`space-neg-1` through `space-neg-96`) for negative margins.

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

The scale continues at the same 4px step all the way to `space-96` (`384px`) — only the commonly-used range is reproduced above. Every positive value also has a `space-neg-*` counterpart of the same magnitude, negated.

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

Beyond the fixed-pixel scale, `sizing` also includes viewport-fraction tokens (`size-screen-w-5` … `size-screen-w-100` in 5% steps, and the `-h-` equivalents for viewport height), common fraction tokens (`size-1-2`, `size-1-3`, `size-1-12`, and so on through twelfths), percentage tokens (`size-pct-5` … `size-pct-100`), and semantic keywords (`size-full`, `size-min`, `size-max`, `size-fit`, `size-auto`).

---

## 5. Container Max‑Width Tokens

| Token           | Value    | Usage                                      |
| --------------- | -------- | ------------------------------------------ |
| `max-w-prose`   | `680px`  | Reading width (articles, long‑form)        |
| `max-w-content` | `960px`  | Default container                          |
| `max-w-wide`    | `1200px` | Large containers (hero, featured sections) |
| `max-w-full`    | `100%`   | Full-bleed container                       |

---

## 6. Border Width Tokens

| Token            | Value |
| ---------------- | ----- |
| `border-DEFAULT` | `1px` |
| `border-none`    | `0px` |
| `border-sm`      | `1px` |
| `border-md`      | `2px` |
| `border-lg`      | `4px` |
| `border-xl`      | `6px` |
| `border-2xl`     | `8px` |

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

| Token                | Value                                                               |
| -------------------- | ------------------------------------------------------------------- |
| `shadow-elevation-0` | `none`                                                              |
| `shadow-elevation-1` | `0 2px 4px rgba(28,26,22,0.08)`                                     |
| `shadow-elevation-2` | `0 8px 20px rgba(28,26,22,0.12)`                                    |
| `shadow-elevation-3` | `0 16px 40px rgba(28,26,22,0.15)`                                   |
| `shadow-elevation-4` | `0 24px 64px rgba(28,26,22,0.18)`                                   |
| `shadow-elevation-5` | `0 32px 80px rgba(28,26,22,0.22)`                                   |
| `shadow-elevation-6` | `0 48px 120px rgba(28,26,22,0.26)`                                  |
| `glass-shadow`       | `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(218,241,222,0.06)` |
| `glass-shadow-heavy` | `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(218,241,222,0.08)` |

`glass-shadow` and `glass-shadow-heavy` are their own dedicated values, not aliases of an elevation step — see section 9.

---

## 9. Glass Tokens

| Token                    | Value                                                               | Usage                               |
| ------------------------ | ------------------------------------------------------------------- | ----------------------------------- |
| `surface-glass`          | `rgba(255,255,255,0.55)`                                            | Default glass panel                 |
| `surface-glass-subtle`   | `rgba(255,255,255,0.35)`                                            | Lightest glass                      |
| `surface-glass-medium`   | `rgba(255,255,255,0.55)`                                            | Same as default today               |
| `surface-glass-card`     | `rgba(255,255,255,0.70)`                                            | Denser glass, for cards             |
| `surface-glass-canopy`   | `rgba(220,234,222,0.45)`                                            | Glass tinted with the canopy accent |
| `glass-border`           | `rgba(28,26,22,0.08)`                                               | Glass panel border                  |
| `glass-border-highlight` | `rgba(255,255,255,0.5)`                                             | Top/left edge highlight on glass    |
| `glass-shadow`           | `0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(218,241,222,0.06)` | Glass panel shadow                  |
| `glass-shadow-heavy`     | `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(218,241,222,0.08)` | Heavier glass shadow                |

**Important:** Glass never uses `backdrop-filter`. These tokens (opacity + shadow only) enforce that.

---

## 10. Z‑Index Tokens

| Token        | Value |
| ------------ | ----- |
| `z-base`     | `0`   |
| `z-raised`   | `10`  |
| `z-dropdown` | `100` |
| `z-sticky`   | `200` |
| `z-overlay`  | `300` |
| `z-modal`    | `400` |
| `z-toast`    | `500` |
| `z-loading`  | `900` |

`z-dropdown` (`100`) sits **below** `z-sticky` (`200`) — if this reads backwards from what you remember, that's because it was swapped at some point from an earlier draft; the values above are what's actually in `packages/tokens`.

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

> **Note:** Blur filters are **never** used for glass panels. Glass uses opacity and shadows only (section 9).

---

## 13. Aspect Ratio Tokens

| Token             | Value    | Usage                 |
| ----------------- | -------- | --------------------- |
| `aspect-hero`     | `16 / 9` | Hero images           |
| `aspect-portrait` | `3 / 4`  | Staff profiles        |
| `aspect-square`   | `1 / 1`  | Gallery thumbnails    |
| `aspect-news`     | `4 / 3`  | News cards            |
| `aspect-event`    | `16 / 7` | Event featured images |

---

## 14. Transform Scale Tokens

| Token              | Value  | Usage               |
| ------------------ | ------ | ------------------- |
| `scale-press`      | `0.98` | Button active state |
| `scale-card-hover` | `1.02` | Card hover lift     |

The full numeric scale (`scale-0`, `scale-50`, `scale-75`, `scale-90`, `scale-95`, `scale-100`, `scale-105`, `scale-110`, `scale-125`, `scale-150`) is also available for one-off transforms outside these two named semantic uses.

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
| `xs`  | `480px`  |
| `sm`  | `640px`  |
| `md`  | `768px`  |
| `lg`  | `1024px` |
| `xl`  | `1280px` |
| `2xl` | `1536px` |

There are six breakpoints, not five — `xs` (`480px`) exists alongside `sm` and is easy to miss.

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
