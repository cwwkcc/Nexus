**Date:** June 2026 **Status:** Accepted **Supersedes:** Original text of this ADR, which named the model `PageContent` and scoped it to page sections only (`page`/`section` keys, no `status`, no `contentType`, no sibling settings table). The decision to move editorial content into a versioned database table never changed; the model's name and shape did, once it needed to cover more than pages. See Naming Note at the end.

---

## Context

The Nexus platform has two types of content:

1. **Interface Chrome** — Navigation labels, form field labels, fixed taxonomy values
2. **Editorial Content** — About page prose, timeline milestones, hero messages

Initially, both lived in `messages/` JSON files. This caused problems:

- Editorial content required developer commits to update
- No editorial review path
- Placeholder content (e.g., alumni profiles) shipped accidentally

The options considered:

1. **Keep in messages/** — Status quo
2. **Database-backed content table** — Generic table for editorial content, keyed broadly enough to cover pages and non-page content (navigation, footer, settings) alike
3. **One table per page** — Separate table for each page's content
4. **Third-party CMS** — Use an external CMS

---

## Decision

Use a **database-backed `ContentEntry` table** with versioning, plus a sibling `SiteSetting` table for values that are configuration rather than editorial content.

### Schema

```prisma
model ContentEntry {
  id          String   @id @default(cuid())

  // 'scope' groups content logically: 'page:about', 'global:footer', 'society:kits'
  scope       String

  // The unique identifier within the scope (e.g., 'about.hero', 'footer.links')
  sectionKey  String

  // Preserves the developer's intent even if registries change (e.g., 'hero', 'richText')
  contentType String

  locale      String   // 'en', 'si', 'ta'

  // The editorial workflow state
  status      String   @default("draft") // 'draft', 'published', 'archived'

  data        Json
  version     Int      @default(1)

  updatedAt   DateTime @updatedAt
  updatedBy   String?  // References the Admin user ID

  versions    ContentEntryVersion[]

  @@unique([scope, sectionKey, locale])
  @@index([scope, locale])
  @@index([status])
}

model ContentEntryVersion {
  id             String       @id @default(cuid())
  contentEntryId String
  contentEntry   ContentEntry @relation(fields: [contentEntryId], references: [id], onDelete: Cascade)
  version        Int
  data           Json
  changedAt      DateTime     @default(now())
  changedBy      String?

  @@index([contentEntryId, version])
}

model SiteSetting {
  key       String   // e.g., 'school.name', 'contact.phone', 'social.facebook'
  locale    String   // 'en', 'si', 'ta', or 'global' for non-translatable settings
  value     Json
  updatedAt DateTime @updatedAt
  updatedBy String?

  @@id([key, locale])
}
```

There is no `deletedAt` column and no soft-delete pattern. "Deleting" a `ContentEntry` means moving `status` to `archived`; the row and its version history are never removed. There is no `PageConfig` model — section order and visibility per page are declared once in the Page Registry (`packages/contracts`, ADR-005), in code, not read from this table.

### Content Types

Each `contentType` corresponds to a Zod schema in `packages/contracts/src/blocks/`:

|Section Type|Shape|Example|
|---|---|---|
|Flat prose|`{ content: string }`|About page story|
|Repeatable list|`{ items: Array<{ title, description, year? }> }`|Timeline|
|Structured fields|`{ heading, subtitle, text }`|Hero content|

### Excluded Content

|Content Type|Reason|
|---|---|
|Form field labels|Interface chrome — static|
|Fixed taxonomy values|E.g., society categories — static|
|`societies.json`|KITS special case — static|

**These remain in `messages/*.json` (i18n) and are not migrated to the database.**

---

## Alternatives Considered

### 1. Keep in messages/ (Rejected)

**Pros:**

- Simple
- No database dependency for content

**Cons:**

- Editorial content requires developer commits
- No review path for editors
- Placeholder content ships accidentally

### 2. One Table Per Page (Rejected)

**Pros:**

- Clear per-page ownership

**Cons:**

- Needlessly duplicates schema
- More complex to query
- Harder to add new pages, and no natural home for non-page content (navigation, footer, site settings)

### 3. Third-Party CMS (Rejected)

**Pros:**

- Feature-rich
- Editorial-friendly

**Cons:**

- Contradicts self-hosted principle
- Vendor lock-in
- Additional cost

---

## Consequences

### Positive

- Editors can update page content without developer commits
- Version history for all content changes, via `ContentEntryVersion`
- Single source of truth for editorial content, whether it belongs to a page or a global area
- Locale-aware (English, Sinhala, Tamil)
- Draft/published/archived workflow (`status`) means a save is never immediately public unless the editor says so
- Admin panel module for content editing (ContentEntry Module, Task 7.9)
- Non-content configuration (school name, contact details, social links) has its own table (`SiteSetting`) rather than being forced into `ContentEntry` with a fake `contentType`

### Negative

- Every static public page gains a request-time database dependency
- Admin panel must handle versioned, status-aware content (same pattern as any future News-style module)
- Migration needed to move content from `messages/` to `ContentEntry`

### Mitigations

- Database connection pooling (Task 6.12)
- `getByScope` returns English fallback for missing translations
- Migration script seeds `ContentEntry` from existing `messages/` (see Task 6.8 / Task 8.3)
- Public reads are cached with Next.js Data Cache, tagged by `scope`, invalidated on `update` via `revalidateTag(scope)` — see the ContentEntry Cache & Revalidation feature

---

## Implementation Notes

- **Migration script** (Task 6.8, seeded in Task 8.3) copies editorial content from `messages/*.json` to the `ContentEntry` table, leaving only UI chrome in the message files.
- The **ContentEntry Module** in the admin panel (Task 7.9) allows editors to update these sections.
- The **Page Specifications** document is updated to clearly distinguish which content is static (i18n) and which is editable (`ContentEntry`).

---

## Naming Note

This ADR originally named the model `PageContent`, scoped to `page`/`section`/`locale` with no `status` and no `contentType` column, and it originally applied only to page sections — global content (navigation, footer) and site settings had no home in it.

The rename to `ContentEntry` — with `scope` replacing `page` so a row can belong to a page _or_ a global area, `status` making draft/publish/archive a first-class concept instead of an afterthought, and `contentType` preserving intent even as the block registry evolves — reflects the same underlying decision (database-backed, versioned, editor-owned content) generalised to cover everything editorial in the platform, not just pages. `SiteSetting` was split out as a sibling rather than folded into `ContentEntry`, because settings aren't editorial content with a workflow state — they're configuration, and forcing them through a `status` field they don't need would have been the wrong shape.