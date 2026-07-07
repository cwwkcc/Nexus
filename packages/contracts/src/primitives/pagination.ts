// packages/contracts/src/core/common/pagination.ts
//
// Pagination contracts for list endpoints and admin tables.
//
// Should contain:
//   PageInputSchema    — page (number ≥ 1), pageSize (number, default 20, max 100)
//   CursorInputSchema  — cursor (string | null), limit (number, default 20)
//   PaginationMeta     — total, page, pageSize, totalPages, hasNextPage, hasPrevPage
//   CursorMeta         — nextCursor (string | null), hasMore
//
// Used by:
//   core/api/content-entry.ts — list procedure inputs
//   editorial/news/article.ts — article list pagination
//   editorial/events/event.ts — event list pagination



// TODO: implement

export type Pagination = unknown;
