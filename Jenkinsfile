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

        stage('Copy Build to Local Folder') {
            steps {
                // Make sure this path exists in your system
                bat '''
                if not exist "C:\Users\INDRAJIT\Downloads\jenkins\build" mkdir "C:\Users\INDRAJIT\Downloads\jenkins\build"
                xcopy /E /I /Y "frontend\\build" "C:\Users\INDRAJIT\Downloads\jenkins\build"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build completed and copied to local folder successfully!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
