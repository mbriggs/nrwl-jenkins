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
  node {
    withEnv(["HOME=${workspace}"]) {
      docker.image('node:latest').inside('--tmpfs /.config', cl)
    }
  }
}

def distributed(String target, int bins) {
  jsTask { echo 'distributed' }


  def jobs = splitJobs(target, bins)

  def tasks = [:]

  jobs.eachWithIndex { jobRun, i ->
    jsTask { echo 'loop' }

    def list = jobRun.join(',')

    jsTask { echo list }
    jsTask { echo 'here' }

    tasks["${target} - ${i}"] ={
      stage("${target} - ${i}") {
        jsTask {
          sh "npx nx run-many --target=${target} --projects=${list} --parallel"
        }
      }
    }
  }

  return tasks
}

def splitJobs(String target, int bins) {
  def String baseSha = env.CHANGE_ID ? 'origin/master' : 'origin/master~1'
  def String raw
  jsTask { raw = sh(script: "npx nx print-affected --base=${baseSha} --target=${target}", returnStdout: true) }
  def data = readJSON(text: raw)
  jsTask { echo 'json' }

  def tasks = data['tasks'].collect { it['target']['project'] }
  jsTask { echo 'tasks' }

  def split = tasks.collate(bins)

  jsTask { echo 'collated' }
  return split
}
