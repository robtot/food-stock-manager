provider "aws" {
  region = "eu-west-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

module "networkModule" {
  source = "./modules/network"
  region = var.region
  public_key_path = "./.ssh/id_rsa.pub"
}

module "securityGroupModule" {
  source = "./modules/securityGroup"
  region = var.region
  vpc_id = module.networkModule.vpc_id
  vpc_cidr_block = module.networkModule.vpc_cidr_block
}

module "dbModule" {
  source = "./modules/db"
  sg_internal_5432 = module.securityGroupModule.sg_internal_5432
  db_subnet_group_name = module.networkModule.db_subnet_group_name
  db_password = var.db_password
}

module "instanceModule" {
  source = "./modules/instance"
  region = var.region
  vpc_id = module.networkModule.vpc_id
  subnet_public_id = module.networkModule.public_subnets[0]
  key_pair_name = module.networkModule.ec2keyName
  security_group_ids = [module.securityGroupModule.sg_22, module.securityGroupModule.sg_80]
  instance_ami = data.aws_ami.ubuntu.id
}
