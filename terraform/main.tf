provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "Terraform"
      Repository  = "hospital-queue-management-system"
    }
  }
}

# -----------------------------------------------------------------------------
# Amazon ECR: Production Docker Container Registry
# -----------------------------------------------------------------------------
resource "aws_ecr_repository" "hospital_queue" {
  count                = var.enable_ecr ? 1 : 0
  name                 = "${var.project_name}-repo"
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name = "${var.project_name}-ecr"
  }
}

# -----------------------------------------------------------------------------
# AWS Security Group: Least Privilege Access Control
# Only exposes HTTP (80) and HTTPS (443) to web traffic, and SSH (22) to admin.
# Never exposes Jenkins (8081), SonarQube (9000), or Docker daemon (2375).
# -----------------------------------------------------------------------------
resource "aws_security_group" "hospital_queue_sg" {
  name        = "${var.project_name}-sg"
  description = "Security group for Hospital Queue Management System web server"

  # Public HTTP Access for Hospital Patients & Receptionists
  ingress {
    description = "Allow inbound HTTP for patient queue UI"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Inbound HTTPS for TLS/SSL encrypted traffic
  ingress {
    description = "Allow inbound HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Secure SSH Administration (Restricted)
  ingress {
    description = "Allow SSH management from designated CIDR"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # Outbound HTTPS for secure package updates, Docker Hub, and AWS API calls
  egress {
    description = "Permit outbound HTTPS for secure package updates and container pulls"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound HTTP for standard repository mirrors
  egress {
    description = "Permit outbound HTTP for package repositories"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound DNS resolution for package updates and Docker pulls
  egress {
    description = "Permit outbound DNS resolution"
    from_port   = 53
    to_port     = 53
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

# -----------------------------------------------------------------------------
# AMI Lookup: Latest Ubuntu 24.04 LTS (HVM:ebs-ssd)
# -----------------------------------------------------------------------------
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# -----------------------------------------------------------------------------
# EC2 Instance: hospital-queue-server
# Matches existing manual instance name and key pair.
# Includes protection to prevent unexpected destruction or replacement.
# To import existing instance into state:
#   terraform import aws_instance.hospital_queue_server <EXISTING_INSTANCE_ID>
# -----------------------------------------------------------------------------
resource "aws_instance" "hospital_queue_server" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.hospital_queue_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 20
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = false
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  tags = {
    Name = var.instance_name
    Role = "Hospital Queue Production Server"
  }

  # Prevent accidental destruction or recreation of existing server
  lifecycle {
    ignore_changes = [
      ami,
      user_data,
      user_data_base64
    ]
  }
}
