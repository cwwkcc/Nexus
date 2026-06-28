# Nexus Project Documentation

**C.W.W. Kannangara Central College Digital Platform**  
_Maintained by Kannangara ICT Society (KITS)_

Welcome to the complete documentation for the Nexus platform — the official digital institution of C.W.W. Kannangara Central College.

---

## Purpose

This documentation serves multiple audiences:

- **School administration** — Understand the project's scope, benefits, and governance
- **KITS developers** — Build, maintain, and extend the platform
- **Future maintainers** — Onboard quickly and operate the platform confidently
- **External auditors** — Verify decisions and compliance

All documentation is version-controlled alongside the source code. If you find a discrepancy between a document and the actual codebase, the code is the source of truth — please open an issue or pull request to correct the documentation.

---

## How to Navigate This Documentation

| If you want to…                                         | Start here                                                                                                 |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Understand the project's purpose and get approval**   | [`proposal/`](./proposal/) — Executive Summary, Project Proposal, Appendices                               |
| **See the complete build plan**                         | [`technical/Engineering Roadmap.md`](./technical/Engineering%20Roadmap.md)                                 |
| **Know exactly what features are included**             | [`technical/Feature Registry.md`](./technical/Feature%20Registry.md)                                       |
| **Understand the technical architecture**               | [`technical/Technical Architecture Overview.md`](./technical/Technical%20Architecture%20Overview.md)       |
| **Learn the design system**                             | [`design-system/`](./design-system/) — Foundations, Tokens, Components                                     |
| **Set up your development environment**                 | [`technical/Developer Onboarding Guide.md`](./technical/Developer%20Onboarding%20Guide.md)                 |
| **Perform operational tasks (deploy, backup, restore)** | [`operations/Runbook.md`](./operations/Runbook.md)                                                         |
| **Understand why key decisions were made**              | [`adr/`](./adr/) — Architecture Decision Records                                                           |
| **Manage content (who owns what, approval workflow)**   | [`governance/`](./governance/)                                                                             |
| **Work with translations**                              | [`i18n/`](./i18n/)                                                                                         |
| **Understand the school's identity and brand**          | [`reference/C.W.W. Kannangara Central College.md`](./reference/C.W.W.%20Kannangara%20Central%20College.md) |

---

## Documentation Structure

```
docs/
├── adr/                           # Architecture Decision Records
│   ├── ADR001 - Monorepo Architecture.md
│   ├── ADR002 - Next.js App Router.md
│   ├── ADR003 - PostgreSQL Selection.md
│   ├── ADR004 - tRPC Selection.md
│   ├── ADR005 - Zod contracts Strategy.md
│   ├── ADR006 - R2 Storage Selection.md
│   ├── ADR007 - Analytics Strategy.md
│   ├── ADR008 - Multilingual Font Architecture.md
│   └── ADR009 - Page Content Architecture.md
│
├── design-system/                 # Visual language and component library
│   ├── Foundations.md             # Principles, colours, typography, spacing, motion
│   ├── Tokens Reference.md        # All token values (single source of truth)
│   ├── Page Specifications.md     # Every page: sections, components, data sources
│   └── Component Reference.md     # All components: props, usage, status
│
├── governance/                    # Content policies and workflows
│   ├── Governance Overview.md
│   ├── Content Governance.md      # Ownership matrix, update frequencies
│   ├── Roles and Responsibilities.md
│   ├── Content Approval Workflow.md
│   ├── Content Guidelines.md      # Writing, image, accessibility standards
│   ├── Editorial Style Guide.md   # Tone, voice, style
│   ├── Accessibility Policy.md    # WCAG 2.1 AA compliance
│   ├── Social Media Governance.md
│   ├── Data Privacy Policy.md
│   ├── Content Review Schedule.md
│   └── Governance Approval Template.md
│
├── i18n/                          # Internationalisation
│   ├── Internationalisation (i18n) Overview.md
│   ├── Locale Management.md
│   ├── Translation Workflow.md
│   └── Font Configuration.md
│
├── operations/                    # Operational runbooks and procedures
│   ├── README.md                  # Operations overview and quick reference
│   ├── Runbook.md                 # Daily operations (deploy, backup, restore)
│   ├── Disaster Recovery Plan.md  # Recovery from every failure mode
│   ├── Environment Variables.md   # All env vars documented
│   ├── Deployment Checklist.md    # Pre-deployment checks
│   ├── Incident Response Plan.md
│   ├── Maintenance Schedule.md
│   ├── Google OAuth Setup.md
│   ├── Backup and Restore Procedure.md
│   └── Social Media Strategy.md
│
├── proposal/                      # Project proposal (for principal approval)
│   ├── Executive Summary.md
│   ├── Project Proposal.md
│   ├── Appendix A.md              # Technical Architecture Overview
│   ├── Appendix B.md              # Design System Summary
│   └── Appendix C.md              # Asset Inventory
│
├── reference/                     # Institutional reference materials
│   └── C.W.W. Kannangara Central College.md  # Brand, identity, history, values
│
├── technical/                     # Technical specifications
│   ├── Technical Architecture Overview.md
│   ├── Engineering Roadmap.md     # Complete phased build plan
│   ├── Feature Registry.md        # All 181 features (F-001 to F-181)
│   ├── Design System Summary.md
│   ├── Developer Onboarding Guide.md
│   └── Asset Inventory.md
│
└── README.md                      # This file
```

---

## Key Documents for Each Audience

### For the Principal / School Administration

1. **[Executive Summary](./proposal/Executive%20Summary.md)** — One-page overview
2. **[Project Proposal](./proposal/Project%20Proposal.md)** — Full proposal with budget, scope, approvals
3. **[Governance Overview](./governance/Governance%20Overview.md)** — Content ownership and policies
4. **[Asset Inventory](./proposal/Appendix%20C.md)** — What content needs to be collected

### For KITS Developers (Current and Future)

1. **[Developer Onboarding Guide](./technical/Developer%20Onboarding%20Guide.md)** — Environment setup, project structure, workflow
2. **[Engineering Roadmap](./technical/Engineering%20Roadmap.md)** — What to build and in what order
3. **[Feature Registry](./technical/Feature%20Registry.md)** — Complete list of features
4. **[Architecture Decision Records (ADRs)](./adr/)** — Why each technology was chosen
5. **[Runbook](./operations/Runbook.md)** — Day-to-day operational tasks

### For Content Editors

1. **[Content Guidelines](./governance/Content%20Guidelines.md)** — Writing, images, accessibility
2. **[Content Approval Workflow](./governance/Content%20Approval%20Workflow.md)** — How to publish
3. **[Editorial Style Guide](./governance/Editorial%20Style%20Guide.md)** — Tone and voice
4. **[Translation Workflow](./i18n/Translation%20Workflow.md)** — Adding new translations

### For External Auditors / Technical Reviewers

1. **[ADR-001 to ADR-009](./adr/)** — Decision rationale
2. **[Technical Architecture Overview](./technical/Technical%20Architecture%20Overview.md)**
3. **[Security Architecture](./technical/Technical%20Architecture%20Overview.md#security-architecture)** — Authentication, rate limiting, CSP
4. **[Data Privacy Policy](./governance/Data%20Privacy%20Policy.md)** — Compliance with GDPR and Sri Lankan law

---

## Document Status

| Category      | Status      | Last Updated |
| ------------- | ----------- | ------------ |
| ADRs          | ✅ Complete | June 2026    |
| Design System | ✅ Complete | June 2026    |
| Governance    | ✅ Complete | June 2026    |
| i18n          | ✅ Complete | June 2026    |
| Operations    | ✅ Complete | June 2026    |
| Proposal      | ✅ Complete | June 2026    |
| Reference     | ✅ Complete | June 2026    |
| Technical     | ✅ Complete | June 2026    |

---

## Conventions

### File Naming

- Use `Title Case with Spaces.md` for human-readable documents
- Use `kebab-case.md` for technical configuration references (if any)
- ADRs use `ADR### - Title.md` with a three-digit number

### Versioning

- All documents are versioned via Git
- Major changes require a pull request review
- ADRs are never edited after finalisation — reversals get new ADRs

### Cross-Referencing

- Use relative markdown links: `[document](./subfolder/file.md)`
- Reference features by their stable ID: `F-087` (from Feature Registry)
- Reference ADRs by number: `ADR-007`

---

## Contributing

1. Clone the repository
2. Make your changes to the relevant `.md` file
3. Run `pnpm lint:docs` (if available) to check for broken links
4. Commit with a clear message, e.g., `docs: update ADR-007 with implementation notes`
5. Open a pull request for review

---

## Contact

For questions about this documentation or the Nexus project:

| Role                   | Contact                                |
| ---------------------- | -------------------------------------- |
| **KITS Lead**          | [To be filled — contact Staff Advisor] |
| **Staff Advisor**      | Mrs. Tharindrie Perera                 |
| **Project Repository** | `https://github.com/cwwkcc/nexus`      |

---

## License

This documentation is © C.W.W. Kannangara Central College.  
All rights reserved. Internal use only.

---

_C.W.W. Kannangara Central College — Est. 1873 — "Wisdom is All Wealth"_
