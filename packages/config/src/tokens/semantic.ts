import { primitives } from './primitives';

export const semantic = {
  green: {
    base: primitives.green[100],         // #1A4A2E — base green for elements
    light: primitives.forest[500],        // #2E6B5A — lighter, for chips/badges
    hover: primitives.forest[400],        // #8EB69B — visibly lighter hover state
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
    base:     primitives.forest[900],     // #051F20 — deepest, html bg
    default:  primitives.forest[800],     // #0B2B26 — default dark surface
    deep:     primitives.forest[700],     // #163832 — visibly deeper panel
    elevated: primitives.forest[500],     // #2E6B5A — raised above default (cards, dropdowns)
    glass:          'rgba(5,31,32,0.52)',
    'glass-subtle': 'rgba(11,43,38,0.40)',
    'glass-medium': 'rgba(22,56,50,0.55)',
    'glass-card':   'rgba(22,56,50,0.58)',
    inverse:  primitives.forest[200],     // #DAF1DE — light surface for badges on dark bg
    hover:    primitives.forest[600],     // #235347 — subtle lift on hover (between deep & elevated)
    active:   primitives.forest[700],     // #163832 — pressed/active pushes back down
    disabled: primitives.forest[800],     // #0B2B26 — disabled = default opacity
  },
  text: {
    primary:  primitives.forest[200],     // #DAF1DE — pale mint, primary readable text
    muted:    primitives.forest[400],     // #8EB69B — soft sage, secondary/meta text
    subtle:   primitives.forest[300],     // #B8D8C4 — tertiary, placeholder text
    inverse:  primitives.forest[900],     // #051F20 — dark text on light surfaces
    heading:  primitives.forest[100],     // #F0FAF2 — near-white, headings pop more than body
    gold:     primitives.gold[80],        // #E8B84B — accent/highlight text
  },
  border: {
    default:   primitives.border.default,   // rgba(218,241,222,0.12) — barely-there
    light:     primitives.border.light,     // rgba(218,241,222,0.07) — ghost border
    strong:    'rgba(218,241,222,0.20)',     // visible border
    highlight: 'rgba(218,241,222,0.28)',    // top/left edge highlight on glass
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
