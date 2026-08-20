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

# This deliberately references, rather than manages, the bucket created by
# ../cloudflare. Keeping the public endpoint separate means it can be applied
# only once the poe.re zone is active in Cloudflare.
resource "cloudflare_r2_custom_domain" "economy" {
  account_id  = var.cloudflare_account_id
  bucket_name = var.bucket_name
  domain      = var.economy_domain
  zone_id     = var.cloudflare_zone_id
  enabled     = true
}

# JSON is not cached by Cloudflare's default cache behaviour. Cloudflare Pro
# permits a one-hour edge TTL, so a refreshed hourly snapshot reaches each edge
# within at most one cache interval. Browsers keep respecting the R2 object's
# absolute expiry (two hours after the Worker refresh).
resource "cloudflare_ruleset" "economy_cache" {
  zone_id     = var.cloudflare_zone_id
  name        = "Cache economy JSON"
  description = "Cache public R2 economy data at the Cloudflare edge"
  kind        = "zone"
  phase       = "http_request_cache_settings"

  rules = [{
    action      = "set_cache_settings"
    description = "Cache economy JSON responses"
    enabled     = true
    expression  = "http.host eq \"${var.economy_domain}\""
    action_parameters = {
      cache = true
      edge_ttl = {
        mode    = "override_origin"
        default = 3600
      }
      browser_ttl = {
        mode = "respect_origin"
      }
    }
  }]
}
