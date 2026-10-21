# Academic Viva Demonstration & Evaluation Checklist
## DevSecOps Microproject: Hospital Queue Management System

**Student Name**: Raut Aditya Manisha  
**Roll Number**: 124BTCS1047  
**Program**: B.Tech Cyber Security  
**Course**: Software Engineering & Project Management (SEPM) / DevSecOps Microproject  
**Course Outcome (CO)**: CO4 – Apply structured design methods, DFDs, and Structure Charts  
**Bloom Taxonomy Level**: Level 4 (Analyze)  
**UN SDG Goal**: SDG 3 – Good Health and Well-being (Target 3.8: Access to Quality Healthcare)

---

## 🎯 Demonstration Checklist for Viva Evaluator

Use this structured walkthrough to demonstrate the full application, software engineering artifacts, and automated DevSecOps pipeline.

---

### Part 1: Hospital Queue Management System (Functional Demo)

| # | Step / Action | What to Demonstrate to Professor | Expected Outcome |
| :- | :--- | :--- | :--- |
| **1.1** | **OPD Dashboard** | Open `http://localhost:5173/` (or port `8085` / EC2 public IP). Point out the 5 KPI cards (Total, Waiting, Being Served, Completed, Avg Wait). | Real-time statistics computed dynamically from queue state. |
| **1.2** | **System Workflow Pipeline** | Scroll down to the 9-stage visual patient journey: *Registration &rarr; Triage &rarr; Wait &rarr; Call &rarr; Exam &rarr; Prescription &rarr; Billing &rarr; Pharmacy &rarr; Discharge*. | Demonstrates end-to-end hospital operational workflow. |
| **1.3** | **Emergency Patient Registration** | Click **Patient Registration**, click the orange **"Fill Emergency Demo"** button (Mr. Rajesh Deshmukh, 58, Chest Pain), and submit. | Token `T013` generated; Receipt modal shows estimated wait time (~3 mins) with Print button. |
| **1.4** | **Priority Triage Verification** | Open **Queue Management**. Observe queue sorting. | Even though registered latest, the Emergency patient automatically jumps to position #1 above routine patients. |
| **1.5** | **Doctor Cabin Consultation** | Navigate to **Doctor Panel**. Select Doctor Cabin. Click **Start Consultation**, type examination notes, and click **Complete Consultation**. | Patient status transitions: `Waiting` &rarr; `In Consultation` &rarr; `Completed`. |
| **1.6** | **Patient Records & CSV Export** | Open **Patient Records**. Use search bar to find patient by Token. Click **Export CSV**. | Generates an offline audit spreadsheet containing complete patient consultation records. |
| **1.7** | **Analytics & Reports** | Open **Reports**. Show the 3 Recharts data visualizations (Intake by Dept, Queue Distribution Donut, Hourly Arrival Curve). | Visual evidence of OPD load distribution and peak hour analysis. |
| **1.8** | **SEPM Design: DFD & Structure Chart** | Navigate to **System Design**: Toggle between **Level 0 Context Diagram** and **Level 1 Decomposed DFD**. Switch to **Structure Chart**. | Interactive visual DFD with 6 processes and 3 stores (`D1`, `D2`, `D3`). Structure Chart shows data couples (🔵) and control couples (⚪). |

---

### Part 2: DevSecOps Engineering & Security Pipeline Demo

| # | Pipeline Component | Demonstration Command | Result / Verification |
| :- | :--- | :--- | :--- |
| **2.1** | **Automated Logic Testing** | `npm test` | **9 passed, 0 failed**. Tests priority weights, triage sorting, FIFO timestamps, token generation, and wait estimator. |
| **2.2** | **Multi-Stage Docker Image** | `docker build -t hospital-queue:1.0 .` | Builds in 2 stages: `node:22-alpine` builder &rarr; hardened `nginx:1.27-alpine` runner. Tests run during build. |
| **2.3** | **Container Health Check** | `curl -i http://localhost:8085/health` | Returns `HTTP/1.1 200 OK` with body `healthy`. Includes security headers (`X-Frame-Options`, `X-Content-Type-Options`). |
| **2.4** | **Trivy Vulnerability Scan (Filesystem)** | `docker run --rm -v "%cd%:/workspace" aquasec/trivy:0.59.1 fs --severity HIGH,CRITICAL /workspace` | **0 HIGH, 0 CRITICAL** vulnerabilities detected in source dependencies. |
| **2.5** | **Trivy Container Image Scan** | `docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:0.59.1 image --severity HIGH,CRITICAL hospital-queue:1.0` | **Total: 0 (HIGH: 0, CRITICAL: 0)** after automated OS package upgrade (`apk upgrade`). |
| **2.6** | **Terraform IaC Validation** | `docker run --rm -v "%cd%/terraform:/workspace" -w /workspace hashicorp/terraform:1.10.5 validate` | **Success! The configuration is valid.** Formatted cleanly, zero syntax errors. |
| **2.7** | **Trivy IaC Security Scan** | `docker run --rm -v "%cd%:/workspace" aquasec/trivy:0.59.1 config --severity HIGH,CRITICAL --ignorefile /workspace/.trivyignore /workspace/terraform` | **0 High/Critical misconfigurations**. IMDSv2 enforced; ECR immutability enabled. |
| **2.8** | **Jenkins CI/CD Automation** | Open `http://localhost:8081` in browser. | 13-stage Declarative Pipeline executing in Docker with Docker CLI agent access. |
| **2.9** | **Automated Deployment & Rollback** | Inspect `deploy.sh`. | Automated zero-downtime container updating with health check verification and automatic rollback. |

---

## 💡 Quick Viva Talking Points

1. **Why multi-tier priority sorting over simple FIFO?**
   - *"In a hospital OPD, medical urgency supersedes arrival sequence. Patients with cardiac emergency or severe trauma cannot wait behind routine checkups. The system implements Emergency (3) > High (2) > Normal (1), while maintaining fair FIFO ordering within each priority tier."*
2. **What does Shift-Left DevSecOps mean in this project?**
   - *"Rather than waiting until production to audit vulnerabilities, security checks are shifted left into the developer workflow and CI pipeline. Dependencies, Terraform code, and Docker images are automatically audited by Trivy before any artifact reaches the EC2 server."*
3. **How was the Docker image hardened?**
   - *"We utilized a multi-stage Docker build to keep developer tools and compilers out of production, added `apk upgrade` to patch base Alpine packages (reducing CVEs from multiple to zero), configured custom Nginx security headers, dropped privileges to the `nginx` unprivileged user, and implemented an active HTTP healthcheck endpoint."*
4. **How are secrets protected?**
   - *"Zero secrets, private `.pem` keys, or AWS access tokens are committed to the Git repository. Keys are excluded via `.gitignore`, and Jenkins injects credentials into deployment stages dynamically using encrypted Jenkins Credential storage."*
