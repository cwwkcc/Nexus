// packages/tokens/src/themes/light.ts
//
// Not implemented. There's no light-theme design spec in the codebase to
// port — the site currently ships one palette only (see dark.ts). Earlier
// design notes mention a cream (#F7F3EC) base as part of the original
// "Royal Institution" identity, but the primitives that actually got
// built (primitives/colors.ts) are dark-mode-native, and nothing wires up
// a light variant today. Left as a stub rather than inventing color
// values with no spec behind them — fill in if/when a light theme is
// actually designed.

export function getLightTheme(): never {
  throw new Error('Light theme is not implemented yet — see the comment at the top of this file.');
}
