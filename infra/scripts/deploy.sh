#!/bin/bash
set -euo pipefail

# Zero-downtime deployment script (F-010)
# Called by GitHub Actions CD pipeline.
# SSH into Hetzner, pull new images from GHCR, restart services.
# Waits for Docker healthchecks to report healthy before marking success.
# No changes needed here — matches docs/operations/Deployment Checklist.md
# and Appendix A §A.7, and F-010 is the one feature tag in this directory
# that already matched the current Feature Registry.

# Configuration
DEPLOY_DIR="/opt/nexus"
COMPOSE_FILE="$DEPLOY_DIR/docker-compose.yml"
HEALTH_CHECK_TIMEOUT=120
HEALTH_CHECK_INTERVAL=5

# Change to deploy directory
cd "$DEPLOY_DIR"

# Pull new images
echo "Pulling new images..."
docker compose pull

# Create rollback snapshot
echo "Creating rollback snapshot..."
cp .env .env.rollback

# Rollback function
rollback() {
  echo "Deployment failed — rolling back..."
  mv .env.rollback .env
  docker compose pull
  docker compose up -d --wait --wait-timeout "$HEALTH_CHECK_TIMEOUT"
  exit 1
}

trap rollback ERR

# Update image tags in .env
echo "Updating image tags..."
NEW_TAG="${1:-latest}"
sed -i '/^WEB_IMAGE_TAG=/d;/^ADMIN_IMAGE_TAG=/d' .env
{
  echo "WEB_IMAGE_TAG=${NEW_TAG}"
  echo "ADMIN_IMAGE_TAG=${NEW_TAG}"
} >> .env

# Deploy new images
echo "Deploying new images..."
docker compose up -d --wait --wait-timeout "$HEALTH_CHECK_TIMEOUT"

# Health checks
echo "Running health checks..."
check_health() {
  local service=$1
  local url=$2
  local elapsed=0

  while [ $elapsed -lt $HEALTH_CHECK_TIMEOUT ]; do
    if curl --fail --silent --max-time 5 "$url" > /dev/null 2>&1; then
      echo "✓ $service is healthy"
      return 0
    fi
    sleep $HEALTH_CHECK_INTERVAL
    elapsed=$((elapsed + HEALTH_CHECK_INTERVAL))
  done

  echo "✗ $service health check failed"
  return 1
}

check_health "nexus-web" "https://cwwkcc.lk/api/health"
check_health "nexus-admin" "https://admin.cwwkcc.lk/api/health"

# Cleanup
trap - ERR
rm -f .env.rollback

echo "Deployment completed successfully!"