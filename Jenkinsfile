<<<<<<< HEAD
pipeline {
    agent {
        docker {
            image 'node:22'
            reuseNode true
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Environment') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Website') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'Hospital Queue Management System build completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
    }
}
=======

pipeline {
    agent none

    parameters {
        booleanParam(
            name: 'DEPLOY_TO_EC2',
            defaultValue: false,
            description: 'Deploy to the existing EC2 instance only when explicitly enabled'
        )
        string(
            name: 'EC2_HOST',
            defaultValue: '',
            description: 'Public IP address or DNS of EC2'
        )
        string(
            name: 'EC2_USER',
            defaultValue: 'ubuntu',
            description: 'SSH username: ubuntu or ec2-user'
        )
        string(
            name: 'EC2_SSH_CREDENTIAL_ID',
            defaultValue: 'hospital-queue-ssh-key',
            description: 'Jenkins SSH private-key credential ID'
        )
        booleanParam(
            name: 'ENABLE_SONARQUBE',
            defaultValue: false,
            description: 'Optional; requires a working SonarQube connection and token'
        )
    }

    environment {
        APP_NAME      = 'hospital-queue'
        IMAGE_TAG     = "${BUILD_NUMBER}"
        TRIVY_VERSION = '0.59.1'
        TERRAFORM_VER = '1.10.5'
        NODE_IMAGE    = 'node:22-alpine'
        SONAR_HOST_URL = 'http://hospital-sonarqube:9000'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            agent any
            steps {
                checkout scm
                sh 'git rev-parse --short HEAD'
            }
        }

        stage('Check Environment') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Automated Tests') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Linting') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build Application') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run build'
                sh 'test -d dist'
                sh 'ls -la dist/'
            }
        }

        stage('Trivy Source & Dependency Scan') {
            agent any
            steps {
                sh '''
                    set -eu
                    mkdir -p reports

                    docker run --rm \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} fs \
                      --scanners vuln,secret,misconfig \
                      --format json \
                      --output /workspace/reports/trivy-filesystem.json \
                      /workspace

                    docker run --rm \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} fs \
                      --scanners vuln,secret,misconfig \
                      --severity HIGH,CRITICAL \
                      --exit-code 1 \
                      /workspace
                '''
            }
        }

        stage('Terraform Validation') {
            agent any
            steps {
                sh '''
                    set -eu
                    test -d terraform

                    docker run --rm \
                      -v "$WORKSPACE/terraform:/workspace" \
                      -w /workspace \
                      hashicorp/terraform:${TERRAFORM_VER} fmt -check

                    docker run --rm \
                      -v "$WORKSPACE/terraform:/workspace" \
                      -w /workspace \
                      hashicorp/terraform:${TERRAFORM_VER} init -backend=false

                    docker run --rm \
                      -v "$WORKSPACE/terraform:/workspace" \
                      -w /workspace \
                      hashicorp/terraform:${TERRAFORM_VER} validate
                '''
            }
        }

        stage('Trivy Terraform Scan') {
            agent any
            steps {
                sh '''
                    set -eu
                    mkdir -p reports

                    docker run --rm \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} config \
                      --format json \
                      --output /workspace/reports/trivy-terraform.json \
                      /workspace/terraform

                    docker run --rm \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} config \
                      --severity HIGH,CRITICAL \
                      --exit-code 1 \
                      /workspace/terraform
                '''
            }
        }

        stage('Build Docker Image') {
            agent any
            steps {
                sh '''
                    set -eu
                    docker build \
                      -t "$APP_NAME:$IMAGE_TAG" \
                      -t "$APP_NAME:latest" .
                    docker images "$APP_NAME"
                '''
            }
        }

        stage('Trivy Docker Image Scan') {
            agent any
            steps {
                sh '''
                    set -eu
                    mkdir -p reports

                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} image \
                      --image-src docker \
                      --format json \
                      --output /workspace/reports/trivy-image.json \
                      "$APP_NAME:$IMAGE_TAG"

                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      -v "$WORKSPACE:/workspace" \
                      aquasec/trivy:${TRIVY_VERSION} image \
                      --image-src docker \
                      --severity HIGH,CRITICAL \
                      --exit-code 1 \
                      "$APP_NAME:$IMAGE_TAG"
                '''
            }
        }

        stage('SonarQube Analysis') {
            agent any
            when {
                expression { params.ENABLE_SONARQUBE }
            }
            steps {
                error(
                    'SonarQube is optional and has not been integrated in this pipeline yet. ' +
                    'Configure its server, token and scanner before enabling this parameter.'
                )
            }
        }

        stage('Deploy to EC2') {
            agent any
            when {
                expression {
                    params.DEPLOY_TO_EC2 &&
                    params.EC2_HOST?.trim()
                }
            }
            steps {
                script {
                    if (!(params.EC2_HOST ==~ /^[a-zA-Z0-9.-]+$/)) {
                        error('EC2_HOST must be a valid public IP or DNS name.')
                    }

                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: params.EC2_SSH_CREDENTIAL_ID,
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh '''
                            set -eu

                            test -f deploy.sh

                            scp -o StrictHostKeyChecking=accept-new \
                              -i "$SSH_KEY" \
                              deploy.sh \
                              "$SSH_USER@$EC2_HOST:/home/$SSH_USER/deploy.sh"

                            ssh -o StrictHostKeyChecking=accept-new \
                              -i "$SSH_KEY" \
                              "$SSH_USER@$EC2_HOST" \
                              "chmod +x /home/$SSH_USER/deploy.sh && /home/$SSH_USER/deploy.sh"

                            curl --fail --silent --show-error \
                              --retry 5 --retry-delay 3 \
                              "http://$EC2_HOST/"
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'reports/**',
                allowEmptyArchive: true
            )
            echo "Build number: ${BUILD_NUMBER}"
            echo "Job name: ${JOB_NAME}"
            echo 'Review the stage results and archived scan reports.'
        }

        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check Console Output and the failed stage.'
        }

        cleanup {
            echo 'Pipeline cleanup complete.'
        }
    }
}
>>>>>>> ec471b1 (New changes)
