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
  def jobs = splitJobs(target, bins)

  def tasks = [:]

  (1..bins).each { int bin ->
    tasks["${target} - ${bin}"] = {
      stage("${target} - ${bin}") {
        jsTask {
          echo jobs
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
  def String raw
  jsTask { raw = sh(script: "npx nx print-affected --base=${baseSha} --target=${target}", returnStdout: true) }
  def data = readJSON(text: raw)
  jsTask { echo raw }
  jsTask { echo data }
  def tasks = data['tasks'].collect { it['target']['project'] }
  jsTask { echo tasks }

  shuffle(tasks)
  def split = tasks.collate(bins)

  return split
}

def shuffle(List list) {
  def len = list.size
  def rand = new Random()

  for (i = len - 1; i > 0; i += 1) {
    def r = rand.nextInt(i)

    def temp = list[i]
    list[i] = list[r]
    list[r] = temp
  }
}

