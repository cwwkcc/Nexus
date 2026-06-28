// packages/contracts/src/index.ts
//
// Public exports for @nexus/contracts.
// Consumers import types, schemas, and registry helpers from here.

// ── Existing content schemas ───────────────────────────────────────────────────
// Page-specific schemas (About, etc.) and shared entity schemas.
export * from './content/index.js';
export * from './school/index.js';
export * from './people/index.js';

// ── Generic content types ──────────────────────────────────────────────────────
// The CMS DSL — generic reusable schemas that page sections extend.
export * from './content-types/index.js';

// ── Page registry ──────────────────────────────────────────────────────────────
// Per-page section definitions. The admin reads this to build its editor;
// the API router reads this for contracts.
export * from './page-registry/index.js';

// ── Global registry ────────────────────────────────────────────────────────────
// Navigation, footer, and other site-wide content sections.
export * from './global-registry/index.js';

// ── Site settings ──────────────────────────────────────────────────────────────
// Operational config: school info, contact details, social links.
export * from './site-settings/index.js';
