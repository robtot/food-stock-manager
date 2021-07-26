variable "region" {
  default = "eu-west-1"
}

variable "vpc_id" {
  description = "VPC id"
  default = ""
}

variable "subnet_public_id" {
  description = "VPC public subnet id"
  default = ""
}

variable "security_group_ids" {
  description = "EC2 ssh security group"
  type = list(string)
  default = []
}

variable "key_pair_name" {
  description = "EC2 Key pair name"
  default = ""
}

variable "instance_ami" {
  description = "EC2 instance ami"
}

variable "instance_type" {
  description = "EC2 instance type"
  default = "t2.micro"
}
