pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature-crud', url: 'https://github.com/Indra9078/devops_crud.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build App') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'frontend/build/**', fingerprint: true
            }
        }
    }
}
