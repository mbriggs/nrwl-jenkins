stage("Prepare") {
  jsTask {
    checkout scm
    sh 'yarn install'
  }
}

distributed('test', 3)
distributed('lint', 3)
distributed('build', 3)

def jsTask(Closure cl) {
  node('master') {
    withEnv(["HOME=${workspace}"]) {
      docker.image('node:latest').inside('--tmpfs /.config', cl)
    }
  }
}

def distributed(String target, int bins) {
  def jobs = splitJobs(target, bins)

  (1..bins).each {
    stage("${target} - ${it}") {
      jsTask {
        def list = jobs[it - 1].join(',')
        sh "npx nx run-many --target=${target} --projects=${list} --parallel"
      }
    }
  }
}

def splitJobs(String target, int bins) {
  def String baseSha = env.CHANGE_ID ? 'origin/master' : 'origin/master~1'
  def raw = sh("npx nx print-affected --base=${baseSha} --target=${target}", returnStdout: true)
  def data = readJSON(text: raw)
  def tasks = data['tasks'].collect { it['target']['project'] }

  Collections.shuffle(tasks)
  def split = tasks.collate(bins)

  return split
}

