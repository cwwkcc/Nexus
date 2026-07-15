// packages/tokens/src/themes/dark.ts
//
// This is today's actual (and only) palette — dark forest background,
// pale mint/gold text and accents. Named "dark" because the raw values
// in primitives/colors.ts are genuinely dark-mode-native (deep forest
// surfaces, light text), not because there's a toggle anywhere yet. I
// grepped the whole apps/ + packages/ui tree for any theme-switching
// mechanism (ThemeProvider, next-themes, data-theme, prefers-color-scheme)
// and found none — every "light"/"dark" reference in the codebase today
// is a per-component prop (e.g. an `onDark` variant for a nav link that
// can sit on a light or dark section), not a site-wide theme.
//
// See the note in chat: light.ts and high-contrast.ts are stubs, not
// designed palettes — there's no cream/light design spec to port yet.

export { semantic as darkTheme } from '../semantic';
