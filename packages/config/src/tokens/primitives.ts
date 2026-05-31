// packages/config/src/tokens/primitives.ts
export const primitives = {
  // Greens
  green: {
    100: '#1A4A2E',
    80: '#235C3A',
  },
  // Golds
  gold: {
    100: '#C9973A',
    80: '#E8B84B',
    60: '#F2D98A',
    40: '#D6A645',
    20: '#B7852F',
    glow: 'rgba(201,151,58,0.28)',
  },
  // Neutral / Surfaces
  neutral: {
    0: '#FFFFFF',
    100: '#E6F2EA', // surface base (Fresh, clear light green tint)
    200: '#D1E6D9', // surface default (Distinct green for secondary backgrounds)
    300: '#BEE0C9', // surface deep (Rich pastel green for sidebars or footers)
    400: '#F0F7F2', // surface elevated (Brightest, almost-white green for floating cards/modals)
    900: '#0F2918', // surface inverse (Deep forest-black, perfectly matching the green theme)
    ink: '#1C1A16', // text primary
    stone: '#5C5647', // text muted
    cream: '#F5EFE4', // text inverse (approx)
  },
  // Borders
  border: {
    default: '#D4C9B8',
    light: '#E2D9CC',
  },
  // Semantic states (kept as primitives because they are atomic)
  success: {
    base: '#3F6B4B',
    surface: '#E6F0E8',
  },
  error: {
    base: '#8A3B32',
    surface: '#F6E8E5',
  },
  warning: {
    base: '#B07A2B',
    surface: '#FAF1DE',
  },
  info: {
    base: '#4A6475',
    surface: '#EAF0F4',
  },
  overlay: {
    light: 'rgba(28,26,22,0.32)',
    medium: 'rgba(28,26,22,0.56)',
    heavy: 'rgba(28,26,22,0.78)',
  },
} as const;
