# Nexus — Deployment Checklist

**Pre-deployment checks for every deployment**

---

## Purpose

This checklist ensures every deployment to production is safe and complete. Running through this checklist before each deployment prevents common issues.

---

## Before Deployment

### Code Review

- [ ] All changes have been reviewed by at least one other person
- [ ] The pull request is approved
- [ ] All tests are passing (CI is green)
- [ ] No linting or typecheck errors
- [ ] The feature works as expected in development

### Database Migrations

- [ ] Any database migrations have been tested in development
- [ ] The migration is reversible (in case of rollback)
- [ ] The migration has been reviewed by the team
- [ ] The migration has been included in the PR

### Environment Variables

- [ ] Any new environment variables have been added to `.env.example`
- [ ] New variables have been added to GitHub Secrets (for CI/CD)
- [ ] New variables have been added to the Hetzner server `.env` file
- [ ] The variables have been tested in development

### Documentation

- [ ] Any new features are documented in the relevant files
- [ ] The Feature Registry is updated (if adding a new feature)
- [ ] The Engineering Roadmap is updated (if changing the build order)

---

## During Deployment

### CI/CD Pipeline

- [ ] Check the GitHub Actions workflow is running
- [ ] Check for any errors in the deployment logs
- [ ] Verify the Docker images are built and pushed successfully
- [ ] Verify the images are pulled on the Hetzner server

### Health Checks

```bash
# Run these commands after deployment
curl https://cwwkcc.lk/api/health
curl https://admin.cwwkcc.lk/api/health
```

- [ ] Public site health check returns `{"status":"ok"}`
- [ ] Admin panel health check returns `{"status":"ok"}`

### Site Verification

- [ ] The public site loads (`https://cwwkcc.lk`)
- [ ] The admin panel loads (`https://admin.cwwkcc.lk`)
- [ ] The home page loads correctly
- [ ] A sample news article loads correctly
- [ ] The digital archive loads correctly
- [ ] The gallery loads correctly
- [ ] The contact form works (test submission)
- [ ] The search works (test a sample query)

---

## After Deployment

### Database Verification

- [ ] The database is accessible (test a simple query)
- [ ] No database errors in the application logs
- [ ] Content is displayed correctly (check a random page)

### Monitoring

- [ ] UptimeRobot shows both sites as "UP"
- [ ] No alerts from monitoring services
- [ ] Server CPU and memory usage are normal
- [ ] No error spikes in the application logs

### Rollback Plan

- [ ] The previous image tag is known (from the last successful deployment)
- [ ] The rollback procedure is documented (see Runbook.md)
- [ ] The team knows how to roll back if needed

---

## Quick Reference

### Health Check Commands

```bash
# Check public site health
curl https://cwwkcc.lk/api/health
# Expected: {"status":"ok"}

# Check admin site health
curl https://admin.cwwkcc.lk/api/health
# Expected: {"status":"ok"}
```

### Rollback Command

```bash
# Rollback to a specific commit SHA
cd /opt/nexus
docker compose stop nexus-web nexus-admin
docker compose pull nexus-web:commit-sha nexus-admin:commit-sha
docker compose up -d nexus-web nexus-admin
```

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

---

## Changelog

**This revision** — replaced "The results portal loads correctly" with a digital archive check; the results portal was cut from scope.