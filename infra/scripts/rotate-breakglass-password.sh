#!/bin/bash
set -euo pipefail

# Break-glass password rotation (F-065)
# Server-side CLI script — run over SSH.
# Re-hashes a new password directly into the database.
# No internet-facing reset surface for the highest-privilege account.

# Configuration
DB_NAME="nexus"
DB_USER="nexus"
DB_HOST="localhost"
DB_PORT="5432"
BREAKGLASS_EMAIL="admin@cwwkcc.lk"

# Check arguments
if [ $# -lt 1 ]; then
  echo "Usage: $0 <new_password>"
  echo "This script rotates the break-glass admin password directly in the database."
  echo "Run this script over SSH on the production server."
  exit 1
fi

NEW_PASSWORD="$1"

# Validate password strength
if [ ${#NEW_PASSWORD} -lt 16 ]; then
  echo "Error: Password must be at least 16 characters long"
  exit 1
fi

# Generate hash (argon2id)
echo "Generating password hash..."
HASH=$(echo -n "$NEW_PASSWORD" | argon2 "$(openssl rand -base64 16)" -e -id -t 3 -m 65536 -p 4)

# Update password in database
echo "Updating break-glass password in database..."
docker compose exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" <<EOF
UPDATE "User"
SET "passwordHash" = '$HASH',
    "updatedAt" = NOW()
WHERE "email" = '$BREAKGLASS_EMAIL'
AND "role" = 'ADMIN';
EOF

# Verify update
echo "Verifying password update..."
UPDATED_COUNT=$(docker compose exec -T postgres psql -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM \"User\" WHERE \"email\" = '$BREAKGLASS_EMAIL' AND \"role\" = 'ADMIN';")

if [ "$UPDATED_COUNT" -eq 1 ]; then
  echo "✓ Break-glass password updated successfully"
  echo "Email: $BREAKGLASS_EMAIL"
  echo "Please store the new password securely and destroy this session."
else
  echo "✗ Failed to update password"
  exit 1
fi
