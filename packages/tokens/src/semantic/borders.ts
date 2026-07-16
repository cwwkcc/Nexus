// packages/tokens/src/semantic/borders.ts

import { primitives } from '../primitives/colors';

export const border = {
  default: primitives.border.default, // rgba(184,205,184,0.12) — barely-there
  light: primitives.border.light, // rgba(184,205,184,0.07) — ghost border
  strong: 'rgba(184,205,184,0.20)', // visible border
  highlight: 'rgba(184,205,184,0.28)', // top/left edge highlight on glass
  'glass-border': 'rgba(218,241,222,0.12)',
  'glass-border-highlight': 'rgba(218,241,222,0.22)',
} as const;
