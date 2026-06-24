# adr/ADR-006-r2-storage.md

#

**Date:** June 2026

**Status:** Accepted

---

## Context

The Nexus platform requires object storage for media assets:

- Images (gallery photos, staff portraits, news cover images)
- PDFs (admission forms, prospectus, exam results)
- Other media (school anthem audio, video clips)

The key requirements are:

- **Zero egress fees** — No bandwidth costs when users view images
- **CDN integration** — Fast delivery globally
- **S3-compatible API** — Easy integration with existing tools
- **Cost-effective** — Predictable costs

The options considered:

1. **Cloudflare R2** — Object storage with zero egress fees
2. **AWS S3** — Industry standard
3. **Backblaze B2** — S3-compatible, low cost
4. **Local filesystem** — No external dependencies

---

## Decision

Use **Cloudflare R2**.

### Justification

| Requirement        | How R2 Meets It                                    |
| ------------------ | -------------------------------------------------- |
| Zero egress fees   | Native — no bandwidth costs                        |
| CDN integration    | Cloudflare CDN built-in                            |
| S3-compatible API  | Works with existing S3 tools                       |
| Cost               | 10 GB free, ~$0.015/GB/month after                 |
| Sri Lankan context | No egress fees means no unexpected bandwidth costs |

### Cost Breakdown

| Component            | Free Tier  | Paid Tier       |
| -------------------- | ---------- | --------------- |
| Storage              | 10 GB      | $0.015/GB/month |
| Class A Ops (writes) | 1 million  | $4.50/million   |
| Class B Ops (reads)  | 10 million | $0.36/million   |
| Egress               | Unlimited  | Free            |

**Realistic monthly cost:** $0.30–$1.20 (≈ 300–1,200 LKR)

---

## Alternatives Considered

### 1. AWS S3 (Rejected)

**Pros:**

- Industry standard
- Many tools and integrations

**Cons:**

- Egress fees (significant cost for a school website)
- Complex pricing structure
- Higher cost per GB

### 2. Backblaze B2 (Rejected)

**Pros:**

- Lower cost than S3
- S3-compatible

**Cons:**

- Egress fees
- Less integration with Cloudflare

### 3. Local Filesystem (Rejected)

**Pros:**

- Zero external cost

**Cons:**

- No CDN
- Not resilient (single server)
- Difficult to scale
- No backup off-site

---

## Consequences

### Positive

- Zero egress fees — no unexpected bandwidth costs
- Global CDN — fast delivery anywhere
- S3-compatible — can migrate to other providers if needed
- 10 GB free tier — more than enough for launch

### Negative

- Requires Cloudflare account
- Vendor lock-in (mitigated by S3 compatibility)

### Mitigations

- S3-compatible API means migration is possible
- Backups to secondary storage
- Documented migration procedure
