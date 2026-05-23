## Purpose

Spinners communicate loading states without interrupting the user’s mental model. They are used inline within buttons, form submissions, data fetching, and content loading. Each spinner has a distinct personality while sharing the same token‑based constraints.

The two spinners serve different emotional tones:

- **BeatLoader** – rhythmic, calm, “breathing” (used for page‑level loading, ceremonial moments)
- **ScaleLoader** – stacked, architectural (used for admin panels, results portal – infrastructure identity)

---

## Variants

Both spinners share the same three variant dimensions: `size`, `variant`, `speed`.

| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `size` | `sm`, `md`, `lg` | `md` | Controls physical dimensions (dot size, bar height, gap). |
| `variant` | `green`, `gold`, `muted` | `green` | Colour scheme – maps to token colours. |
| `speed` | `fast`, `normal`, `slow` | `normal` | Duration of one full animation cycle (continuous loop). |
| `label` | string | `"Loading"` | Accessible label for screen readers. |

The spinners do **not** have interactive states (hover, focus) – they are purely presentational.

---

## Layout & Sizing

All dimensions use **sizing tokens** (`size-*`) for fixed widths/heights, and **spacing tokens** (`space-*`) for gaps. Decimal values use hyphens: `size-0-5` (2px), `size-1-5` (6px), etc.

### BeatLoader

| Size | Dot diameter (sizing)           | Gap between dots (spacing) | Lift (animation height) |
|------|----------------------------------|----------------------------|--------------------------|
| `sm` | 6px (`w-size-1-5 h-size-1-5`)    | 4px (`gap-space-1`)        | 4px (inline style)       |
| `md` | 8px (`w-size-2 h-size-2`)        | 6px (`gap-space-1-5`)      | 6px                      |
| `lg` | 12px (`w-size-3 h-size-3`)       | 8px (`gap-space-2`)        | 8px                      |

**Visual:** Three dots that fade, scale, and move upward in a staggered rhythm.

### ScaleLoader

| Size | Bar width (sizing)        | Bar height (sizing)   | Gap between bars (spacing) |
|------|---------------------------|-----------------------|-----------------------------|
| `sm` | 2px (`w-size-0-5`)        | 12px (`h-size-3`)     | 2px (`gap-space-0-5`)       |
| `md` | 4px (`w-size-1`)          | 20px (`h-size-5`)     | 4px (`gap-space-1`)         |
| `lg` | 6px (`w-size-1-5`)        | 28px (`h-size-7`)     | 6px (`gap-space-1-5`)       |

**Visual:** Five vertical bars that scale in height like a sine wave, with staggered timing.

---

## Token Usage

### Colour Tokens (via `variant`)

| Variant | Element / Token |
|---------|-----------------|
| `green` | `text-green-base` (dot/bar colour) |
| `gold`  | `text-gold-base` |
| `muted` | `text-text-muted` |

All spinners use `currentColor` so the colour inherits from the `text-*` class. This ensures the colour is always a named token.

**Rule:** No direct hex values. The `variant` prop must map to one of the three token groups.

### Sizing Tokens (`size-*`)

Used for all fixed widths and heights:

| Token | Value | Used in |
|-------|-------|---------|
| `size-0-5` | 2px | ScaleLoader bar width (sm) |
| `size-1` | 4px | ScaleLoader bar width (md) |
| `size-1-5` | 6px | BeatLoader dot diameter (sm), ScaleLoader bar width (lg) |
| `size-2` | 8px | BeatLoader dot diameter (md) |
| `size-3` | 12px | BeatLoader dot diameter (lg), ScaleLoader bar height (sm) |
| `size-5` | 20px | ScaleLoader bar height (md) |
| `size-7` | 28px | ScaleLoader bar height (lg) |

### Spacing Tokens (`space-*`)

Used for gaps between elements:

| Token | Value | Used in |
|-------|-------|---------|
| `space-0-5` | 2px | ScaleLoader gap (sm) |
| `space-1` | 4px | BeatLoader gap (sm), ScaleLoader gap (md) |
| `space-1-5` | 6px | BeatLoader gap (md), ScaleLoader gap (lg) |
| `space-2` | 8px | BeatLoader gap (lg) |

### Motion

Durations are **continuous loop speeds** – not mapped to `duration-*` tokens (see Foundations §06.3 Rule 5). Values are passed directly to Framer Motion:

| `speed` | BeatLoader | ScaleLoader |
|---------|------------|-------------|
| `fast`  | 0.4s       | 0.6s        |
| `normal`| 0.6s       | 0.9s        |
| `slow`  | 0.9s       | 1.3s        |

Easing uses the tokenised `ease-in-out` (CSS variable `--ease-in-out`, Tailwind class `ease-in-out`).

**Reduced motion fallback:** When `prefers-reduced-motion` is active:
- BeatLoader: opacity pulse only (no movement, no scale)
- ScaleLoader: opacity pulse only (no scaleY)

All spinners must use `useReducedMotion()` from Framer Motion.

---

## Implementation Rules

### Rule 1 – No hardcoded colours
Use `variant` prop to apply token‑based classes like `text-green-base`. Never use inline style or hardcoded hex.

### Rule 2 – All animations respect reduced motion
Use `useReducedMotion()` and conditionally render a simplified animation (opacity only) or no animation.

### Rule 3 – Accessible labelling
Every spinner must have `role="status"` and an `aria-label` (or `aria-labelledby`). The `label` prop should be used as the accessible name.

### Rule 4 – Dimensions use sizing tokens (`size-*`)
All fixed widths and heights must use `size-*` tokens.

### Rule 5 – Gaps use spacing tokens (`space-*`)
All gaps between elements must use `space-*` tokens.

### Rule 6 – No hover or focus states
Spinners are not interactive. They must have `pointer-events: none` where appropriate (e.g., inside buttons they should not block clicks).

### Rule 7 – Performance
Animations should use `transform` and `opacity` only (GPU accelerated). Avoid animating `width`, `height`, or `margin`.

### Rule 8 – Colour inheritance for track and base fill
Use `bg-current/10` and `bg-current/20` where needed – these are acceptable because `currentColor` inherits from the token‑driven `text-*` class.

---

## Accessibility

- All spinners use `role="status"` so screen readers announce the loading state.
- The `label` prop is rendered as `aria-label` on the container.
- Reduced motion is respected – the animation degrades to a simple opacity pulse or stops completely.
- Spinners inside buttons should not steal focus; the button’s `aria-busy="true"` should be set externally.

---

## Related Components

- `Button` – uses `BeatLoader` when `loading` prop is true.
- `LoadingSkeleton` – for content placeholders (different use case).
- `ProgressIndicator` – for determinate loading (e.g., file upload).

---

_Nexus Design System – Spinner Components_  
_C.W.W. Kannangara Central College, Mathugama_  
_Maintained by Kannangara ICT Society (KITS)_  
_© 2026_