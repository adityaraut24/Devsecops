# System & DevSecOps Architecture
## Hospital Queue Management System

This document outlines the end-to-end architecture of the **Hospital Queue Management System (HQMS)**, covering the application component model, local DevSecOps development environment, CI/CD pipeline execution flow, and AWS cloud deployment topology.

---

## 1. High-Level DevSecOps Pipeline Flow

The following diagram illustrates the complete DevSecOps lifecycle from developer commit to AWS EC2 production deployment:

```mermaid
flowchart TD
    subgraph DeveloperWorkstation ["Developer Workstation (Windows / VS Code)"]
        DEV["Developer Workspace"] -->|npm test & lint| LOCAL_TEST["Local Validation (node:test)"]
        LOCAL_TEST -->|docker build| LOCAL_DOCKER["Local Docker Build"]
        LOCAL_DOCKER -->|trivy scan| LOCAL_SCAN["Local Security Audit (0 High/Critical)"]
    end

    subgraph SourceControl ["Source Control (Git & GitHub)"]
        DEV -->|Protected Commit & Push| GITHUB["GitHub Repository (main branch)"]
    end

    subgraph CICD ["Jenkins CI/CD Automation (Docker: Port 8081)"]
        GITHUB -->|Webhook / Polling| S1["Stage 1: Checkout Source"]
        S1 --> S2["Stage 2: Environment Check (node:22-alpine)"]
        S2 --> S3["Stage 3: Reproducible Dependency Install (npm ci)"]
        S3 --> S4["Stage 4: Automated Tests (npm test)"]
        S4 --> S5["Stage 5: Syntax & Code Quality Linting"]
        S5 --> S6["Stage 6: Vite Production Bundle Build"]
        S6 --> S7["Stage 7: Trivy Filesystem & Secret Scan"]
        S7 --> S8["Stage 8: Terraform Format & Validate"]
        S8 --> S9["Stage 9: Trivy IaC Configuration Scan"]
        S9 --> S10["Stage 10: Multi-Stage Docker Image Build"]
        S10 --> S11["Stage 11: Trivy Container Image Scan"]
        S11 --> S12["Stage 12: Optional SonarQube Quality Analysis"]
        S12 --> S13["Stage 13: Automated EC2 Deployment"]
    end

    subgraph AWSCloud ["AWS Cloud Production (Free-Tier Architecture)"]
        S13 -->|SSH / deploy.sh| EC2["AWS EC2: hospital-queue-server (t2.micro)"]
        S10 -.->|Optional Push| ECR["Amazon ECR: hospital-queue-system-repo"]
        SG["Security Group: hospital-queue-system-sg<br/>Port 80 (HTTP), Port 443 (HTTPS), Port 22 (SSH)"] --> EC2
        EC2 --> APP["Hardened Nginx Container<br/>(hospital-queue-app : Port 80)"]
    end

    subgraph PatientsAndStaff ["End Users"]
        APP -->|HTTP 200| USERS["Patients, Receptionists & Doctors"]
    end
```

---

## 2. Application Component Architecture

The frontend is built with React 18 and Vite 6, using functional components and centralized state managed via React Context.

```mermaid
graph TD
    App["App.jsx (Top-level Shell)"]
    Header["Header.jsx (Clock, Notifications, Reset)"]
    Sidebar["Sidebar.jsx (Navigation Bar)"]
    Context["HospitalContext.jsx (Central State & Triage Engine)"]
    Storage["storage.js (LocalStorage Sync & Defaults)"]
    QueueUtils["queueUtils.js (Priority Comparator & Estimator)"]

    App --> Header
    App --> Sidebar
    App --> Context
    Context --> Storage
    Context --> QueueUtils

    subgraph Pages ["Application Pages"]
        Dashboard["Dashboard.jsx (KPIs & Live Queue Table)"]
        Registration["PatientRegistration.jsx (Token Generator)"]
        Queue["QueueManagement.jsx (Dispatcher & Filters)"]
        Doctor["DoctorPanel.jsx (Cabin Examination)"]
        Records["PatientRecords.jsx (Audit Registry & CSV)"]
        Reports["Reports.jsx (Recharts Analytics)"]
        Design["SystemDesign.jsx (DFD & Structure Charts)"]
        About["About.jsx (Academic Dossier & SDG 3)"]
    end

    Context --> Pages
```

### Core Logic Modules:
- **`queueUtils.js`**:
  - Implements multi-tier priority queue sorting: `Emergency` (Weight 3) > `High` (Weight 2) > `Normal` (Weight 1).
  - Uses First-Come First-Served (FIFO) ordering based on registration ISO timestamp for patients within identical tiers.
  - Generates monotonic sequential Token identifiers (`T001`, `T002`, `T013`...) and Patient IDs (`P001`...).
  - Calculates dynamic estimated waiting times factoring in priority, cabin doctor allocation, and queue depth.
- **`HospitalContext.jsx`**:
  - Manages queue lifecycle state transitions: `Waiting` &rarr; `Called` &rarr; `In Consultation` &rarr; `Completed` (or `Cancelled`).
  - Broadcasts non-blocking toast notifications and audit log events.
- **`storage.js`**:
  - Transparently persists patient queue state to browser `localStorage` under `hqms_hospital_patients_v1`.
  - Provides a single-click reset function to restore pristine seed records for academic viva demonstration.

---

## 3. Containerization Architecture (Docker)

The production container uses a hardened multi-stage Docker build:

1. **Build Stage (`node:22-alpine`)**:
   - Compiles React + Vite JSX assets into minified JavaScript and CSS.
   - Executes automated tests (`npm test`) as a mandatory build prerequisite.
2. **Production Stage (`nginx:1.27-alpine`)**:
   - Executes `apk update && apk upgrade` to patch all base OS packages against known CVEs.
   - Incorporates custom `nginx.conf` with security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`).
   - Configures Gzip compression and client-side single page app routing (`try_files $uri $uri/ /index.html`).
   - Implements native healthcheck endpoint (`/health` &rarr; HTTP 200 `healthy`).
   - Runs worker processes dropped to unprivileged `nginx` user.

---

## 4. Infrastructure as Code (Terraform)

The cloud infrastructure is defined declaratively using Terraform:

- **Provider**: AWS Provider v5.x with automatic default resource tagging.
- **Compute**: Single EC2 instance named `hospital-queue-server` (`t2.micro`, Ubuntu 24.04 LTS).
  - Configured with `prevent_destroy = false` and lifecycle protection (`ignore_changes`) to safeguard the existing server from unintended destruction.
  - Configured with IMDSv2 session tokens (`http_tokens = "required"`).
- **Network Security**: Security group `hospital-queue-system-sg` enforcing least privilege:
  - Ingress Port 80 (HTTP) for public patient and hospital staff access.
  - Ingress Port 443 (HTTPS) for TLS traffic.
  - Ingress Port 22 (SSH) restricted to authorized administrator CIDR.
  - Strictly prevents exposure of Jenkins (8081), SonarQube (9000), or Docker daemon.
- **Container Registry**: Amazon ECR repository `hospital-queue-system-repo` with image immutability and scan-on-push enabled.
