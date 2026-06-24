# adr/ADR-003-postgresql.md

**Date:** June 2026

**Status:** Accepted

---

## Context

The Nexus platform requires a database that supports:

- Relational data with complex relationships
- JSON content storage (for rich text, form data)
- Full-text search across three scripts (English, Sinhala, Tamil)
- Transactional integrity
- Long-term reliability
- Self-hosting (no vendor lock-in)

The options considered:

1. **PostgreSQL** — Battle-tested relational database
2. **MySQL** — Popular relational database
3. **MongoDB** — Document database
4. **Supabase** — PostgreSQL as a service
5. **PlanetScale** — MySQL as a service

---

## Decision

Use **PostgreSQL 15+**.

### Justification

| Requirement             | How PostgreSQL Meets It                    |
| ----------------------- | ------------------------------------------ |
| Relational data         | Native with schema, relations, constraints |
| JSON content            | `JSONB` type with indexing                 |
| Full-text search        | `tsvector` with Sinhala/Tamil support      |
| Transactional integrity | ACID compliant                             |
| Self-hosting            | Can run on Hetzner VPS                     |
| Cost                    | Free and open-source                       |

---

## Alternatives Considered

### 1. MySQL (Rejected)

**Pros:**

- Widely used
- Good performance for read-heavy workloads

**Cons:**

- JSON support less mature than PostgreSQL
- Full-text search with Sinhala/Tamil is more complex
- Fewer advanced features (e.g., `JSONB`, partial indexes)

### 2. MongoDB (Rejected)

**Pros:**

- Flexible schema
- Excellent for document storage

**Cons:**

- No relational integrity
- No full-text search across languages
- Transaction support is less mature
- Not ideal for relational data

### 3. Supabase / PlanetScale (Rejected)

**Pros:**

- Managed service (less operations overhead)

**Cons:**

- Vendor lock-in
- Higher cost than self-hosting
- Egress fees

---

## Consequences

### Positive

- Battle-tested and reliable
- Excellent JSON support with `JSONB`
- Full-text search with Sinhala/Tamil using `zhparser` or custom dictionaries
- Self-hosted on Hetzner (full control, no vendor lock-in)
- Free and open-source

### Negative

- Requires backup management
- Requires connection pooling setup
- Manual deployment (no managed service)

### Mitigations

- Automated nightly backups to R2
- Connection pooling with `pgBouncer` or Prisma's built-in pooling
- Documented backup and restore procedures

---
