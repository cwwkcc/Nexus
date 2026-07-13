#!/bin/bash
set -euo pipefail

# Secret rotation script (F-121)
# Rotates a named credential (DB password, Auth.js secret, R2 keys, Resend API key)
# without service downtime. Documents which services need restarting.

# Configuration
SECRETS_DIR="/opt/nexus/secrets"
ENV_FILE="/opt/nexus/.env"
DEPLOY_DIR="/opt/nexus"

# Check arguments
if [ $# -lt 1 ]; then
  echo "Usage: $0 <secret_name> [new_value]"
  echo "Available secrets: DB_PASSWORD, NEXTAUTH_SECRET, R2_ACCESS_KEY, R2_SECRET_KEY, RESEND_API_KEY"
  exit 1
fi

SECRET_NAME="$1"
NEW_VALUE="${2:-$(openssl rand -base64 32)}"

# Map secret names to environment variable names
case "$SECRET_NAME" in
  DB_PASSWORD)
    ENV_VAR="DATABASE_URL"
    SERVICE_RESTART="postgres nexus-web nexus-admin"
    ;;
  NEXTAUTH_SECRET)
    ENV_VAR="NEXTAUTH_SECRET"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  R2_ACCESS_KEY)
    ENV_VAR="R2_ACCESS_KEY_ID"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  R2_SECRET_KEY)
    ENV_VAR="R2_SECRET_ACCESS_KEY"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  RESEND_API_KEY)
    ENV_VAR="RESEND_API_KEY"
    SERVICE_RESTART="nexus-web nexus-admin"
    ;;
  *)
    echo "Error: Unknown secret '$SECRET_NAME'"
    exit 1
    ;;
esac

# Backup current .env
echo "Backing up current .env..."
cp "$ENV_FILE" "$ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)"

# Update secret in .env
echo "Updating $SECRET_NAME in .env..."
if grep -q "^${ENV_VAR}=" "$ENV_FILE"; then
  sed -i "s/^${ENV_VAR}=.*/${ENV_VAR}=${NEW_VALUE}/" "$ENV_FILE"
else
  echo "${ENV_VAR}=${NEW_VALUE}" >> "$ENV_FILE"
fi

# Store secret in secrets directory
echo "Storing secret in secrets directory..."
echo "$NEW_VALUE" > "$SECRETS_DIR/${SECRET_NAME}"

# Restart affected services
echo "Restarting affected services: $SERVICE_RESTART"
cd "$DEPLOY_DIR"
docker compose restart $SERVICE_RESTART

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
sleep 10

# Verify services are running
if docker compose ps | grep -q "Up"; then
  echo "✓ Services are running"
else
  echo "✗ Services failed to start. Restoring backup..."
  cp "$ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)" "$ENV_FILE"
  docker compose restart $SERVICE_RESTART
  exit 1
fi

echo "Secret rotation completed successfully for $SECRET_NAME"
echo "Backup saved to: $ENV_FILE.backup.$(date +%Y%m%d_%H%M%S)"
