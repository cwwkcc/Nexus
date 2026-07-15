// packages/tokens/src/index.ts
//
// Public API of @nexus/tokens. Every name that was exported from the old
// flat src/*.ts files is still exported here, from its new location — so
// preset.ts and any other consumer needs zero import changes, only the
// internal file layout moved.

export * from './primitives/colors';
export * from './primitives/spacing';
export * from './primitives/sizing';
export * from './primitives/typography';
export * from './primitives/radius';
export * from './primitives/shadows';
export * from './primitives/motion';
export * from './primitives/effects';

export * from './semantic';

export * from './generators/tailwind';
export * from './generators/css';
export * from './generators/json';
export * from './generators/figma';

export * from './themes/dark';
export * from './themes/light';
export * from './themes/high-contrast';
