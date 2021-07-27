resource "aws_vpc" "main" {
  cidr_block = "${var.cidr_block_range}"
  enable_dns_support = true
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "main" {
  vpc_id = "${aws_vpc.main.id}"
}

resource "aws_subnet" "public" {
  vpc_id = "${aws_vpc.main.id}"
  cidr_block = "${var.subnet1_cidr_block_range}"
  map_public_ip_on_launch = "true"
  availability_zone = "${var.availability_zone_1}"
}

resource "aws_subnet" "private" {
  vpc_id = "${aws_vpc.main.id}"
  cidr_block = "${var.subnet2_cidr_block_range}"
  availability_zone = "${var.availability_zone_1}"
}

resource "aws_subnet" "db" {
  vpc_id = "${aws_vpc.main.id}"
  cidr_block = "${var.subnet3_cidr_block_range}"
  availability_zone = "${var.availability_zone_2}"
}

resource "aws_db_subnet_group" "db" {
  name = "food-stock-manager"
  subnet_ids = [aws_subnet.private.id, aws_subnet.db.id]

  tags = {
    Name = "Food Stock Manager"
  }
}

resource "aws_route_table" "public" {
  vpc_id = "${aws_vpc.main.id}"
  route {
      cidr_block = "0.0.0.0/0"
      gateway_id = aws_internet_gateway.main.id
  }
}

resource "aws_route_table_association" "rta_subnet_public" {
  subnet_id = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_key_pair" "main" {
  key_name = "publicKey"
  public_key = file(var.public_key_path)
}
