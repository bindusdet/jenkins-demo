pipeline {
  agent any

  environment {
    AWS_REGION    = "us-west-2"
    AWS_ACCOUNT  = "826828992763"
    ECR_REGISTRY = "${AWS_ACCOUNT}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    ECR_REPO     = "${ECR_REGISTRY}/jenkins-demo"
    IMAGE_TAG    = "${BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build -t jenkins-demo:${IMAGE_TAG} .
        '''
      }
    }

    stage('Login to ECR') {
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'aws-creds'
        ]]) {
          sh '''
            aws sts get-caller-identity

            aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin \
            ${ECR_REGISTRY}
          '''
        }
      }
    }

    stage('Push Image to ECR') {
      steps {
        sh '''
          docker tag jenkins-demo:${IMAGE_TAG} ${ECR_REPO}:${IMAGE_TAG}
          docker push ${ECR_REPO}:${IMAGE_TAG}
        '''
      }
    }

  }
}
