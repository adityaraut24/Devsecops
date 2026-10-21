#!/usr/bin/env bash
# =============================================================================
# Automated EC2 Deployment & Rollback Script
# Project: Hospital Queue Management System
# =============================================================================

set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-hospital-queue:1.0}"
CONTAINER_NAME="${CONTAINER_NAME:-hospital-queue-app}"
BACKUP_NAME="${CONTAINER_NAME}-backup"
HOST_PORT="${HOST_PORT:-80}"
CONTAINER_PORT="${CONTAINER_PORT:-80}"
HEALTH_TIMEOUT="${HEALTH_TIMEOUT:-30}"

echo "======================================================="
echo " Hospital Queue Management System — EC2 Deployment"
echo " Image:          ${IMAGE_NAME}"
echo " Container:      ${CONTAINER_NAME}"
echo " Port:           ${HOST_PORT} -> ${CONTAINER_PORT}"
echo " Timestamp:      $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "======================================================="

# Function: Detect and install Docker if not present
ensure_docker_installed() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "[!] Docker not found. Detecting operating system..."
    if [ -f /etc/os-release ]; then
      . /etc/os-release
      case "${ID}" in
        ubuntu|debian)
          echo "[+] Installing Docker on Ubuntu/Debian..."
          sudo apt-get update -y
          sudo apt-get install -y docker.io curl
          sudo systemctl enable --now docker
          sudo usermod -aG docker "${USER}" || true
          ;;
        amzn|rhel|centos|fedora)
          echo "[+] Installing Docker on Amazon Linux/RHEL..."
          sudo dnf install -y docker || sudo yum install -y docker
          sudo systemctl enable --now docker
          sudo usermod -aG docker "${USER}" || true
          ;;
        *)
          echo "[-] Unsupported OS (${ID}). Please install Docker manually." >&2
          exit 1
          ;;
      esac
    fi
  else
    echo "[✓] Docker is already installed: $(docker --version)"
  fi
}

# Function: Healthcheck validation
verify_health() {
  local target_url="http://127.0.0.1:${HOST_PORT}/health"
  echo "[+] Checking container health at ${target_url} (timeout: ${HEALTH_TIMEOUT}s)..."
  local count=0
  until curl -s -f -o /dev/null "${target_url}"; do
    sleep 2
    count=$((count + 2))
    if [ "${count}" -ge "${HEALTH_TIMEOUT}" ]; then
      echo "[-] Health check timed out after ${HEALTH_TIMEOUT} seconds!" >&2
      return 1
    fi
  done
  echo "[✓] Health check passed successfully: ${target_url} returned HTTP 200 OK."
  return 0
}

# Function: Rollback to previous container
do_rollback() {
  echo "[!] INITIATING AUTOMATED ROLLBACK..."
  if docker ps -a --format '{{.Names}}' | grep -Eq "^${BACKUP_NAME}\$"; then
    echo "[+] Stopping failing new container..."
    docker stop "${CONTAINER_NAME}" || true
    docker rm -f "${CONTAINER_NAME}" || true

    echo "[+] Restoring previous backup container (${BACKUP_NAME})..."
    docker start "${BACKUP_NAME}"
    docker rename "${BACKUP_NAME}" "${CONTAINER_NAME}"
    echo "[✓] Rollback completed! Restored previous working version."
  else
    echo "[-] No backup container (${BACKUP_NAME}) found. Manual intervention required." >&2
    exit 1
  fi
}

# Support explicit rollback invocation
if [ "${1:-deploy}" = "rollback" ]; then
  do_rollback
  exit 0
fi

# Main Deployment Flow
ensure_docker_installed

# Step 1: Handle existing running container as backup
if docker ps --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}\$"; then
  echo "[+] Existing deployment detected. Preparing safe rollback copy..."
  docker rm -f "${BACKUP_NAME}" >/dev/null 2>&1 || true
  docker stop "${CONTAINER_NAME}"
  docker rename "${CONTAINER_NAME}" "${BACKUP_NAME}"
fi

# Step 2: Launch new production container
echo "[+] Starting new application container from ${IMAGE_NAME}..."
if ! docker run -d \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  "${IMAGE_NAME}"; then
  echo "[-] Failed to run new container!" >&2
  if docker ps -a --format '{{.Names}}' | grep -Eq "^${BACKUP_NAME}\$"; then
    do_rollback
  fi
  exit 1
fi

# Step 3: Run healthcheck
if verify_health; then
  echo "[+] Deployment verified healthy."
  if docker ps -a --format '{{.Names}}' | grep -Eq "^${BACKUP_NAME}\$"; then
    echo "[+] Cleaning up previous backup container..."
    docker rm -f "${BACKUP_NAME}" >/dev/null 2>&1 || true
  fi
  echo "======================================================="
  echo " [✓] HOSPITAL QUEUE MANAGEMENT SYSTEM DEPLOYED"
  echo " URL: http://$(curl -s https://checkip.amazonaws.com 2>/dev/null || echo 'localhost'):${HOST_PORT}"
  echo "======================================================="
else
  echo "[-] New deployment failed health verification. Triggering rollback..." >&2
  do_rollback
  exit 1
fi
