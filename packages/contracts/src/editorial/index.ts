// packages/contracts/src/editorial/index.ts
//
// Editorial content contracts — data authored by content editors via the CMS.
//
// Editorial vs Features:
//   editorial/ — created by school staff, has locale, may be versioned,
//                rendered directly by the web app
//   features/  — application business entities with logic and relationships
//
// Areas:
//   news/         — articles, categories, featured posts
//   events/       — calendar events and categories
//   gallery/      — photo albums and individual photos
//   achievements/ — school-level achievements and the home page ticker

export * from './news/index.js';
export * from './events/index.js';
export * from './gallery/index.js';
export * from './achievements/index.js';
