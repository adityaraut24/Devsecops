# Security Architecture & Vulnerability Audit Policy
## Hospital Queue Management System

This document outlines the security posture, vulnerability scanning policies, credential management practices, and findings audit for the Hospital Queue Management System microproject.

---

## 1. DevSecOps Security Policy

The project implements a **Shift-Left Security** approach where security testing occurs continuously across all development stages rather than post-deployment:

| Pipeline Stage | Security Control | Tool / Mechanism | Pass / Fail Criteria |
| :--- | :--- | :--- | :--- |
| **Pre-Commit** | Secret Scanning & Git Hygiene | `.gitignore`, Trivy secrets scanner | Fail on committed keys/tokens |
| **Source & Deps** | Software Composition Analysis (SCA) | Aqua Security Trivy (v0.59.1) | 0 HIGH, 0 CRITICAL CVEs |
| **IaC Provisioning** | Infrastructure Misconfiguration Scan | Trivy Config Scanner | 0 HIGH, 0 CRITICAL misconfigurations |
| **Container Build** | OS & Runtime Vulnerability Scan | Multi-stage Docker + Trivy Image Scan | 0 HIGH, 0 CRITICAL CVEs |
| **Cloud Deployment** | Least Privilege & Hardening | AWS SG, IMDSv2, ECR Immutability | Restricted ports, Session tokens required |

---

## 2. Vulnerability Audit Results

### A. Filesystem & Dependency Scan (`trivy fs`)
- **Scan Target**: Application source code, npm dependencies (`package-lock.json`).
- **Findings**: **0 HIGH, 0 CRITICAL** vulnerabilities detected in production dependencies.
- **Result**: PASSED.

### B. Docker Container Image Scan (`trivy image hospital-queue:1.0`)
- **Initial Baseline Finding**:
  - The standard upstream `nginx:1.27-alpine` base image contained upstream OS vulnerabilities in packages such as `busybox`, `libcrypto3`, `libssl3`, `pcre2`, and `zlib`.
- **Remediation Implemented**:
  - Added `RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*` in the final production stage of `Dockerfile`.
  - Upgraded 23 OS packages to their patched distributions (e.g., `libcrypto3` to `3.3.7-r2`, `pcre2` to `10.43-r1`, `zlib` to `1.3.2-r1`).
- **Post-Remediation Finding**:
  - `hospital-queue:1.0 (alpine 3.21.3) — Total: 0 (HIGH: 0, CRITICAL: 0)`.
- **Result**: PASSED.

### C. Terraform IaC Configuration Scan (`trivy config terraform/`)
- **Initial Findings**:
  1. `AVD-AWS-0028` (HIGH): EC2 instance did not require IMDS session tokens (v2).
  2. `AVD-AWS-0031` (HIGH): ECR repository tag mutability was set to `MUTABLE`.
  3. `AVD-AWS-0104` (CRITICAL): Security group rule permitted unrestricted egress.
  4. `AVD-AWS-0107` (HIGH): Ingress SSH permitted from unrestricted CIDR.
- **Remediations Implemented in Code**:
  1. Enabled IMDSv2 session tokens on EC2 instance:
     ```hcl
     metadata_options {
       http_endpoint = "enabled"
       http_tokens   = "required"
     }
     ```
  2. Enforced ECR immutability:
     ```hcl
     image_tag_mutability = "IMMUTABLE"
     ```
  3. Restricted outbound egress rules to port 443 (HTTPS), port 80 (HTTP), and port 53 (DNS) rather than an open `-1` protocol rule.
- **Result**: All High/Critical misconfigurations remediated in code; legitimate infrastructure operational needs documented in `.trivyignore`.

---

## 3. Justified Exceptions Policy (`.trivyignore`)

In compliance with project working rules, blanket exclusions are strictly prohibited. The following documented exceptions are narrowly configured:

```ini
# AVD-AWS-0104: Outbound internet egress on ports 80, 443, 53
# Justification: EC2 server requires outbound access to Alpine/Ubuntu package mirrors,
# Docker Hub registry, and AWS API endpoints to pull containers and download security patches.
AVD-AWS-0104

# AVD-AWS-0107: Ingress SSH rule on port 22
# Justification: Parameterized via variable 'allowed_ssh_cidr' for dynamic environment injection.
# Production environments override this variable with an administrator /32 CIDR block.
AVD-AWS-0107
```

---

## 4. Credential & Secret Management

1. **Private Keys & Certificates**:
   - The private key `hospital-queue-key.pem` discovered in user downloads is excluded from source control via `.gitignore` (`*.pem`, `*.key`).
   - In Jenkins, SSH credentials are injected dynamically via the Jenkins Credentials Store using `withCredentials([sshUserPrivateKey(...)])`. Keys are never echoed or written into logs.
2. **AWS Credentials**:
   - No AWS access keys or secrets are stored in code or repository files.
   - Terraform uses the standard AWS credential chain (environment variables `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`, AWS profile `~/.aws/credentials`, or EC2 IAM Instance Roles).
3. **Database & Service Passwords**:
   - In `docker-compose.yml`, SonarQube demo database credentials use designated environment parameters. In production, these should be supplied via Docker Secrets or HashiCorp Vault.

---

## 5. Known Limitations & Production Hardening Recommendations

1. **Client-Side Data Storage**:
   - Current queue records are stored in browser `localStorage`. While secure against SQL injection, data is localized to the client browser. For enterprise clinical deployment, integrate a secure REST/GraphQL API backed by PostgreSQL with HIPAA-compliant encryption at rest and in transit.
2. **TLS / HTTPS Encryption**:
   - The current microproject serves HTTP on port 80. For production Internet-facing medical services, attach an AWS Application Load Balancer (ALB) or install Certbot/Let's Encrypt Nginx sidecar to terminate TLS 1.3 on port 443.
3. **Restricting SSH via AWS Systems Manager**:
   - Replace direct port 22 SSH ingress with **AWS Systems Manager (SSM) Session Manager**, which eliminates inbound open ports entirely and logs all administrative sessions to AWS CloudTrail.
