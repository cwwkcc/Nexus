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

**See the note under Quick Reference below — `/api/health` doesn't exist in the codebase yet.**

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
- [ ] The rollback procedure is documented (see `Operational Runbook.md`)
- [ ] The team knows how to roll back if needed

---

## Quick Reference

### Health Check Commands

**⚠️ `/api/health` doesn't exist in the codebase yet** — there's no route file for it anywhere in `apps/web` or `apps/admin`. This is a real gap, not just a documentation one: `.github/workflows/deploy.yml`'s deploy job depends on exactly this endpoint (`curl --fail ... https://cwwkcc.lk/api/health`) to decide whether to roll back. Until this route is built, any deployment through that pipeline will fail its own health check and trigger an automatic rollback — worth building this before relying on the CD pipeline for a real deployment. The response shape below is therefore a proposed target, not a confirmed one.

```bash
# Check public site health
curl https://cwwkcc.lk/api/health
# Proposed: {"status":"ok"}

# Check admin site health
curl https://admin.cwwkcc.lk/api/health
# Proposed: {"status":"ok"}
```

### Rollback Command

**This doc's own rollback command doesn't match how rollback actually works in `deploy.yml`.** The real pipeline already rolls back _automatically_ on health-check failure — it isn't something to invoke by hand in the normal case. Its mechanism: before deploying, it copies the current `.env` to `.env.rollback`; if the health checks fail after the new containers come up, it restores `.env.rollback` over `.env` and re-runs `docker compose pull && docker compose up -d --wait`, which pulls back the _previous_ image tags recorded in that restored `.env`. There's no `docker compose pull nexus-web:commit-sha` form — Compose doesn't take an image tag as a pull argument like that.

To manually roll back to a specific earlier commit (e.g., outside the automatic path, or to go back further than one deployment):

```bash
cd /opt/nexus
sed -i '/^WEB_IMAGE_TAG=/d;/^ADMIN_IMAGE_TAG=/d;/^MIGRATE_IMAGE_TAG=/d' .env
{
  echo "WEB_IMAGE_TAG=<previous-commit-sha>"
  echo "ADMIN_IMAGE_TAG=<previous-commit-sha>"
  echo "MIGRATE_IMAGE_TAG=<previous-commit-sha>"
} >> .env
docker compose pull
docker compose up -d --wait --wait-timeout 120
```

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

---

## Changelog

**This revision** — fixed a broken link to a file that's since been deleted (`Runbook.md` → `Operational Runbook.md`); flagged that `/api/health` doesn't exist anywhere in the codebase yet, even though `.github/workflows/deploy.yml`'s automatic rollback depends on it; and rewrote the Rollback Command section, which described a manual procedure that doesn't match how `deploy.yml`'s real rollback mechanism actually works (`.env.rollback` restore + re-pull, not a per-service tag argument to `docker compose pull`).

**Previous revision** — replaced "The results portal loads correctly" with a digital archive check; the results portal was cut from scope.
