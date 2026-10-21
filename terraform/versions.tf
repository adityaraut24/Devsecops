terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Production backend documentation:
  # In production, state should be stored remotely in S3 with DynamoDB locking.
  # For safe microproject evaluation without incurring extra costs, local state
  # is used by default and ignored in .gitignore.
  #
  # backend "s3" {
  #   bucket         = "hospital-queue-terraform-state"
  #   key            = "production/hospital-queue.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "hospital-queue-tf-locks"
  #   encrypt        = true
  # }
}
