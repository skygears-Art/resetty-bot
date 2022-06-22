const sh = require("child_process")
const { stdout } = require("process")
const EventEmitter = require('events')

class Translator extends EventEmitter {
  push(item, path) {
    sh.exec(`./bash/push.sh ${path} ${item}`, (error, stdout, stderr) => {
      if (error != null) {
        return console.log("no item was given")
      }
      console.log(stdout)
    })
  }
  pull(item, path) {
    sh.exec(`./bash/pull.sh ${path} ${item}`, (error, stdout, stderr) => {
      if (error != null) {
        return console.log("add atless one item to the list")
      }
      console.log(stdout)
    })
  }
  lister(path) {
    var exc = `./bash/lister.sh ${path}`
    var list = `${sh.execSync(exc)}`
    return list.split("_")
  }
  timer(date) {
    var exc = sh.execSync(`./bash/my-timer.sh ${date}`)
    var ouput = `${exc}`
    if (ouput.startsWith("after")) {
      return false
    }
    this.emit("timeChange")
    console.log(ouput)
    return true
  }
}

module.exports = Translator