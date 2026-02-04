pipeline {
  agent any

  environment {
    AWS_REGION = "us-east-1"
    ECR_REPO = "<account-id>.dkr.ecr.us-east-1.amazonaws.com/jenkins-demo"
    IMAGE_TAG = "${BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t jenkins-demo:${IMAGE_TAG} .'
      }
    }

    stage('Login to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region $AWS_REGION \
          | docker login --username AWS --password-stdin https://826828992763.dkr.ecr.us-west-2.amazonaws.com

        '''
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh '''
          docker tag jenkins-demo:${IMAGE_TAG} $ECR_REPO:${IMAGE_TAG}
          docker push $ECR_REPO:${IMAGE_TAG}
        '''
      }
    }
  }
}
