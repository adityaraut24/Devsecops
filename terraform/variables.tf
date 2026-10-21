variable "aws_region" {
  description = "AWS region for infrastructure provisioning"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment identifier (e.g. production, staging, dev)"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name tag and identifier prefix"
  type        = string
  default     = "hospital-queue-system"
}

variable "instance_name" {
  description = "Name of the EC2 instance (matches existing hospital-queue-server)"
  type        = string
  default     = "hospital-queue-server"
}

variable "instance_type" {
  description = "EC2 instance sizing (t2.micro is Free Tier eligible)"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Existing SSH key pair name in AWS (matches hospital-queue-key.pem)"
  type        = string
  default     = "hospital-queue-key"
}

variable "allowed_ssh_cidr" {
  description = "CIDR block permitted for SSH administration. Restrict to specific admin IP in production."
  type        = string
  default     = "0.0.0.0/0"
}

variable "enable_ecr" {
  description = "Whether to provision an Amazon ECR container registry for hospital-queue Docker images"
  type        = bool
  default     = true
}

variable "existing_instance_id" {
  description = "Optional EC2 instance ID if managing existing hospital-queue-server through Terraform import"
  type        = string
  default     = ""
}
