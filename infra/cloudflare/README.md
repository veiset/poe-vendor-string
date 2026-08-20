# Cloudflare economy infrastructure

This first-phase Terraform configuration provisions the R2 bucket that stores
the hourly economy snapshots and enables browser CORS. The bucket stays private
until a public custom domain and CDN cache configuration are added later.

## Apply

Authenticate Terraform with a Cloudflare API token in `CLOUDFLARE_API_TOKEN`.
It needs **Account → Workers R2 Storage → Edit** permission.

### Docker (recommended)

No Terraform installation is required on the host. Docker Compose runs the
pinned official Terraform image and persists downloaded providers in a Docker
volume.

```bash
cd infra/cloudflare
cp .env.example .env
# Edit .env and fill in the Cloudflare API token and account ID.

docker compose run --rm terraform init
docker compose run --rm terraform plan
docker compose run --rm terraform apply
```

The `.env` file is ignored by Git. Terraform state is written to this directory;
keep it private or configure a remote backend before collaborating on it.

### Host Terraform CLI

```bash
cd infra/cloudflare
export TF_VAR_cloudflare_api_token="$CLOUDFLARE_API_TOKEN"
terraform init
terraform apply -var cloudflare_account_id=YOUR_ACCOUNT_ID
```

Then deploy the economy Worker from `workers/economy-fetcher/` with `npm run deploy`. The hourly cron
will seed the private bucket on its next UTC hour; use the Cloudflare dashboard's
Cron Trigger test facility if an immediate initial refresh is required.

Before the website can read the snapshots, add a public R2 custom domain and
cache rule in a later Terraform change. At that point, set `VITE_ECONOMY_URL`
to that domain (the application currently defaults to `https://economy.poe.re`).
