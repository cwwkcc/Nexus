// packages/tokens/src/primitives/colors.ts

export const primitives = {
  // Forest palette — prestige sunlit canopy (lighter, warm dappled light)
  forest: {
    900: '#0A1F1C', // deep forest floor (lighter than before)
    800: '#0F2A26', // very dark green
    700: '#1A3A32', // dark green
    600: '#2A4A3E', // mid forest green
    500: '#3D5C52', // medium green (lighter than before)
    400: '#6B8C7A', // soft sage
    300: '#8FA898', // pale sage
    200: '#B8CDB8', // pale mint text
    100: '#E8F0E8', // near-white mint (canopy light)
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
    glow: 'rgba(201,151,58,0.32)', // enhanced for warmth
  },
  border: {
    default: 'rgba(184,205,184,0.12)',
    light: 'rgba(184,205,184,0.07)',
  },
  success: {
    base: '#5DBB8A',
    surface: 'rgba(15,42,38,0.55)',
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
    light: 'rgba(26,60,50,0.40)', // warm forest tint — tooltips, hover overlays
    medium: 'rgba(10,31,28,0.62)', // neutral dark green — modal backdrops, drawers
    heavy: 'rgba(5,15,12,0.84)', // near-black — full-screen takeovers, lightbox
  },
} as const;
