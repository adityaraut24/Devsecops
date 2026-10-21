# AWS EC2 Cloud Deployment & Operations Guide
## Hospital Queue Management System

This guide outlines the deployment procedures for running the Hospital Queue Management System on the dedicated AWS EC2 instance (`hospital-queue-server`).

---

## 1. Prerequisites

1. **AWS EC2 Instance**: `hospital-queue-server` running Ubuntu or Amazon Linux.
2. **SSH Private Key**: `hospital-queue-key.pem` (found in `C:\Users\student\Downloads\hospital-queue-key.pem`).
3. **Instance Security Group**: Inbound TCP port 80 (HTTP) and port 22 (SSH) open.
4. **Local Tools**: Docker Desktop running locally, Git, SSH client.

---

## 2. Infrastructure as Code: Terraform Management

### Existing EC2 Protection Rule:
The instance `hospital-queue-server` was created manually. To avoid creating duplicate resources or incurring unexpected costs, Terraform includes lifecycle protections.

### Option A: Validate Configuration (Safe Check)
```bash
cd terraform
# Format check
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 fmt -check

# Initialize backend-free
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 init -backend=false

# Validate syntax
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 validate
```

### Option B: Import Existing EC2 Server into Terraform State
When ready to manage the existing instance via Terraform:
1. Export AWS credentials in your terminal:
   ```bash
   export AWS_ACCESS_KEY_ID="your_access_key"
   export AWS_SECRET_ACCESS_KEY="your_secret_key"
   export AWS_DEFAULT_REGION="us-east-1"
   ```
2. Initialize with provider download:
   ```bash
   terraform init
   ```
3. Import the existing instance into state:
   ```bash
   terraform import aws_instance.hospital_queue_server <YOUR_EC2_INSTANCE_ID>
   terraform import aws_security_group.hospital_queue_sg <YOUR_SECURITY_GROUP_ID>
   ```
4. Run plan to verify that zero resources are destroyed:
   ```bash
   terraform plan
   ```

---

## 3. Direct Deployment via `deploy.sh`

The deployment script `deploy.sh` handles Docker verification, zero-downtime container updating, automated health checking, and automatic rollback on failure.

### Step 1: Copy Deployment Script and Key Permissions
From your Windows workstation (PowerShell or Bash):
```powershell
# Set secure permissions on Windows for SSH key
icacls C:\Users\student\Downloads\hospital-queue-key.pem /inheritance:r /grant:r "$($env:USERNAME):R"

# Copy deployment script to EC2
scp -i C:\Users\student\Downloads\hospital-queue-key.pem deploy.sh ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/deploy.sh
```

### Step 2: Transfer or Build Docker Image on EC2
**Method 1: Direct Docker Transfer (Fastest & Secure)**
Save the hardened image and stream it to EC2:
```powershell
docker save hospital-queue:1.0 | ssh -i C:\Users\student\Downloads\hospital-queue-key.pem ubuntu@<EC2_PUBLIC_IP> "docker load"
```

**Method 2: Via Amazon ECR**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URL>
docker tag hospital-queue:1.0 <ECR_URL>/hospital-queue-system-repo:1.0
docker push <ECR_URL>/hospital-queue-system-repo:1.0

# On EC2:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URL>
docker pull <ECR_URL>/hospital-queue-system-repo:1.0
```

### Step 3: Execute `deploy.sh` on EC2
```bash
ssh -i C:\Users\student\Downloads\hospital-queue-key.pem ubuntu@<EC2_PUBLIC_IP>
chmod +x /home/ubuntu/deploy.sh
./deploy.sh
```

**Expected Output:**
```text
=======================================================
 Hospital Queue Management System — EC2 Deployment
 Image:          hospital-queue:1.0
 Container:      hospital-queue-app
 Port:           80 -> 80
 Timestamp:      2026-10-21T...
=======================================================
[✓] Docker is already installed: Docker version 24.0.5
[+] Starting new application container from hospital-queue:1.0...
[+] Checking container health at http://127.0.0.1:80/health (timeout: 30s)...
[✓] Health check passed successfully: http://127.0.0.1:80/health returned HTTP 200 OK.
[+] Deployment verified healthy.
=======================================================
 [✓] HOSPITAL QUEUE MANAGEMENT SYSTEM DEPLOYED
 URL: http://<EC2_PUBLIC_IP>:80
=======================================================
```

---

## 4. Automated Rollback Procedure

If a deployed container fails its `/health` check, `deploy.sh` triggers an immediate automatic rollback to the previous working container (`hospital-queue-app-backup`).

To trigger an explicit manual rollback at any time:
```bash
ssh -i C:\Users\student\Downloads\hospital-queue-key.pem ubuntu@<EC2_PUBLIC_IP> "./deploy.sh rollback"
```

---

## 5. Jenkins CI/CD Pipeline Automation

Jenkins is configured at `http://localhost:8081`.

### Setup Instructions in Jenkins Web UI:
1. **Add SSH Credential**:
   - Navigate to **Manage Jenkins** &rarr; **Credentials** &rarr; **System** &rarr; **Global credentials**.
   - Click **Add Credentials**:
     - Kind: **SSH Username with private key**
     - ID: `hospital-queue-ssh-key`
     - Username: `ubuntu`
     - Private Key: Paste contents of `C:\Users\student\Downloads\hospital-queue-key.pem`.
2. **Configure Pipeline Job**:
   - In job `Devsecops/Devsecops`:
     - Select **Pipeline script from SCM** (or paste `Jenkinsfile` directly into Pipeline Script).
     - Under **Build with Parameters**, supply:
       - `DEPLOY_TO_EC2`: `true`
       - `EC2_HOST`: `<YOUR_EC2_PUBLIC_IP>`
       - `EC2_USER`: `ubuntu`
       - `EC2_SSH_CREDENTIAL_ID`: `hospital-queue-ssh-key`
3. Click **Build with Parameters** &rarr; **Build**.

---

## 6. Verification and Health Check

Test the live public endpoint from your browser or terminal:
```bash
# HTTP status check
curl -i http://<EC2_PUBLIC_IP>/health

# Verify application HTML response
curl -s http://<EC2_PUBLIC_IP>/ | grep "<title>"
```
Expected output:
```html
<title>Hospital Queue Management System | SEPM CIAP Project</title>
```
