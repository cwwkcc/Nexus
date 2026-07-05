# Nexus — Maintenance Schedule

**Regular maintenance tasks for the platform**

---

## Overview

This document defines the regular maintenance tasks required to keep the Nexus platform healthy and secure.

---

## Daily Tasks

|Task|Time|Owner|Notes|
|---|---|---|---|
|Check UptimeRobot alerts|Morning|KITS Lead|Verify both sites are up|
|Review server logs|Morning|KITS Lead|Check for errors|
|Check database backups|Morning|KITS Lead|Verify backup completed|

---

## Weekly Tasks

|Task|Day|Owner|Notes|
|---|---|---|---|
|Review analytics|Monday|KITS Lead|Check traffic trends|
|Review pending content|Monday|Staff Advisor|Approve pending articles|
|Check security updates|Wednesday|KITS Lead|Review available updates|
|Review editor activity|Friday|Staff Advisor|Check audit log|

---

## Monthly Tasks

|Task|When|Owner|Notes|
|---|---|---|---|
|Review content|1st|Staff Advisor|Check for stale content|
|Review backups|1st|KITS Lead|Verify backup integrity|
|Rotate passwords|1st|KITS Lead|Admin passwords|
|Update dependencies|1st|KITS Lead|Review available updates|

---

## Quarterly Tasks

|Task|When|Owner|Notes|
|---|---|---|---|
|Disaster recovery test|Jan, Apr, Jul, Oct|KITS Lead|Restore from backup|
|Security audit|Jan, Apr, Jul, Oct|KITS Lead|Review security posture|
|Performance review|Jan, Apr, Jul, Oct|KITS Lead|Check Lighthouse scores|
|Stakeholder review|Jan, Apr, Jul, Oct|Principal|Review progress|

---

## Yearly Tasks

|Task|When|Owner|Notes|
|---|---|---|---|
|SSL certificate review|Jan|KITS Lead|Verify auto-renewal|
|Domain renewal|Jan|Administration|Renew `cwwkcc.lk`|
|Budget review|Jan|Principal|Review hosting costs|
|Governance review|Jan|Principal|Update content governance|
|Social media strategy review|Jan|Staff Advisor|Update social media strategy|

---

## Task Details

### Review Analytics (Weekly)

1. Log in to the admin panel
2. Navigate to Analytics Dashboard
3. Check:
    - Total page views (trend)
    - Most viewed pages
    - Search terms
    - Locale distribution
    - Device distribution

### Review Pending Content (Weekly)

1. Log in to the admin panel
2. Navigate to Dashboard
3. Check:
    - Draft articles pending review
    - Alumni profiles pending approval
    - Events pending publication

### Check Security Updates (Weekly)

```bash
# SSH into the server
ssh user@server-ip

# Check for system updates
sudo apt update
sudo apt list --upgradable

# Check for Docker image updates
docker pull ghcr.io/kits/nexus-web:latest
docker pull ghcr.io/kits/nexus-admin:latest

# Check for npm vulnerabilities
cd /opt/nexus
pnpm audit
```

### Update Dependencies (Monthly)

```bash
# Locally
cd nexus
pnpm update --latest

# Run tests
pnpm test

# Deploy changes if tests pass
```

---

## Maintenance Log

```markdown
# Maintenance Log

## YYYY-MM-DD

### Tasks Completed
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Issues Found
- [ ] Issue 1
- [ ] Issue 2

### Resolutions
- [ ] Resolution 1
- [ ] Resolution 2

### Next Maintenance
- Date: YYYY-MM-DD
- Focus: [topic]

---
```

---

## Sign-off

This maintenance schedule is approved by:

|Role|Name|Signature|Date|
|---|---|---|---|
|Principal||||
|Staff Advisor|Mrs. Tharindrie Perera|||
|KITS Lead||||

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

## End of Operations Documentation

---

## Changelog

**This revision** — removed "Results portal usage" from the weekly analytics review checklist; the results portal was cut from scope.