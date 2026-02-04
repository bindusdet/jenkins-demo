pipeline {
  agent any

  environment {
    AWS_REGION = "us-west-2"
    ECR_REPO = "826828992763.dkr.ecr.us-west-2.amazonaws.com/jenkins-demo"
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
          | docker login --username AWS --password-stdin $ECR_REPO
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

    stage('Deploy to EKS') {
      steps {
        sh '''
          aws eks update-kubeconfig --region $AWS_REGION --name jenkins-cluster
          kubectl apply -f deployment.yaml
          kubectl apply -f service.yaml
        '''
     }
   }


  }
}
