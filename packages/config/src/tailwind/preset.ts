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
  sizing,
  borderWidth,
  transformScale,
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

    extend: {
      width: sizing,
      height: sizing,
      minWidth: sizing,
      maxWidth: sizing,
      minHeight: sizing,
      maxHeight: sizing,
      borderWidth,
      scale: transformScale,
      // glass and focusRing tokens live in tokens.css as CSS custom properties
      // and are consumed via var(--glass-*) / var(--focus-ring-*) directly.
      // Spreading them into extend generates no Tailwind utilities (they are
      // not valid theme category keys) so they were removed from here.
    },
  },
  plugins: [],
};
