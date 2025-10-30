pipeline {
    agent any

    environment {
        IMAGE_NAME = "student-marks-app"
        CONTAINER_NAME = "student-marks-container"
    }

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

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t student-marks-app ./frontend'
                }
            }
        }

        stage('Run Docker Container') {
    steps {
        script {
            // Stop & remove old container if it exists
            bat '''
            docker stop student-marks-container || echo "No container to stop"
            docker rm student-marks-container || echo "No container to remove"
            '''

            // Remove old image (optional cleanup)
            bat 'docker rmi student-marks-app || echo "No old image to remove"'

            // Run new container
            bat 'docker run -d -p 3000:80 --name student-marks-container student-marks-app'
        }
    }
}
}

    post {
        success {
            echo '🎉 Build, Docker image, and container setup completed successfully!'
        }
        failure {
            echo '❌ Something went wrong during the build.'
        }
    }
}
