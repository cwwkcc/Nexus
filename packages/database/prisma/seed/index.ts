/**
 * packages/database/prisma/seed/index.ts
 *
 * Central export point for all seed data and functions.
 * Import this in the root seed.ts to run all seeds.
 */

export { seedGlobals } from './globals/index.ts';
export { seedPages } from './pages/index.ts';

// Also re‑export the raw data if needed elsewhere
export * from './globals/footer.ts';
export * from './globals/navigation.ts';
// export * from './pages/about.ts';
// export * from './pages/home.ts';
// ... etc
