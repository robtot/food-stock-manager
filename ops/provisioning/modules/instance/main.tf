resource "aws_instance" "main" {
  ami = "${var.instance_ami}"
  instance_type = "${var.instance_type}"
  subnet_id = "${var.subnet_public_id}"
  vpc_security_group_ids = var.security_group_ids
  key_name = "${var.key_pair_name}"
}

resource "aws_eip" "main" {
  vpc = true
  instance  = "${aws_instance.main.id}"
}
