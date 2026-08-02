#!/bin/bash
# Shared helpers for infra/scripts/*.sh — source this file, do not execute it.
#
# Provides:
#   log MESSAGE                     - timestamped log line
#   load_env ENV_FILE               - safely source an env file (export all vars)
#   configure_rclone_r2 REMOTE      - export RCLONE_CONFIG_* for an S3-compatible
#                                     Cloudflare R2 remote, from R2_* env vars
#                                     already present after load_env
#   configure_rclone_crypt NAME BACKING_REMOTE_PATH KEYFILE
#                                    - export RCLONE_CONFIG_* for a `crypt` remote
#                                      layered on top of an existing rclone remote,
#                                      so every file written through it is encrypted
#                                      with the passphrase in KEYFILE (same key used
#                                      for GPG backups — see F-134, Backup Encryption)

set -euo pipefail

log() {
  echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] $*"
}

load_env() {
  local env_file="$1"
  if [ ! -f "$env_file" ]; then
    echo "Error: env file not found at $env_file" >&2
    exit 1
  fi
  set -a
  # shellcheck disable=SC1090
  source "$env_file"
  set +a
}

configure_rclone_r2() {
  local remote_name="${1:-r2}"
  local upper
  upper=$(echo "$remote_name" | tr '[:lower:]' '[:upper:]')

  : "${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID not set — check the .env file was loaded}"
  : "${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY not set — check the .env file was loaded}"
  : "${R2_ENDPOINT:?R2_ENDPOINT not set — check the .env file was loaded}"

  export "RCLONE_CONFIG_${upper}_TYPE=s3"
  export "RCLONE_CONFIG_${upper}_PROVIDER=Cloudflare"
  export "RCLONE_CONFIG_${upper}_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}"
  export "RCLONE_CONFIG_${upper}_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}"
  export "RCLONE_CONFIG_${upper}_ENDPOINT=${R2_ENDPOINT}"
  export "RCLONE_CONFIG_${upper}_ACL=private"
}

configure_rclone_crypt() {
  local remote_name="$1"         # e.g. "r2crypt"
  local backing_remote_path="$2" # e.g. "r2:kcc-backups/media"
  local keyfile="$3"

  local upper
  upper=$(echo "$remote_name" | tr '[:lower:]' '[:upper:]')

  if [ ! -f "$keyfile" ]; then
    echo "Error: encryption key file not found at $keyfile" >&2
    exit 1
  fi

  local obscured
  obscured=$(rclone obscure "$(cat "$keyfile")")

  export "RCLONE_CONFIG_${upper}_TYPE=crypt"
  export "RCLONE_CONFIG_${upper}_REMOTE=${backing_remote_path}"
  export "RCLONE_CONFIG_${upper}_PASSWORD=${obscured}"
  export "RCLONE_CONFIG_${upper}_FILENAME_ENCRYPTION=standard"
  export "RCLONE_CONFIG_${upper}_DIRECTORY_NAME_ENCRYPTION=true"
}
