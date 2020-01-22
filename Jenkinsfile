node {
  withEnv(["HOME=${workspace}"]) {
    docker.image('node:latest').inside('--tmpfs /.config -u root:root') {
      stage("Prepare") {
        checkout scm
        sh 'yarn install --unsafe-permg'
      }

      stage("Test") {
        sh 'yarn nx run-many --target=test --all'
      }

      stage("Lint") {
        sh 'yarn nx run-many --target=lint --all'
      }

      stage("Build") {
        sh 'yarn nx run-many --target=build --all --prod'
      }
    }
  }
}
