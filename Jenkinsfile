stage("Prepare") {
  jsTask {
    checkout scm
    sh 'yarn install'
  }
}

def distributedTasks = [:]

stage("Building Distributed Tasks") {
  distributedTasks << distributed('test', 3)
  distributedTasks << distributed('lint', 3)
  distributedTasks << distributed('build', 3)
  jsTask { echo "BEFORE" }
  jsTask { echo distributedTasks.inspect }
  jsTask { echo "AFTER" }
}
parallel distributedTasks

def jsTask(Closure cl) {
  node {
    withEnv(["HOME=${workspace}"]) {
      docker.image('node:latest').inside('--tmpfs /.config', cl)
    }
  }
}

def distributed(String target, int bins) {
  def jobs = splitJobs(target, bins)
  def tasks = [:]

  jobs.eachWithIndex { jobRun, i ->
    jsTask { echo 'loop' }

    def list = jobRun.join(',')

    tasks["${target} - ${i}"] ={
      stage("${target} - ${i}") {
        jsTask {
          sh "npx nx run-many --target=${target} --projects=${list} --parallel"
        }
      }
    }
  }

  jsTask { echo "BEFORE" }
  jsTask { echo task.inspect }
  jsTask { echo "AFTER" }

  return tasks
}

def splitJobs(String target, int bins) {
  def String baseSha = env.CHANGE_ID ? 'origin/master' : 'origin/master~1'
  def String raw
  jsTask { raw = sh(script: "npx nx print-affected --base=${baseSha} --target=${target}", returnStdout: true) }
  def data = readJSON(text: raw)

  def tasks = data['tasks'].collect { it['target']['project'] }

  def split = tasks.collate(bins)

  return split
}
