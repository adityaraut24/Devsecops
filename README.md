# Hospital Queue Management System
## DFD & Structure-Chart-Based Design with End-to-End DevSecOps Pipeline

A production-grade, secure healthcare web application and DevSecOps microproject featuring multi-tier priority triage queueing, multi-stage Docker containerization, Aqua Security Trivy scanning, Terraform AWS Infrastructure as Code, Jenkins CI/CD pipeline automation, and zero-downtime EC2 deployment.

---

## 🎓 Academic Credentials

| Detail | Information |
| :--- | :--- |
| **Project Title** | DFD and Structure-Chart-Based Design of a Hospital Queue Management System |
| **Student Name** | **Raut Aditya Manisha** |
| **Roll Number** | **124BTCS1047** |
| **Program** | B.Tech Cyber Security |
| **Course** | Software Engineering & Project Management (SEPM) / DevSecOps Microproject |
| **Project Category** | CIAP Micro Project |
| **Course Outcome (CO)** | **CO4** – Apply structured design methods, Data Flow Diagrams (DFD), and Structure Charts |
| **Bloom Taxonomy Level** | **Level 4 (Analyze)** |
| **Program Outcomes (PO)** | **PO1, PO2, PO3, PO5, PO6, PO8** |
| **Program Specific Outcome** | **PSO2** |
| **UN Sustainable Development Goal** | **SDG 3 – Good Health and Well-being** (Target 3.8: Access to quality healthcare services) |
| **SDG Justification** | The system helps reduce patient waiting time and improves healthcare service efficiency. |

---

## 🛠️ DevSecOps Technology Stack

| Layer | Technology | Version / Specification | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | React + Vite | React 18.3, Vite 6.1 | Responsive clinical OPD dashboard & diagrams |
| **Icons & Visuals** | Lucide-React, Recharts | Recharts 2.15, Lucide 0.47 | Real-time queue metrics and SVG system diagrams |
| **Automated Testing** | Node.js Test Runner | `node:test`, `node:assert` (Node 22) | Automated unit tests for triage & wait time logic |
| **Containerization** | Docker | Multi-stage (`node:22-alpine` &rarr; `nginx:1.27-alpine`) | Production container packaging & Nginx web serving |
| **Security Scanning** | Aqua Security Trivy | v0.59.1 | SCA, secret scanning, container & IaC misconfiguration audits |
| **Infrastructure as Code** | Terraform | v1.10.5 (AWS Provider v5.x) | Declarative cloud provisioning (EC2, SG, ECR, IMDSv2) |
| **CI/CD Automation** | Jenkins LTS | Dockerized (JDK 21, Port 8081) | 13-stage Declarative pipeline automation |
| **Cloud Deployment** | AWS EC2 | `hospital-queue-server` (Ubuntu/Amazon Linux) | Production hosting with automated healthcheck & rollback |
| **Optional Code Quality** | SonarQube Community | v26.10 (Docker: Port 9000) | Static analysis & code smell detection |

---

## 🌟 Key Application Features

1. **Interactive OPD Dashboard**:
   - Live KPI metric cards: Total Patients, Waiting, Being Served, Completed, and Average Wait Time.
   - Dynamic priority queue table with real-time status badges and instant "Call Next Patient" dispatching.
   - Visual 9-stage **System Workflow Pipeline** demonstrating patient progression.
2. **Patient Registration & Sequential Token Generator**:
   - Clinical intake form with field validation (Name, Age, Gender, Phone, Department, Doctor, Priority, Symptoms).
   - Generates sequential token slips (`T001`, `T002`, `T013`...) and Patient IDs (`P001`...).
   - Token receipt modal with dynamic wait time estimation and print capability.
3. **Multi-Level Priority Queue Dispatcher**:
   - Triage sorting algorithm: **Emergency > High > Normal**, with First-Come First-Served (FIFO) ordering within tiers.
   - Department, physician, priority tier, and status filtering.
4. **Doctor Examination Cabin Panel**:
   - Multi-cabin specialist room management, next-patient preview, consultation note recording, and skip/complete controls.
5. **Patient Records & CSV Database Export**:
   - Searchable registry of all patient queue entries with instant CSV export for offline auditing.
6. **Healthcare Analytics (Recharts)**:
   - Department intake comparison bar charts, queue status distribution donut charts, and hourly patient arrival curves.
7. **System Design – DFD & Structure Chart**:
   - **Level 0 (Context Diagram)**: External entities (Patient, Receptionist, Doctor, Admin) and central process 0.0.
   - **Level 1 DFD**: 6 functional processes and 3 data stores (`D1 Patient DB`, `D2 Queue DB`, `D3 Consultation Records`).
   - **Structure Chart**: 4-tier functional decomposition tree with Data Couples (🔵) and Control Couples (⚪).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher; v22 LTS recommended)
- **Docker Desktop** (version 24+ with Linux containers enabled)
- **Git**

### 2. Local Development Server
```bash
# Install dependencies
npm ci

# Run automated tests
npm test

# Run syntax linting
npm run lint

# Start Vite development server
npm run dev
```
Visit `http://localhost:5173/` in your browser.

---

## 🐳 Docker Containerization

The application is containerized using a hardened multi-stage Docker build:
- **Build Stage**: Uses `node:22-alpine` to run automated tests (`npm test`) and compile static assets (`npm run build`).
- **Production Stage**: Uses `nginx:1.27-alpine`, executes `apk upgrade` to patch all base OS packages, includes security headers, gzip compression, client-side routing fallback, and native `/health` check.

### Build and Run Locally:
```bash
# Build Docker image
docker build -t hospital-queue:1.0 .

# Run container on port 8085
docker run -d --name hospital-queue-app -p 8085:80 hospital-queue:1.0

# Verify health endpoint
curl -i http://localhost:8085/health

# Open in browser
# http://localhost:8085/
```

---

## 🔒 Security Auditing with Aqua Security Trivy

Security scanning is integrated into the pre-commit and CI/CD workflow:

```bash
# 1. Scan filesystem and dependencies for vulnerabilities and exposed secrets
docker run --rm -v "%cd%:/workspace" aquasec/trivy:0.59.1 fs --severity HIGH,CRITICAL /workspace

# 2. Scan generated Docker container image
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.59.1 image --severity HIGH,CRITICAL hospital-queue:1.0

# 3. Scan Terraform IaC configuration for misconfigurations
docker run --rm -v "%cd%:/workspace" aquasec/trivy:0.59.1 config --severity HIGH,CRITICAL --ignorefile /workspace/.trivyignore /workspace/terraform
```
**Audit Status**: **0 HIGH, 0 CRITICAL** vulnerabilities detected across all layers.

---

## ☁️ Infrastructure as Code (Terraform)

Located in `terraform/`, configuring AWS cloud resources for the `hospital-queue-server`:

- `terraform/versions.tf` — Terraform v1.5+ and AWS Provider v5.x
- `terraform/variables.tf` — Configurable regions, CIDR restrictions, and instance types
- `terraform/main.tf` — Security Group (least-privilege HTTP/HTTPS/SSH), ECR repository, EC2 instance with IMDSv2 protection
- `terraform/outputs.tf` — Public IP, instance ID, and application URL
- `terraform/terraform.tfvars.example` — Template for supplying non-sensitive variables

### Validate Terraform:
```bash
cd terraform
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 fmt -check
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 init -backend=false
docker run --rm -v "%cd%:/workspace" -w /workspace hashicorp/terraform:1.10.5 validate
```

---

## 🔄 Jenkins CI/CD Automation

Jenkins runs locally in Docker at `http://localhost:8081` with Docker socket access.

The pipeline is defined in `Jenkinsfile` and executes 13 automated stages:
1. **Checkout Source Code**
2. **Check Environment** (`node:22-alpine`)
3. **Install Dependencies** (`npm ci`)
4. **Run Automated Tests** (`npm test` — 9 passing tests)
5. **Syntax Linting** (`npm run lint`)
6. **Build Application** (`npm run build`)
7. **Trivy Source & Dependency Scan** (0 High/Critical)
8. **Terraform Validation** (`fmt`, `init`, `validate`)
9. **Trivy Terraform Scan** (0 High/Critical)
10. **Build Docker Image** (`hospital-queue:${BUILD_NUMBER}`)
11. **Trivy Docker Image Scan** (0 High/Critical)
12. **Optional SonarQube Analysis** (Port 9000)
13. **Deploy to AWS EC2** (via `deploy.sh` with automated health check and rollback)

---

## 🚀 AWS EC2 Deployment (`deploy.sh`)

Deploy to your existing EC2 instance (`hospital-queue-server`) using the automated deployment script:

```bash
# 1. Copy deploy script to EC2
scp -i C:\Users\student\Downloads\hospital-queue-key.pem deploy.sh ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/

# 2. Transfer container image to EC2
docker save hospital-queue:1.0 | ssh -i C:\Users\student\Downloads\hospital-queue-key.pem ubuntu@<EC2_PUBLIC_IP> "docker load"

# 3. Execute zero-downtime deployment
ssh -i C:\Users\student\Downloads\hospital-queue-key.pem ubuntu@<EC2_PUBLIC_IP> "chmod +x deploy.sh && ./deploy.sh"
```

**Automated Rollback**: If the new container fails health verification, `deploy.sh` automatically restores the previous working container.

---

## 📚 Project Documentation Index

- [**System Architecture & Pipeline Flow**](file:///C:/Users/student/Downloads/Devsecops-main/Devsecops-main/docs/ARCHITECTURE.md) — Architectural diagrams and data flow.
- [**Security & Vulnerability Audit**](file:///C:/Users/student/Downloads/Devsecops-main/Devsecops-main/docs/SECURITY.md) — Trivy policies, remediations, and secret management.
- [**EC2 Cloud Deployment Guide**](file:///C:/Users/student/Downloads/Devsecops-main/Devsecops-main/docs/DEPLOYMENT.md) — Step-by-step AWS provisioning and operations.
- [**Academic Viva Demonstration Checklist**](file:///C:/Users/student/Downloads/Devsecops-main/Devsecops-main/docs/DEMO.md) — Walkthrough guide for university evaluation.

---

## 📁 Repository Structure

```text
├── Dockerfile                  # Multi-stage hardened production Dockerfile
├── Dockerfile.jenkins          # Jenkins agent image with Docker CLI
├── Jenkinsfile                 # 13-stage Declarative CI/CD pipeline
├── deploy.sh                   # Repeatable EC2 deployment script with rollback
├── docker-compose.yml          # Jenkins + SonarQube + Postgres local stack
├── nginx.conf                  # Hardened Nginx configuration & /health endpoint
├── package.json                # Dependencies, test, and build scripts
├── vite.config.js              # Vite bundler configuration
├── .dockerignore               # Optimized Docker build context exclusions
├── .gitignore                  # Repository secret & artifact exclusions
├── .trivyignore                # Documented security scan policy exceptions
├── docs/
│   ├── ARCHITECTURE.md         # Mermaid system architecture & pipeline diagrams
│   ├── SECURITY.md             # Scanning policy, CVE fixes & secret handling
│   ├── DEPLOYMENT.md           # AWS EC2 deployment & rollback procedures
│   └── DEMO.md                 # Academic evaluation checklist & viva script
├── terraform/
│   ├── versions.tf             # Terraform & AWS provider constraints
│   ├── variables.tf            # Parameterized infrastructure inputs
│   ├── main.tf                 # EC2, Security Group & ECR definitions
│   ├── outputs.tf              # Public IP, instance ID, and URLs
│   ├── terraform.tfvars.example# Non-sensitive configuration template
│   └── .gitignore              # Terraform state file exclusions
└── src/
    ├── main.jsx                # Application DOM root
    ├── App.jsx                 # Top-level shell with navigation router
    ├── context/                # HospitalContext state & notification engine
    ├── data/                   # Initial seed data for SEPM demonstration
    ├── pages/                  # Dashboard, Queue, Registration, Cabin, Reports, DFD
    ├── components/             # Reusable UI widgets, modals & Recharts
    └── utils/
        ├── queueUtils.js       # Priority comparator, token generator, wait calculator
        ├── queueUtils.test.js  # Automated unit test suite (node:test)
        └── storage.js          # LocalStorage sync & reset utilities
```
