# Nexus — Secrets Rotation Procedures (F-135)

**Status: real scripts exist — this document was a placeholder despite that.** `infra/scripts/rotate-secret.sh` and `infra/scripts/rotate-breakglass-password.sh` are both real, working scripts. This document is built directly from reading them.

---

## Rotating a Standard Secret

`infra/scripts/rotate-secret.sh` rotates one named credential without taking the whole platform down.

```bash
# Rotate with an auto-generated random value
./infra/scripts/rotate-secret.sh DB_PASSWORD

# Rotate with a specific value you supply
./infra/scripts/rotate-secret.sh NEXTAUTH_SECRET "my-new-secret"
```

### Supported Secrets

| Script argument   | Actual env var         | Services restarted                     |
| ----------------- | ---------------------- | -------------------------------------- |
| `DB_PASSWORD`     | `DATABASE_URL`         | `postgres`, `nexus-web`, `nexus-admin` |
| `NEXTAUTH_SECRET` | `NEXTAUTH_SECRET`      | `nexus-web`, `nexus-admin`             |
| `R2_ACCESS_KEY`   | `R2_ACCESS_KEY_ID`     | `nexus-web`, `nexus-admin`             |
| `R2_SECRET_KEY`   | `R2_SECRET_ACCESS_KEY` | `nexus-web`, `nexus-admin`             |
| `RESEND_API_KEY`  | `RESEND_API_KEY`       | `nexus-web`, `nexus-admin`             |

### What It Does

1. Backs up the current `.env` to `.env.backup.<timestamp>`
2. Writes the new value into `.env` (or appends the line if it wasn't there)
3. Also stores the new value separately at `/opt/nexus/secrets/<SECRET_NAME>`
4. Restarts only the affected services (not the whole stack)
5. Waits 10 seconds, then checks `docker compose ps` for `Up` — if that check fails, it attempts to restore the `.env` backup and restart again

### ⚠️ Two real bugs worth knowing before relying on this script

1. **`DB_PASSWORD` doesn't do what its name implies.** `DATABASE_URL` is a full connection string (`postgresql://user:password@host:port/db`), but the script's `sed` replaces the _entire_ `DATABASE_URL` line with just the bare new value — it doesn't rotate the password piece inside the existing connection string. Running `./rotate-secret.sh DB_PASSWORD` as documented would overwrite `DATABASE_URL` with something that isn't a valid connection string at all. This needs fixing in the script itself before this path is trustworthy; until then, rotate the database password manually and reconstruct the full connection string by hand.
2. **The failure-recovery path references the wrong backup file.** If the post-restart health check fails, the script tries to restore from `.env.backup.$(date +%Y%m%d_%H%M%S)` — but that re-runs the timestamp command a second time, producing a _different_ timestamp than the one used when the backup was actually created a few lines earlier. The restore `cp` will look for a file that doesn't exist. If a rotation fails this way, don't trust the script's own recovery — find the actual `.env.backup.*` file by hand (`ls -la /opt/nexus/.env.backup.*`) and restore it manually.

---

## Rotating the Break-Glass Admin Password

`infra/scripts/rotate-breakglass-password.sh` rotates the password for the break-glass admin account (`admin@cwwkcc.lk`, F-064) directly in the database — no email reset flow, no internet-facing surface for the platform's highest-privilege account.

```bash
# Must be run over SSH, on the production server
./infra/scripts/rotate-breakglass-password.sh <new_password>
```

### Requirements

- Must be run over SSH directly on the production server (not locally, not via CI).
- New password must be at least 16 characters — the script rejects anything shorter.
- Hashes the password with argon2id before storing it (`argon2 ... -e -id -t 3 -m 65536 -p 4`) — never stores it in plaintext.
- Updates the `User` row matching `email = 'admin@cwwkcc.lk' AND role = 'ADMIN'`, then verifies exactly one row was affected before reporting success.

### After Rotating

The script prints a reminder itself: store the new password securely and destroy the SSH session/terminal history where you typed it.

---

## Rotation Schedule

No rotation schedule currently exists anywhere in the repo (not in a cron job, not in CI). `Maintenance Schedule.md` and `Security Incident Response`-adjacent docs don't reference a recurring rotation cadence either. Establishing one — annually at minimum, or immediately after any suspected exposure — is still outstanding work, not just a documentation gap.

---

## Important

These scripts touch production credentials directly. Test any rotation against a non-production environment first if one exists, and always confirm you have a way to recover (a known-good `.env` backup, and — for the break-glass account specifically — another way into the admin panel) before running either script against production.
