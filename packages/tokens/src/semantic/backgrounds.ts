// packages/tokens/src/semantic/backgrounds.ts

import { primitives } from '../primitives/colors';

export const surface = {
  base: primitives.forest[900], // #0A1F1C — deep forest floor
  default: primitives.forest[800], // #0F2A26 — default dark surface
  deep: primitives.forest[700], // #1A3A32 — deep panel
  elevated: primitives.forest[500], // #3D5C52 — raised surface (lighter)
  canopy: primitives.forest[300], // #8FA898 — light canopy surface (NEW)
  glass: 'rgba(26,60,50,0.45)', // lighter glass
  'glass-canopy': 'rgba(184,205,184,0.35)', // very light top glass (NEW)
  'glass-subtle': 'rgba(15,42,38,0.40)',
  'glass-medium': 'rgba(26,60,50,0.55)',
  'glass-card': 'rgba(42,74,62,0.50)',
  inverse: primitives.forest[200], // #B8CDB8 — light surface for badges on dark bg
  hover: primitives.forest[600], // #2A4A3E — subtle lift on hover
  active: primitives.forest[700], // #1A3A32 — pressed/active pushes back down
  disabled: primitives.forest[800], // #0F2A26 — disabled = default opacity
} as const;

export const overlay = primitives.overlay;
