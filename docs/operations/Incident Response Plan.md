# Nexus — Incident Response Plan

**Handling security and operational incidents**

---

## Overview

This document defines the incident response process for the Nexus platform. It covers:

1. **Incident Types** — What constitutes an incident
2. **Response Process** — Step-by-step response
3. **Roles and Responsibilities** — Who does what
4. **Communication Plan** — Who to tell and when

---

## Incident Types

| Type | Description | Priority |
|------|-------------|----------|
| **Service Outage** | Site is down or unreachable | Critical |
| **Data Breach** | Unauthorised access to data | Critical |
| **Unauthorised Access** | Admin account compromised | High |
| **Data Loss** | Content deleted or corrupted | High |
| **Content Violation** | Inappropriate content published | Medium |
| **Performance Degradation** | Site is slow or unresponsive | Medium |
| **Security Alert** | Potential threat detected | Medium |

---

## Incident Response Process

### 1. Detection

**How incidents are detected:**

- UptimeRobot alerts (service down)
- User reports (via contact form, email, or phone)
- Security monitoring (Google Workspace alerts, Cloudflare alerts)
- Staff reports (admin panel issues)
- Audit log review

### 2. Triage

**Initial assessment:**

- What happened?
- When did it happen?
- What is the impact?
- Who is affected?

### 3. Containment

**Stop the incident from spreading:**

| Incident Type | Containment Action |
|---------------|-------------------|
| Service outage | Check server, restart services |
| Data breach | Change passwords, revoke access |
| Unauthorised access | Log out all sessions, reset passwords |
| Data loss | Stop writes, restore from backup |
| Content violation | Remove content, restrict editor access |

### 4. Investigation

**Determine the root cause:**

- Review logs
- Check audit trails
- Interview affected parties
- Analyse the timeline

### 5. Resolution

**Fix the issue:**

- Restore from backup (if needed)
- Apply security patches (if needed)
- Update configurations (if needed)
- Notify affected users (if needed)

### 6. Post-Incident Review

**Learn from the incident:**

- What happened?
- Why did it happen?
- How was it fixed?
- What can we do to prevent it?

---

## Incident Response Timeline

| Phase | Timeframe | Action |
|-------|-----------|--------|
| Detection | 0-5 minutes | Alert received |
| Triage | 5-15 minutes | Initial assessment |
| Containment | 15-30 minutes | Stop the spread |
| Investigation | 30-120 minutes | Find the cause |
| Resolution | 1-4 hours | Fix the issue |
| Review | 24-48 hours | Document and improve |

---

## Roles and Responsibilities

| Role | Responsibility | Primary Contact |
|------|----------------|-----------------|
| **Incident Commander** | Overall incident management | KITS Lead |
| **Technical Lead** | Technical investigation and fix | KITS Lead |
| **Communication Lead** | Internal and external communication | Staff Advisor |
| **Security Lead** | Security investigation | KITS Lead (with Staff Advisor) |
| **Auditor** | Post-incident review | Staff Advisor |

---

## Communication Plan

### Internal Communication

| Audience | Method | Timing |
|----------|--------|--------|
| KITS Team | WhatsApp/Teams | Immediately |
| Staff Advisor | Phone/WhatsApp | Immediately |
| Principal | Phone/WhatsApp | Within 15 minutes |

### External Communication

| Audience | Method | Timing |
|----------|--------|--------|
| Users | Website banner, social media | Within 1 hour |
| Parents | WhatsApp Channel | Within 2 hours |
| Media | School administration | As needed |

---

## Incident Response Templates

### Service Outage

**Internal Alert:**

```
SERVICE OUTAGE

Time: [timestamp]
Service: [public site / admin panel / both]
Impact: [users affected / all users]
Status: [investigating / contained / resolved]

Action: [restarting services / restoring backup]
```

### Security Incident

```
SECURITY INCIDENT

Time: [timestamp]
Type: [data breach / unauthorised access / content violation]
Impact: [description]
Status: [investigating / contained / resolved]

Action: [changing passwords / revoking access / restoring backup]
```

---

## Post-Incident Review Template

```markdown
# Incident Review

## Summary
- **Incident ID:** INC-001
- **Date:** YYYY-MM-DD
- **Type:** [service outage / security incident]
- **Duration:** [start time] - [end time]
- **Impact:** [description]

## Timeline
- **T-0:** [incident detected]
- **T+15m:** [triage complete]
- **T+30m:** [containment complete]
- **T+2h:** [resolution complete]
- **T+24h:** [post-incident review]

## Root Cause
[description of what caused the incident]

## Resolution
[description of how it was fixed]

## Prevention
[actions to prevent recurrence]

## Lessons Learned
[what we learned from this incident]
```

---

## Escalation Path

| Level | Contact | Method |
|-------|---------|--------|
| 1 | KITS Lead | Phone (primary) |
| 2 | Staff Advisor | Phone |
| 3 | Principal | Phone |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

