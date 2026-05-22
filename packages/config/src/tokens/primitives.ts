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
    100: '#F7F3EC', // surface base
    200: '#EDE8DF', // surface default
    300: '#E4DDD1', // surface deep
    400: '#F3EEE6', // surface elevated
    900: '#22201B', // surface inverse
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
