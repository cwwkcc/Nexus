**Date:** June 2026  
**Status:** Accepted

---

## Context

The Nexus platform requires analytics to understand:

- Which pages are most viewed
- How users interact with content
- Results portal usage
- Search terms users enter
- Locale and device distribution

The key requirements are:

- **Privacy-first** — No third-party scripts on the public site
- **Data ownership** — School controls the data
- **GDPR compliant** — No cookies without consent
- **Cost-effective** — No recurring subscription fees

The options considered:

1. **Custom analytics** — Server-side event collector + dashboard
2. **Umami** — Self-hosted privacy-first analytics
3. **Plausible** — Privacy-first analytics (paid for self-hosted)
4. **Google Analytics** — Industry standard (but third-party)

---

## Decision

Use a **dual approach**:

1. **Custom server-side collector** — Primary system of record
2. **Umami self-hosted** — Independent secondary view for cross-checking

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Custom Analytics (Primary)                   │
│  • Server-side event collector in Next.js middleware           │
│  • Events stored in PostgreSQL via tRPC                       │
│  • Admin dashboard built in Nexus (Task 7.11)                 │
└─────────────────────────────────────────────────────────────────┘

                          ┃ (cross-check)

┌─────────────────────────────────────────────────────────────────┐
│                       Umami (Secondary)                         │
│  • Self-hosted Docker container on same VPS                   │
│  • JavaScript snippet on public site                           │
│  • Independent data source                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Why Both?

| Aspect                                       | Custom Analytics | Umami            |
| -------------------------------------------- | ---------------- | ---------------- |
| Data ownership                               | ✅ Full          | ✅ Full          |
| No third-party scripts                       | ✅               | ✅ (self-hosted) |
| Built-in dashboard                           | ✅               | ✅               |
| Independent from platform                    | ❌               | ✅               |
| Cross-checking                               | ❌               | ✅               |
| Custom metrics (search terms, results usage) | ✅               | ❌               |

---

## Alternatives Considered

### 1. Google Analytics (Rejected)

**Pros:**

- Free
- Detailed reports
- Industry standard

**Cons:**

- Third-party script on public site
- GDPR compliance complexity
- Data owned by Google

### 2. Umami Only (Rejected)

**Pros:**

- Simple
- Good dashboard
- Privacy-first

**Cons:**

- No custom metrics (search terms, results usage)
- Harder to extend

### 3. Plausible (Rejected)

**Pros:**

- Privacy-first
- Good dashboard

**Cons:**

- Paid for self-hosted
- Limited customisation

---

## Consequences

### Positive

- Full data ownership
- No third-party scripts
- GDPR compliant
- Two independent data sources
- Custom metrics (search terms, results usage)

### Negative

- Running two analytics systems adds operational complexity
- Custom analytics requires development

### Mitigations

- Umami is minimal overhead (one Docker container)
- Custom analytics uses existing infrastructure (PostgreSQL)
- Documented for future maintainers

---

### Implementation Notes

- **Custom collector** is implemented via Next.js middleware and stores events in the `AnalyticsEvent` table; the admin dashboard (Task 7.11) surfaces these metrics.
- **Umami** is optional but recommended; its container is defined in `docker-compose.yml` and can be enabled by setting `UMAMI_URL` and `UMAMI_WEBSITE_ID`.

---
