import { nexusTheme } from '@nexus/tokens';
import type { Config } from 'tailwindcss';

// No `extend`. `nexusTheme` is the complete theme — every axis it defines
// (colors, spacing, sizing, borderWidth, scale, etc.) fully replaces
// Tailwind's built-in scale for that property rather than merging with
// it. That's a deliberate decision, not an oversight — see the comments
// at the top of packages/tokens/src/generators/tailwind.ts for exactly
// which default utilities stop working and where the live call sites are
// that need fixing.
export const nexusPreset: Partial<Config> = {
  theme: nexusTheme,
  plugins: [],
};
