stage("Prepare") {
  jsTask {
    checkout scm
    sh 'yarn install'
  }
}

def distributedTasks = [:]
distributedTasks += distributed('test', 3)
distributedTasks += distributed('lint', 3)
distributedTasks += distributed('build', 3)

parallel distributedTasks

def jsTask(Closure cl) {
  node('master') {
    withEnv(["HOME=${workspace}"]) {
      docker.image('node:latest').inside('--tmpfs /.config', cl)
    }
  }
}

def distributed(String target, int bins) {
  def jobs = splitJobs(target, bins)
  def tasks = [:]

  (1..bins).each { int bin ->
    tasks["${target} - ${bin}"] = {
      stage("${target} - ${bin}") {
        jsTask {
          def list = jobs[bin - 1].join(',')
          sh "npx nx run-many --target=${target} --projects=${list} --parallel"
        }
      }
    }
  }

  return tasks
}

def splitJobs(String target, int bins) {
  def String baseSha = env.CHANGE_ID ? 'origin/master' : 'origin/master~1'
  def raw = sh(script: "npx nx print-affected --base=${baseSha} --target=${target}", returnStdout: true)
  def data = readJSON(text: raw)
  def tasks = data['tasks'].collect { it['target']['project'] }

  Collections.shuffle(tasks)
  def split = tasks.collate(bins)

  return split
}

