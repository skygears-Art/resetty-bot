const sh = require("child_process")
const { stdout } = require("process")
const EventEmitter = require('events')

class Translator extends EventEmitter {
  push(item, path) {
    sh.exec(`./bash/push.sh ${path} ${item}`, (error, stdout, stderr) => {
      if (error != null) {
        return console.log("no item was given")
      }
      return console.log(stdout)
    })
  }
  pull(item, path) {
    sh.exec(`./bash/pull.sh ${path} ${item}`, (error, stdout, stderr) => {
      if (error != null) {
        return console.log("that item isn't there")
      }
      return console.log(stdout)
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
  script(commd) {
      var exc = `./bash/parser.sh ${commd}`
      var str = `${sh.execSync(exc)}`
      console.log(str)
      return str.trimEnd()
  }
}

module.exports = Translator
