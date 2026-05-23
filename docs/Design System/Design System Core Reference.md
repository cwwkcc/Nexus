This is a distilled version of `Foundations.md`, `Components.md`, and `Guidelines.md` – everything you need to ensure every component is token‑compliant.

### Philosophy (the test for every decision)
> **Royal Institution.** Not modern, not playful, not startup. Could this appear on any other school’s website? If yes, change it.

### Color Tokens (semantic, not raw)
| Category | Tokens |
|----------|--------|
| Primary | `green-base`, `green-hover`, `gold-base`, `gold-light`, `gold-pale`, `gold-hover`, `gold-active`, `gold-glow` |
| Surface | `surface-base` (cream, default), `surface-default`, `surface-deep`, `surface-elevated`, `surface-inverse` |
| Text | `text-primary`, `text-muted`, `text-inverse` |
| Border | `border-default`, `border-light` |
| Semantic | `success-base/surface`, `error-base/surface`, `warning-base/surface`, `info-base/surface` |
| Overlay | `overlay-light/medium/heavy` (uses `text-primary` as base with opacity) |
| Gradients (whitelist) | `bg-gradient-gold-subtle`, `bg-gradient-hero-deep`, `bg-gradient-overlay-fade`, `bg-gradient-radial-gold` |

**Rules:**
- No free hex values. Every color must be a token.
- Gold is **accent/ceremony** – never primary background or body text.
- Cream (`surface-base`) is default background – **no `#FFFFFF`**.
- Semantic colors are muted, never imported from Bootstrap/Material.

### Typography Tokens
| Token | Font | Size | Weight | Line Height | Tracking |
|-------|------|------|--------|-------------|----------|
| `type/display` | Cormorant Garamond | `clamp(4rem,10vw,9rem)` | 600 | 0.92 | -0.02em |
| `type/h1` | Cormorant Garamond | `clamp(3rem,7vw,6rem)` | 600 | 0.98 | -0.01em |
| `type/h2` | Cormorant Garamond | `clamp(2rem,4vw,3rem)` | 500 | 1.05 | 0 |
| `type/h3` | Cormorant Garamond | `clamp(1.35rem,2.2vw,1.85rem)` | 500 | 1.1 | 0 |
| `type/pullquote` | Cormorant Garamond | `clamp(1.2rem,2vw,1.6rem)` | 500 | 1.3 | 0.01em |
| `type/body` | Source Serif 4 | 1.05rem | 400 | 1.7 | 0 |
| `type/body-sm` | Source Serif 4 | 0.92rem | 400 | 1.6 | 0 |
| `type/label` | Source Serif 4 | 0.75rem | 500 | 1.4 | 0.15em |
| `type/eyebrow` | Source Serif 4 | 0.72rem | 500 | 1.4 | 0.28em |
| `type/caption` | Source Serif 4 | 0.7rem | 400 | 1.4 | 0.2em |

**Sinhala overrides:**
- Minimum body size: `1.12rem`
- Line height: `1.8` (body), `1.7` (small text)
- Font: `font/sinhala` (Noto Serif Sinhala)

**Rules:**
- No sans‑serif on public site.
- Weight 300 forbidden for UI labels / body copy below 20px.
- Uppercase text always has positive tracking.

### Spacing (4px scale)
Tokens: `space-1` (4px) up to `space-40` (160px).  
**Rule:** No arbitrary spacing. Every margin/padding/gap maps to a `space-*` token.

Common used:  
`space-2` (8px), `space-3` (12px), `space-4` (16px), `space-6` (24px), `space-8` (32px), `space-12` (48px), `space-16` (64px), `space-24` (96px).

### Motion Durations & Easing
| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 80ms | State feedback (checkbox, toggle) |
| `duration-fast` | 150ms | Hover states, button feedback |
| `duration-standard` | 300ms | Component transitions |
| `duration-gentle` | 500ms | Scroll reveals, card entries |
| `duration-slow` | 800ms | Section transitions |
| `duration-ceremonial` | 1200ms | Loading screen, crest animation |
| `duration-epic` | 2400ms | Full page intro |

| Easing | Curve | Character |
|--------|-------|-----------|
| `ease-snap` | `cubic-bezier(0.25,0,0,1)` | Quick settle |
| `ease-out` | `cubic-bezier(0,0,0.2,1)` | Arriving |
| `ease-in-out` | `cubic-bezier(0.4,0,0.2,1)` | Through space |
| `ease-ceremonial` | `cubic-bezier(0.16,1,0.3,1)` | Institutional reveals |
| `ease-ember` | `cubic-bezier(0.34,1.56,0.64,1)` | Organic overshoot (glow, shimmer) |

**Rules:**
- Utility pages (Results, Admin) use `instant` / `fast` only.
- Scroll reveals: `FadeIn + translateY(24px)` → `translateY(0)`, `duration-gentle` + `ease-out`.
- Hover states always `duration-fast`.
- Always respect `prefers-reduced-motion`.

### Elevation (Shadows)
| Token | Value |
|-------|-------|
| `elevation-0` | `none` |
| `elevation-1` | `0 1px 3px rgba(28,26,22,0.08)` |
| `elevation-2` | `0 4px 12px rgba(28,26,22,0.10)` |
| `elevation-3` | `0 8px 24px rgba(28,26,22,0.12)` |
| `elevation-4` | `0 16px 48px rgba(28,26,22,0.14)` |

**Rule:** No decorative shadows. Every shadow tied to a use case (card at rest = `elevation-1`, hover = `elevation-2`).

### Border Radius
- `radius-none` (0px) – architectural edges
- `radius-sm` (2px) – buttons, inputs
- `radius-md` (4px) – cards, panels (most common)
- `radius-lg` (8px) – modals, lightbox
- `radius-full` (9999px) – badges, avatars

### Z‑Index Tiers
`z-base` (0), `z-raised` (10), `z-dropdown` (100), `z-sticky` (200), `z-overlay` (300), `z-modal` (400), `z-toast` (500), `z-loading` (900).

### Component Construction Rules (critical for fixes)
1. **Tokens only** – no hardcoded colors, fonts, spacing, shadows.
2. **All states visible** – design all states simultaneously.
3. **Variants are functional** – not aesthetic differences.
4. **Name precisely** – follow naming in documentation.
5. **Annotate at least one variant** – show which token each property references.
6. **Spacing from scale only** – no arbitrary values.

### Accessibility Baseline
- Focus ring: `outline: 2px solid var(--color-gold-base); outline-offset: 3px;`
- Contrast: all token pairs meet WCAG AA (minimum).
- Touch targets: minimum 44×44px.
- Form inputs: `font-size: 1rem` minimum (prevent iOS zoom).
- All interactive elements have accessible names.

---
