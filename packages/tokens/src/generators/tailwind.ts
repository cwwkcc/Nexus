// packages/tokens/src/generators/tailwind.ts

import { backgroundImage, aspectRatio, blur, zIndex, opacity as opacityScale } from '../primitives/effects';
import { transitionDuration, transitionTimingFunction, transformScale } from '../primitives/motion';
import { borderRadius } from '../primitives/radius';
import { boxShadow } from '../primitives/shadows';
import { sizing, borderWidth, maxWidth } from '../primitives/sizing';
import { spacing } from '../primitives/spacing';
import { fontFamily, fontSize, lineHeight, letterSpacing } from '../primitives/typography';
import { semantic } from '../semantic';

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...semantic,
};

export const screens = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} satisfies Record<string, string>;

export const nexusTheme = {
  screens,
  colors,
  fontFamily,
  fontSize,
  letterSpacing,
  lineHeight,
  spacing,
  width: sizing,
  height: sizing,
  minWidth: sizing,
  minHeight: sizing,
  maxHeight: sizing,
  maxWidth: { ...maxWidth, ...sizing },
  borderWidth,
  borderRadius,
  boxShadow,
  transitionDuration,
  transitionTimingFunction,
  zIndex,
  opacity: opacityScale,
  blur,
  aspectRatio,
  backgroundImage,
  scale: transformScale,
};
