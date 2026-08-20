# Deferred public R2 endpoint

This independent Terraform stack is intentionally **not** part of the applied
storage stack in `../cloudflare`. Run it only after the `poe.re` zone is active
in Cloudflare and it is safe for Cloudflare to create the `economy.poe.re` DNS
record.

It attaches the existing `poe-economy` bucket to `economy.poe.re` and creates a
cache rule for that hostname. It does not modify the apex domain or other
website records.

The hourly Worker writes each object with an absolute cache expiry two hours
after its execution time. This stack forces Cloudflare's edge cache to refresh
each file every hour (supported by the Pro zone), while browsers continue to
respect the object's two-hour absolute expiry.

## Required token permissions

- Account → **Workers R2 Storage** → Edit
- Zone (`poe.re`) → **DNS** → Edit
- Zone (`poe.re`) → **Cache Rules** → Edit

## Apply when ready

```bash
cd infra/cloudflare-public
cp .env.example .env
# Fill in the API token, account ID, and active poe.re zone ID.

docker compose run --rm terraform init
docker compose run --rm terraform plan
docker compose run --rm terraform apply
```

The expected plan creates exactly two resources: the R2 custom domain and the
zone cache rule. Keep the generated `terraform.tfstate` private.
