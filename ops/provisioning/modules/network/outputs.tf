output "vpc_id" {
  value = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "The CIDR block for the VPC"
  value = aws_vpc.main.cidr_block
}


output "public_subnets" {
  value = [aws_subnet.public.id]
}

output "ec2keyName" {
  value = aws_key_pair.main.key_name
}

output "db_subnet_group_name" {
  value = aws_db_subnet_group.db.name
}
