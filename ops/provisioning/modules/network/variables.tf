variable "region" {
  default = "eu-west-1"
}

variable "availability_zone_1" {
  default = "eu-west-1a"
}

variable "availability_zone_2" {
  default = "eu-west-1b"
}

variable "cidr_block_range" {
  description = "The CIDR block for the VPC"
  default = "10.1.0.0/16"
}

variable "subnet1_cidr_block_range" {
  description = "The CIDR block for public subnet of VPC"
  default = "10.1.0.0/24"
}

variable "subnet2_cidr_block_range" {
  description = "The CIDR block for private subnet of VPC"
  default = "10.1.3.0/24"
}

variable "subnet3_cidr_block_range" {
  description = "The CIDR block for db subnet of VPC"
  default = "10.1.5.0/24"
}

variable "public_key_path" {
  description = "Public key path"
  default = "~/.ssh/id_rsa.pub"
}
