variable "region" {
  default = "eu-west-1"
}

variable "db_password" {
  description = "Password for db user"
  sensitive = true
}
