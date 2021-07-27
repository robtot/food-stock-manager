resource "aws_db_parameter_group" "main" {
  name   = "food-stock-manager"
  family = "postgres13"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_db_instance" "main" {
  allocated_storage = 5
  engine = "postgres"
  engine_version = "13.3"
  instance_class = "db.t3.micro"
  name = "FoodStockManager"
  username = "postgres"
  password = "Y3QUwe8VKH"
  skip_final_snapshot = true
  vpc_security_group_ids = [var.sg_internal_5432]
  db_subnet_group_name = var.db_subnet_group_name
  parameter_group_name = aws_db_parameter_group.main.name
}
