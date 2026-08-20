variable "cloudflare_api_token" {
  description = "Cloudflare API token used by the Terraform provider."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the Worker and R2 bucket."
  type        = string
}
