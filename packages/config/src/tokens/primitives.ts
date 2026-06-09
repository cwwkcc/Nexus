// packages/config/src/tokens/primitives.ts
export const primitives = {
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
  neutral: {
    0: '#FFFFFF',
    100: '#E6F2EA',
    200: '#D1E6D9',
    300: '#BEE0C9',
    400: '#F0F7F2',
    900: '#0F2918',
    ink: '#1C1A16',
    stone: '#4A5C4D',
    cream: '#F5EFE4',
  },
  border: {
    default: '#D4C9B8',
    light: '#E2D9CC',
  },
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
