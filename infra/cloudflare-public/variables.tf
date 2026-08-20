variable "cloudflare_api_token" {
  description = "Cloudflare API token used by the Terraform provider."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID that owns the R2 bucket."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Active Cloudflare zone ID for poe.re."
  type        = string
}

variable "bucket_name" {
  description = "Existing R2 bucket to expose."
  type        = string
  default     = "poe-economy"
}

variable "economy_domain" {
  description = "Public hostname for the R2 bucket."
  type        = string
  default     = "economy.poe.re"
}
