node {
  withEnv(["HOME=${workspace}"]) {
    docker.image('node:latest').inside('--tmpfs /.config') {
      stage("Prepare") {
        sh 'pwd'
        sh 'echo $HOME'
        checkout scm
        sh 'yarn install'
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
