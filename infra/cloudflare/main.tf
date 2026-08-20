terraform {
  required_version = ">= 1.6.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.22"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_r2_bucket" "economy" {
  account_id    = var.cloudflare_account_id
  name          = "poe-economy"
  location      = "weur"
  storage_class = "Standard"
}

# The data is intentionally public. CORS lets both production sites, previews,
# and local development read the public JSON files from browser JavaScript.
resource "cloudflare_r2_bucket_cors" "economy" {
  account_id  = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.economy.name

  rules = [{
    id = "public-read"
    allowed = {
      methods = ["GET", "HEAD"]
      origins = ["*"]
    }
    max_age_seconds = 86400
  }]
}
