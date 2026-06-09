# Nexus Documentation

Welcome to the official documentation for **Nexus** – the digital institution of C.W.W. Kannangara Central College, Mathugama.

This documentation is maintained by the Kannangara ICT Society (KITS) and serves as the single source of truth for design, development, governance, and operations.

---

## Quick Links

| Section | Description |
|---------|-------------|
| [Design System](#design-system) | Visual language, tokens, components, page specs |
| [Technical Architecture](#technical-architecture) | Stack, infrastructure, deployment, performance |
| [Governance](#governance) | Content rules, accessibility, voice & tone |
| [Operations](#operations) | Launch checklist, analytics, asset inventory |
| [Proposal](#proposal) | Original project proposal and appendices |
| [Reference](#reference) | School brand identity, developer knowledge map |

---

## Design System

| File | Description |
|------|-------------|
| [Foundations](Design%20System/Foundations.md) | Design principles, theme, colour system, typography, spacing, motion, accessibility, component inventory |
| [Page Specifications](Design%20System/Page%20Specifications.md) | Detailed specs for every page – sections, components, data sources |
| [Tokens Reference](Design%20System/Tokens%20Reference.md) | Single source of truth for all token values (colours, spacing, typography, shadows, motion) |

---

## Technical Architecture

| File | Description |
|------|-------------|
| [Tech Stack & Infrastructure](technical/Tech%20Stack%20and%20Infrastructure.md) | Complete technology stack, monorepo structure, hosting |
| [Infrastructure & Deployment](technical/Infrastructure%20%26%20Deployment.md) | Hetzner VPS setup, Docker Compose, CI/CD, backups, disaster recovery |
| [Performance Budgets](technical/Performance%20Budgets.md) | Page-specific performance targets, image optimisation, Lighthouse CI |
| [SEO & Search Strategy](technical/SEO%20%26%20Search%20Strategy.md) | Metadata, structured data, sitemap, Open Graph, internal search |

---

## Governance

| File | Description |
|------|-------------|
| [Content Governance](governance/Content%20Governance.md) | Editorial roles, writing style, publishing workflow, archiving |
| [Institutional Voice & Tone Guide](governance/Institutional%20Voice%20%26%20Tone%20Guide.md) | Writing guidelines for English and Sinhala |
| [Accessibility Standards](governance/Accessibility%20Standards.md) | WCAG 2.1 AA compliance, keyboard navigation, screen readers, reduced motion |

---

## Operations

| File | Description |
|------|-------------|
| [Launch Readiness Checklist](operations/Launch%20Readiness%20Checklist.md) | Pre-launch verification – content, technical, security, operations |
| [Analytics & Events](operations/Analytics%20%26%20Events.md) | Umami setup, custom events, privacy compliance |
| [Assets Inventory](operations/Assets%20Inventory.md) | Required photographs, documents, and media – tracking checklist |

---

## Proposal

| File | Description |
|------|-------------|
| [Project Proposal](proposal/Project%20Proposal.md) | Original proposal to the Principal – objectives, scope, budget, timeline |
| [Appendix A – Technical Architecture Overview](proposal/Appendix%20A.md) | High-level architecture diagram and rationale |
| [Appendix B – Design System Summary](proposal/Appendix%20B.md) | Concise summary of visual identity (see Design System for full details) |
| [Appendix C – Asset Inventory](proposal/Appendix%20C.md) | Original asset checklist (see Operations for updated version) |

---

## Reference

| File | Description |
|------|-------------|
| [C.W.W. Kannangara Central College – Brand Identity](C.W.W.%20Kannangara%20Central%20College.md) | School history, motto, crest, values, Kannangarian identity |
| [Developer Knowledge Map](Developer%20Knowledge%20Map.md) | Learning roadmap for a single developer to build Nexus from scratch |

---

## Document Conventions

- **Design tokens** are defined in `Tokens Reference.md` and used via CSS custom properties (e.g., `var(--color-green-base)`).
- **Relative links** assume this `README.md` is in the `docs/` root folder.
- All documents are written in **Markdown** and should be readable on GitHub or any Markdown viewer.

---

## Maintenance

This documentation is version-controlled alongside the codebase. Updates are made via pull requests and reviewed by KITS leads. For questions or corrections, contact the KITS team.

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*