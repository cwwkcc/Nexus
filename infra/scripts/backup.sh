# Automated database backup script (F-049)
# pg_dump → compress → encrypt → upload to off-site storage.
# Run on schedule. Retention policy enforced.
# Encryption key stored separately from backup files (F-120).
