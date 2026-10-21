output "instance_id" {
  description = "ID of the Hospital Queue EC2 instance"
  value       = aws_instance.hospital_queue_server.id
}

output "instance_public_ip" {
  description = "Public IP address of the hospital-queue-server"
  value       = aws_instance.hospital_queue_server.public_ip
}

output "security_group_id" {
  description = "ID of the security group attached to the server"
  value       = aws_security_group.hospital_queue_sg.id
}

output "ecr_repository_url" {
  description = "URL of the Amazon ECR repository for Docker images"
  value       = try(aws_ecr_repository.hospital_queue[0].repository_url, "ECR disabled")
}

output "application_url" {
  description = "HTTP URL to access the deployed Hospital Queue Management System"
  value       = "http://${aws_instance.hospital_queue_server.public_ip}"
}
