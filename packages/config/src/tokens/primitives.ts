// packages/config/src/tokens/primitives.ts
export const primitives = {
  // Forest palette — dark base (from the chosen reference gradient)
  forest: {
    900: '#051F20', // deepest — base html bg
    800: '#0B2B26', // very dark green
    700: '#163832', // dark green
    600: '#235347', // mid forest green
    500: '#2E6B5A', // medium green
    400: '#8EB69B', // soft sage / mint
    300: '#B8D8C4', // pale sage
    200: '#DAF1DE', // pale mint — primary text
    100: '#F0FAF2', // near white mint
  },
  green: {
    100: '#1A4A2E',
    80: '#235C3A',
  },
  gold: {
    100: '#C9973A',
    80: '#E8B84B',
    60: '#F2D98A',
    40: '#D6A645',
    20: '#B7852F',
    glow: 'rgba(201,151,58,0.28)',
  },
  // Dark-mode neutrals
  neutral: {
    0: '#FFFFFF',
    100: '#DAF1DE', // primary text — pale mint
    200: '#8EB69B', // muted text — soft sage
    300: '#235347', // subtle surface
    400: '#163832', // deep surface
    900: '#051F20', // inverse bg
    ink: '#051F20', // darkest — for text on light surfaces
    stone: '#8EB69B', // muted text on dark bg
    cream: '#DAF1DE', // primary text on dark bg
  },
  border: {
    default: 'rgba(218,241,222,0.12)',
    light: 'rgba(218,241,222,0.07)',
  },
  success: {
    base: '#5DBB8A',
    surface: 'rgba(11,43,38,0.55)',
  },
  error: {
    base: '#E07070',
    surface: 'rgba(90,20,20,0.45)',
  },
  warning: {
    base: '#E8B84B',
    surface: 'rgba(80,50,10,0.45)',
  },
  info: {
    base: '#7EB8D4',
    surface: 'rgba(20,50,70,0.45)',
  },
  overlay: {
    light:  'rgba(22,56,50,0.40)',   // warm forest tint — tooltips, hover overlays
    medium: 'rgba(5,31,32,0.62)',    // neutral dark green — modal backdrops, drawers
    heavy:  'rgba(2,10,11,0.84)',    // near-black — full-screen takeovers, lightbox
  },
} as const;
