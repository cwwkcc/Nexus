# Zero-downtime deployment script (F-010)
# Called by GitHub Actions CD pipeline.
# SSH into Hetzner, pull new images from GHCR, restart services.
# Waits for Docker healthchecks to report healthy before marking success.
