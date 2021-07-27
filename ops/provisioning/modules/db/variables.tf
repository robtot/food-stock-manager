variable "sg_internal_5432" {
  description = "Security group id for database"
}

variable "db_subnet_group_name" {
  description = "Subnet group to deploy db instance in"
}

variable "db_user" {
  description = "Username for user in db to create"
  default = "postgres"
}

variable "db_password" {
  description = "Password for user in db to create"
}

variable "db_name" {
  description = "DB name to create"
}
