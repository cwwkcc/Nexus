import { primitives } from './primitives';

export const semantic = {
  green: {
    base: primitives.green[100], // #1A4A2E — base green for elements
    light: primitives.forest[500], // #2E6B5A — lighter, for chips/badges
    hover: primitives.forest[400], // #8EB69B — visibly lighter hover state
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
  },
  text: {
    primary: primitives.forest[200], // #B8CDB8 — pale mint, primary readable text
    muted: primitives.forest[300], // #8FA898 — pale sage, secondary/meta text
    subtle: primitives.forest[400], // #6B8C7A — soft sage, tertiary/placeholder text
    inverse: primitives.forest[900], // #0A1F1C — dark text on light surfaces
    heading: primitives.forest[100], // #E8F0E8 — near-white, headings pop more than body
    gold: primitives.gold[80], // #E8B84B — accent/highlight text
  },
  border: {
    default: primitives.border.default, // rgba(184,205,184,0.12) — barely-there
    light: primitives.border.light, // rgba(184,205,184,0.07) — ghost border
    strong: 'rgba(184,205,184,0.20)', // visible border
    highlight: 'rgba(184,205,184,0.28)', // top/left edge highlight on glass
  },
  semantic: {
    success: primitives.success,
    error: primitives.error,
    warning: primitives.warning,
    info: primitives.info,
  },
  overlay: primitives.overlay,
  opacity: {
    disabled: '0.5',
    loading: '0.6',
  },
} as const;
