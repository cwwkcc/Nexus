**Date:** June 2026  
**Status:** Accepted

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
2. **Database-backed PageContent** — Generic table for page sections
3. **One table per page** — Separate table for each page's content
4. **Third-party CMS** — Use an external CMS

---

## Decision

Use a **database-backed `PageContent` table** with versioning.

### Schema

```prisma
model PageContent {
  id        String    @id @default(cuid())
  page      String    // 'about', 'home-hero', etc.
  section   String    // 'story', 'timeline', 'values'
  locale    String    // 'en', 'si', 'ta'
  content   Json      // Zod-validated JSON
  version   Int       // Incremented on each change
  published DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@unique([page, section, locale])
  @@index([page, locale])
}
```

### Content Types

Each section has a Zod schema defining its shape:

| Section Type      | Shape                                             | Example          |
| ----------------- | ------------------------------------------------- | ---------------- |
| Flat prose        | `{ content: string }`                             | About page story |
| Repeatable list   | `{ items: Array<{ title, description, year? }> }` | Timeline         |
| Structured fields | `{ heading, subtitle, text }`                     | Hero content     |

### Excluded Content

| Content Type          | Reason                            |
| --------------------- | --------------------------------- |
| Form field labels     | Interface chrome — static         |
| Fixed taxonomy values | E.g., society categories — static |
| `societies.json`      | KITS special case — static        |

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
- Harder to add new pages

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
- Version history for all content changes
- Single source of truth for editorial content
- Locale-aware (English, Sinhala, Tamil)
- Admin panel module for content editing

### Negative

- Every static public page gains a request-time database dependency
- Admin panel must handle versioned content (same pattern as News)
- Migration needed to move content from `messages/` to `PageContent`

### Mitigations

- Database connection pooling (Task 6.9)
- `getByPage` returns English fallback for missing translations
- Migration script seeds `PageContent` from existing `messages/` (see Task 8.2b)

---

## Implementation Notes

- **Migration script** (Task 8.2b) will copy editorial content from `messages/*.json` to the `PageContent` table, leaving only UI chrome in the message files.
- The **Page Content Module** in the admin panel (Task 7.10b) allows editors to update these sections.
- The **Page Specifications** document will be updated to clearly distinguish which content is static (i18n) and which is editable (`PageContent`).

---
