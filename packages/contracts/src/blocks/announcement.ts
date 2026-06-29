// packages/contracts/src/blocks/announcement.ts
//
// Announcement block — dismissible banner for notices, warnings, or alerts.
//
// Should contain:
//   AnnouncementSchema — variant ('info'|'warning'|'error'|'success', default 'info'),
//                        message, linkLabel?, linkHref?,
//                        expiresAt? (ISO datetime — hide after this time)
//   AnnouncementData   — z.infer type
//
// Notes:
//   Also used as the value type for the 'site.announcementBanner' SiteSetting.
//   The web app hides the announcement client-side once expiresAt has passed.



// TODO: implement (migrate from packages/validation/src/content-types/index.ts)

export type Announcement = unknown;
