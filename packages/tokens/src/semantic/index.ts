// packages/tokens/src/semantic/index.ts
//
// Recomposes colors.ts/text.ts/backgrounds.ts/borders.ts back into the
// exact shape the old single-file semantic.ts exported. Anything
// downstream that reads `semantic.green.base`, `semantic.surface.base`,
// `semantic.text.primary`, `semantic.border.default`,
// `semantic.semantic.success.base`, `semantic.overlay.light`, or
// `semantic.opacity.disabled` keeps working unchanged.

import { surface, overlay } from './backgrounds';
import { border } from './borders';
import { brandColors, statusColors } from './colors';
import { text, stateOpacity } from './text';

export const semantic = {
  green: brandColors.green,
  gold: brandColors.gold,
  surface,
  text,
  border,
  semantic: statusColors,
  overlay,
  opacity: stateOpacity,
} as const;

export { brandColors, statusColors, surface, overlay, border, text, stateOpacity };
