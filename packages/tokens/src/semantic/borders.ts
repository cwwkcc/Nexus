// packages/tokens/src/semantic/borders.ts
//
// Semantic border *colors*. Not to be confused with
// primitives/sizing.ts's `borderWidth` (border *widths*) — different
// Tailwind axis, different file, same word. Named `borders.ts` per the
// requested structure; kept singular meaning (color) to avoid ambiguity
// with borderWidth.

import { primitives } from '../primitives/colors';

export const border = {
  default: primitives.border.default, // rgba(184,205,184,0.12) — barely-there
  light: primitives.border.light, // rgba(184,205,184,0.07) — ghost border
  strong: 'rgba(184,205,184,0.20)', // visible border
  highlight: 'rgba(184,205,184,0.28)', // top/left edge highlight on glass
} as const;
