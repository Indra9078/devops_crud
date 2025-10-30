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
                echo '✅ Build completed and archived successfully!'
            }
        }
    }

    post {
        success {
            echo '🎉 Build finished successfully. You can now deploy manually using Docker.'
        }
        failure {
            echo '❌ Build failed. Check logs for errors.'
        }
    }
}
