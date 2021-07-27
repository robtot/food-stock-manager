variable "region" {
  default = "eu-west-1"
}

variable "vpc_id" {
  description = "VPC id"
  default = ""
}

variable "vpc_cidr_block" {
  description = "VPC CIDR block range"
}
