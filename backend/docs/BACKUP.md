# Backup strategy

The backend is stateless except for the **PostgreSQL database** and the **file
storage volume** (`/data/storage` inside the container).

## Recommended schedule

| Asset           | Frequency | Tool                        | Retention |
|-----------------|-----------|-----------------------------|-----------|
| PostgreSQL      | Hourly WAL + daily full | `pg_basebackup`, managed cloud | 30 days  |
| Storage volume  | Daily     | `restic`, S3 sync, snapshots | 30 days  |
| Audit logs      | Continuous (DB) | replicated to read replica | 1 year |

## Database backup

```bash
docker exec -t db pg_dump -U temariflow temariflow \
  | gzip > backup-$(date +%F).sql.gz
```

Restore:

```bash
gunzip -c backup-2025-04-25.sql.gz \
  | docker exec -i db psql -U temariflow temariflow
```

## Storage backup

```bash
restic -r s3:s3.amazonaws.com/temariflow-backup \
  backup /var/lib/docker/volumes/backend_storage/_data
```

## Disaster recovery

1. Restore latest DB dump.
2. Restore storage volume snapshot from same day.
3. Update `PUBLIC_BASE_URL` if the host changed so QR verify links resolve.
4. Re-issue JWT secret only if it was leaked (this invalidates active sessions).
