# Technical Architecture Overview

**Project:** Nexus – C.W.W. Kannangara Central College  
**Prepared by:** Kannangara ICT Society (KITS)  
**Date:** June 2026

---

## Overview

Nexus is built as a single, self-contained application running on a dedicated **Hetzner VPS**. It combines the public website and the staff admin panel into one codebase, communicates with a PostgreSQL database for dynamic content, and stores all uploaded files in Cloudflare R2. Every component is free and open-source.

The architecture is designed for:

- **Reliability** – industry-standard tools with large support communities
- **Security** – full control over server, encrypted traffic, no third-party CMS
- **Simplicity** – one server, one application, minimal moving parts
- **Maintainability** – fully documented stack that future KITS members can manage

---

## System Architecture Diagram

```
## System Architecture Diagram

┌──────────────────────────────────────────────────────────────┐
│                    VISITORS & STAFF                          |
│                Desktop · Mobile · Tablet                     │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE                           │
│               DNS · CDN · DDoS Protection                    │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                 CADDY (Hetzner VPS)                          │
│      SSL Termination · Reverse Proxy · Security Headers      │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              NEXT.JS APPLICATION (Node.js)                  │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │     Public Website   │  │      Admin Panel (Custom)    │ │
│  │                      │  │                              │ │
│  │ • Home               │  │ • News Management            │ │
│  │ • About              │  │ • Staff Management           │ │
│  │ • News               │  │ • Society Management         │ │
│  │ • Societies          │  │ • Image Uploads              │ │
│  │ • Admissions         │  │ • Site Settings              │ │
│  │ • More Pages         │  │ • Staff Authentication       │ │
│  └──────────────────────┘  └──────────────────────────────┘ │
└───────────────┬────────────────┬────────────────┬───────────┘
                │                │                │
                ▼                ▼                ▼

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   PostgreSQL    │  │  Cloudflare R2  │  │      Umami      │
│                 │  │                 │  │                 │
│ • Content Data  │  │ • Images        │  │ • Analytics     │
│ • User Accounts │  │ • PDFs          │  │ • Self-hosted   │
│ • Settings      │  │ • Documents     │  │ • No PII Data   │
└─────────────────┘  └─────────────────┘  └─────────────────┘
          │
          ▼
┌─────────────────┐
│     Resend      │
│                 │
│ • Contact Forms │
│ • Notifications │
│ • System Emails │
└─────────────────┘

```

Note:
All components except Cloudflare R2 and Resend run on the same
Hetzner VPS. The school owns and controls all infrastructure.

---
## System Layers

### Layer 1 – User Browser

Any visitor accesses the site via `cwwkcc.lk`. The site is optimised for low-bandwidth mobile connections.

### Layer 2 – Cloudflare (DNS & Protection)

- DNS management, DDoS protection, CDN for static assets.

### Layer 3 – Web Server (Caddy)

- Automatic SSL certificates (Let's Encrypt), reverse proxy to Next.js, security headers.

### Layer 4 – Application (Next.js)

- **Public website** – pre-rendered pages for speed and SEO.
- **Admin panel** – staff sign in with their existing `@cwwkcc.lk` Google account (Auth.js + Google Workspace OAuth). A colleague's email must first be added by an existing Admin before their Google sign-in is accepted — Google authentication alone is not sufficient. A single break-glass credentials account exists for bootstrap and emergency recovery only. No coding required to manage content (news, societies, staff, facilities, gallery).

### Layer 5 – Database (PostgreSQL)

- Stores all dynamic content: news articles, society records, staff profiles, admissions data, and admin user records (most accounts authenticate via Google — only the break-glass account has a bcrypt-hashed password). Runs on the same VPS, not exposed to the internet.

### Layer 6 – File Storage (Cloudflare R2)

- All uploaded images and PDFs stored in R2. 10GB free, zero egress fees. Images are optimised (WebP, resized) before upload via Sharp.

### Layer 7 – Analytics (Umami)

- Self-hosted, open-source, privacy-focused analytics. No cookies or personal data collected.

### Layer 8 – Email (Resend)

- Sends contact form submissions and admin notifications. Free tier (3,000 emails/month).

---

## Infrastructure Summary

| Component         | Provider                                 | Cost              |
| ----------------- | ---------------------------------------- | ----------------- |
| VPS Server        | Hetzner CX22 (2 vCPU, 4GB RAM, 40GB SSD) | ≈ LKR 1,500/month |
| Domain            | `cwwkcc.lk`                              | ≈ LKR 1,0000/year |
| DNS & CDN         | Cloudflare (free tier)                   | Free              |
| File Storage      | Cloudflare R2 (free tier, 10GB)          | Free              |
| SSL Certificate   | Let's Encrypt via Caddy                  | Free              |
| Email Delivery    | Resend (free tier, 3,000/month)          | Free              |
| Analytics         | Umami (self-hosted on same VPS)          | Free              |
| **Monthly Total** |                                          | **≈ LKR 2,500**   |

---

## Security Architecture

|Measure|Implementation|
|---|---|
|Encrypted traffic|HTTPS enforced via Let's Encrypt|
|Secrets management|Environment variables, never in code|
|Input validation|Zod schemas on server and client|
|Staff sign-in|Google Workspace OAuth restricted to `@cwwkcc.lk`, verified server-side — never trusted from the OAuth claim alone|
|Admin access control|Invite-only: an existing Admin must add a colleague's `@cwwkcc.lk` email before their Google sign-in is accepted|
|Break-glass account|One bcrypt-hashed credentials account for bootstrap/recovery only, protected by mandatory TOTP two-factor|
|Everyday admin 2FA|Inherited from the school's own Google Workspace 2FA policy — not managed by Nexus|
|Database isolation|PostgreSQL not exposed to public|
|Dependency vulnerability scanning|`pnpm audit` in CI (GitHub Actions) — fails the build on high-severity vulnerabilities|
|Uptime monitoring|UptimeRobot (free) – email alerts|
|Backups|Automated database backups via cron to R2|

---

## Access Control

|Role|Access Level|
|---|---|
|Public visitor|Read-only access to public pages|
|Editor (teacher/KITS)|Create and edit content (news, societies, staff, events); cannot manage users, access settings, or delete published content|
|Admin|Full content access, user management, settings|
|Server Access|Restricted to designated KITS maintainers under staff oversight|

---

## Codebase & Version Control

- Private GitHub repository under school's institutional email.
- Full history, rollback capability, collaborative development with code review.
- Complete handover documentation for future maintainers.

---

## Disaster Recovery

- Database backups: daily `pg_dump` to R2, retained 30 days.
- Configuration backups: Infrastructure as Code (Docker Compose, Caddyfile) in Git.
- Recovery procedures for every failure mode — server failure, database corruption, accidental content deletion, domain loss, GitHub repository loss, R2 storage failure — documented in `docs/operations/Disaster Recovery.md`, with estimated recovery times for each.
- Day-to-day operational procedures (deploy a change, roll back a deployment, restore from backup, add an admin user, renew a TLS certificate) documented in `docs/operations/Runbook.md`.

---

## Documentation

Comprehensive technical and operational documentation maintained alongside the codebase to ensure continuity between student cohorts and enable future maintenance.

---

_Nexus – C.W.W. Kannangara Central College_  
_"Wisdom is All Wealth" – Est. 1873_