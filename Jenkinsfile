
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Website') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t hospital-queue:1.0 .'
            }
        }
    }

    post {
        success {
            echo 'Hospital Queue Management System pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the console output for errors.'
        }
    }
}
