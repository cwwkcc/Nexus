// packages/tokens/src/generators/tailwind.ts
//
// Builds the full Tailwind `theme` object — top-level only, no `extend`.
// This package now owns the entire scale for every axis it touches:
// Tailwind's own defaults for colors/spacing/sizing/borderWidth/scale are
// gone, replaced completely by what's defined here. packages/config's
// preset.ts just does `theme: nexusTheme` and nothing else.
//
// Two consequences were left in on purpose (per explicit decision to take
// the breakage now rather than defer it):
//
// 1. `borderWidth` has no `DEFAULT` key. Tailwind's bare `border` utility
//    (no suffix) resolves from `borderWidth.DEFAULT` — without it, `border`
//    renders with no width at all. Confirmed live in:
//      - packages/ui Button.tsx (base class string, both variants)
//      - packages/ui Input.tsx / Select.tsx / Textarea.tsx (inputBase /
//        selectBase / textareaBase)
//      - packages/ui Toast.tsx
//      - a status badge component using `border px-3 py-0.5`
//    Fix at each call site: swap bare `border` for an explicit width class,
//    e.g. `border-border-sm`.
//
// 2. `scale` is only `{ press: 0.98, 'card-hover': 1.02 }` — Tailwind's
//    default numeric scale (scale-0/50/75/90/95/100/105/110/125/150) is
//    gone. Confirmed live in:
//      - packages/ui Button.tsx (`motion-reduce:active:scale-100`)
//      - packages/ui Checkbox.tsx (`scale-0` → `peer-checked:scale-100`,
//        the actual checkmark animation)
//      - an interactive symbol/dot component (`scale-95/100/105/110/125`
//        switching on hover/active)
//    Fix at each call site: replace the numeric default with `scale-press`
//    / `scale-card-hover`, or add a new named token if neither fits.
//
// One thing was fixed regardless of the above: `maxWidth`. The site
// already has 18 live usages of `max-w-prose` / `max-w-content` /
// `max-w-wide`. A second top-level `maxWidth:` key assigned from `sizing`
// would silently overwrite the first in the object literal and delete
// those three keys with no warning — that's a duplicate-key authoring bug,
// not an accepted tradeoff, so it's merged by hand below instead.

import { boxShadow } from '../primitives/shadows';
import { backgroundImage, aspectRatio, blur, zIndex, opacity as opacityScale } from '../primitives/effects';
import { transitionDuration, transitionTimingFunction, transformScale } from '../primitives/motion';
import { borderRadius } from '../primitives/radius';
import { sizing, borderWidth } from '../primitives/sizing';
import { spacing } from '../primitives/spacing';
import { fontFamily, fontSize, lineHeight, letterSpacing } from '../primitives/typography';
import { semantic } from '../semantic';

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...semantic,
};

// Historically hand-maintained in packages/config/src/tailwind/preset.ts.
// Kept as its own named export here too, since prose/content/wide/full
// are custom values with no `sizing` equivalent, and callers of
// `nexusTheme.maxWidth` still need them alongside the full sizing scale.
export const customMaxWidth = {
  prose: '680px',
  content: '960px',
  wide: '1200px',
  full: '100%',
} satisfies Record<string, string>;

export const screens = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} satisfies Record<string, string>;

export const nexusTheme = {
  screens,
  colors,
  fontFamily,
  fontSize,
  letterSpacing,
  lineHeight,
  spacing,
  width: sizing,
  height: sizing,
  minWidth: sizing,
  minHeight: sizing,
  maxHeight: sizing,
  maxWidth: { ...customMaxWidth, ...sizing },
  borderWidth,
  borderRadius,
  boxShadow,
  transitionDuration,
  transitionTimingFunction,
  zIndex,
  opacity: opacityScale,
  blur,
  aspectRatio,
  backgroundImage,
  scale: transformScale,
};
