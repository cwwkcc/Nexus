// packages/api/src/root.ts

// The contentEntryRouter is the canonical CMS router that writes to ContentEntry,
// ContentEntryVersion, and SiteSetting — the only models in the current schema.

// The old pageContentRouter and pageConfigRouter are removed: pageContentRouter
// referenced the now-deleted `pageContent` / `pageContentVersion` Prisma models
// and will crash on any call. pageConfigRouter referenced `pageConfig`, also gone.

// Migration checklist before deleting this comment:
//   ✓ root.ts  — imports contentEntryRouter, removes dead routers
//   ✓ apps/web/src/server/page-content.ts — calls contentEntry.getByScope
//   ✓ apps/admin/src/app/page-content/page.tsx — calls contentEntry.adminGetByScope
//   ✓ apps/admin/src/app/page.tsx — dashboard no longer queries dead models

import { announcementsRouter } from './modules/announcements/router.js';
import { contentEntryRouter } from './modules/content/router.js';
import { eventsRouter } from './modules/events/router.js';
import { galleryRouter } from './modules/gallery/router.js';
import { mediaRouter } from './modules/media/router.js';
import { newsRouter } from './modules/news/router.js';
import { societiesRouter } from './modules/societies/router.js';
import { staffRouter } from './modules/staff/router.js';
import { router } from './trpc.js';

export const appRouter = router({
  contentEntry: contentEntryRouter,
  news: newsRouter,
  media: mediaRouter,
  staff: staffRouter,
  events: eventsRouter,
  societies: societiesRouter,
  gallery: galleryRouter,
  announcements: announcementsRouter,
});

export type AppRouter = typeof appRouter;
