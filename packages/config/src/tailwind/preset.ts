import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  fontSize,
  letterSpacing,
  lineHeight,
  transitionDuration,
  transitionTimingFunction,
  borderRadius,
  boxShadow,
  zIndex,
  opacity,
  blur,
  aspectRatio,
  backgroundImage,
  fontFamily,
} from '../tokens/index.js';

export const nexusPreset: Partial<Config> = {
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    // Replace Tailwind defaults completely
    colors,
    fontFamily,
    fontSize,
    letterSpacing,
    lineHeight,
    spacing,
    maxWidth: {
      prose: '680px',
      content: '960px',
      wide: '1200px',
      full: '100%',
    },
    borderRadius,
    boxShadow,
    transitionDuration,
    transitionTimingFunction,
    zIndex,
    opacity,
    blur,
    aspectRatio,
    backgroundImage,
    extend: {}, // no extra extensions – everything is already replaced
  },
  plugins: [],
};
