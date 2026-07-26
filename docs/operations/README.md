# Operations Overview

This directory contains all operational documentation for the Nexus platform. These documents are written for system administrators, future KITS members, and school IT staff who will maintain the platform after launch.

---

## Document Index

_As of this revision: the four stub files this table used to point at (`Runbook.md`, `Disaster-Recovery.md`, `Incident-Response.md`, and their hyphenated names never matching any real file's spacing) have been deleted — they were empty placeholders left over from early scaffolding, each superseded by a fully written document under a different name below. `Secrets Rotation Procedures.md` was also a placeholder with no full version anywhere; it's listed below as not yet written, not deleted, since the work itself is still outstanding (F-135)._

| Document                                                                                            | Purpose                                       | When to Use                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Operational Runbook.md](https://claude.ai/chat/Operational%20Runbook.md)**                       | Daily operational procedures                  | For routine tasks: deployments, backups, user management                                                                                                                          |
| **[Disaster Recovery Plan.md](https://claude.ai/chat/Disaster%20Recovery%20Plan.md)**               | Recovery from failures                        | When something breaks: server down, database corrupt, domain lost                                                                                                                 |
| **[Environment Variables.md](https://claude.ai/chat/Environment%20Variables.md)**                   | All environment variables                     | When setting up a new environment or adding a new variable                                                                                                                        |
| **[Content Governance.md](https://claude.ai/governance/Content%20Governance.md)**                   | Content ownership and responsibilities        | For content editors: who owns what and how often to update. **Lives in `docs/governance/`, not this folder** — an outdated partial copy previously sat here and has been removed. |
| **[Google OAuth Setup.md](https://claude.ai/chat/Google%20OAuth%20Setup.md)**                       | Google Cloud Console configuration            | When setting up OAuth for the first time or reconfiguring                                                                                                                         |
| **[Social Media Strategy.md](https://claude.ai/chat/Social%20Media%20Strategy.md)**                 | Social media management                       | For social media editors: what to post, when, and on which platforms                                                                                                              |
| **[Backup and Restore Procedure.md](https://claude.ai/chat/Backup%20and%20Restore%20Procedure.md)** | Backup and restore steps                      | For performing backups or restoring from backup                                                                                                                                   |
| **[Deployment Checklist.md](https://claude.ai/chat/Deployment%20Checklist.md)**                     | Pre-deployment checks                         | Before every deployment to production                                                                                                                                             |
| **[Incident Response Plan.md](https://claude.ai/chat/Incident%20Response%20Plan.md)**               | Security incident response                    | When a security incident is suspected or confirmed                                                                                                                                |
| **[Maintenance Schedule.md](https://claude.ai/chat/Maintenance%20Schedule.md)**                     | Regular maintenance tasks                     | For scheduled maintenance: weekly, monthly, yearly                                                                                                                                |
| _Secrets Rotation Procedures.md_                                                                    | Rotating credentials without downtime (F-135) | **Not yet written** — currently a placeholder only                                                                                                                                |

---

## Quick Reference

### Important Contacts

| Role             | Name                   | Contact        |
| ---------------- | ---------------------- | -------------- |
| Technical Lead   | KITS Lead              | [To be filled] |
| Staff Advisor    | Mrs. Tharindrie Perera | [To be filled] |
| Principal        | [To be filled]         | [To be filled] |
| Hosting Provider | Hetzner                | [Support URL]  |
| Domain Registrar | [To be filled]         | [To be filled] |

### Important URLs

| Service              | URL                           |
| -------------------- | ----------------------------- |
| Public Website       | https://cwwkcc.lk             |
| Admin Panel          | https://admin.cwwkcc.lk       |
| GitHub Repository    | https://github.com/kits/nexus |
| Hetzner Console      | https://console.hetzner.com   |
| Cloudflare Dashboard | https://dash.cloudflare.com   |
| UptimeRobot          | https://uptimerobot.com       |

### Server Information

| Detail     | Value                                     |
| ---------- | ----------------------------------------- |
| Provider   | Hetzner                                   |
| Plan       | CPX22                                     |
| vCPU       | 2                                         |
| RAM        | 4 GB                                      |
| Storage    | 40 GB SSD                                 |
| Location   | Nuremberg, Germany (or closest available) |
| IP Address | [To be filled]                            |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
