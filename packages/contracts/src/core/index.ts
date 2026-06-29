// packages/contracts/src/core/index.ts
//
// Re-exports everything from the core layer.
// core/ contains platform-wide contracts that every other layer depends on.
// Nothing in core/ should import from blocks/, registry/, editorial/, or features/.

export * from './common/index.js';
export * from './api/index.js';
export * from './cms/index.js';
export * from './auth/index.js';
export * from './storage/index.js';
export * from './permissions/index.js';
