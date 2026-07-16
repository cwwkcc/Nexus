// packages/tokens/src/semantic/index.ts

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
