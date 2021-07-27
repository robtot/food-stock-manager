output "public_ip" {  
  value = module.instanceModule.public_ip
}

output "rds_hostname" {
  value = module.dbModule.rds_hostname
}

output "rds_user" {
  value = module.dbModule.rds_username
}

output "rds_db_name" {
  value = module.dbModule.rds_db_name
}
