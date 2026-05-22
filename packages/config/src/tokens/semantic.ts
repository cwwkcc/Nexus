// packages/config/src/tokens/semantic.ts
import { primitives } from './primitives.js';

export const semantic = {
  green: {
    base: primitives.green[100],
    light: primitives.green[80],
    hover: primitives.green[80],
  },
  gold: {
    base: primitives.gold[100],
    light: primitives.gold[80],
    pale: primitives.gold[60],
    hover: primitives.gold[40],
    active: primitives.gold[20],
    glow: primitives.gold.glow,
  },
  surface: {
    base: primitives.neutral[100],
    default: primitives.neutral[200],
    deep: primitives.neutral[300],
    elevated: primitives.neutral[400],
    inverse: primitives.neutral[900],
  },
  text: {
    primary: primitives.neutral.ink,
    muted: primitives.neutral.stone,
    inverse: primitives.neutral.cream,
  },
  border: {
    default: primitives.border.default,
    light: primitives.border.light,
  },
  semantic: {
    success: primitives.success,
    error: primitives.error,
    warning: primitives.warning,
    info: primitives.info,
  },
  overlay: primitives.overlay,
} as const;
