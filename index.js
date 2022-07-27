const {client} = require("./main.js")
const cronjs = require('node-schedule')
const fs = require("fs")
const Translator = require("./bash/tr.js")
const sh = new Translator
const reset = require("./reset.js")
const token = process.env.DAKEY
const list = "./saves/channels.list"

const job = cronjs.scheduleJob(`0 0 31 12 0`, () => {
  reset.rst()
  console.log(`channel updated`)
})

sh.on("timeChange", () => {
  if (job.reschedule(`${fs.readFileSync("./saves/timer.sav")}`)) {
    console.log(`job updated to ${fs.readFileSync("./saves/timer.sav")}`)
  }
  else {console.log("INVALID CRON TASK please fix")}
})

//                                      //ON READY/ TODO make save.csv when there isn't one remplace save folder with it
client.on("ready", () => {
  //sh.script("cat save.csv | awk -F , '{print $2}'")
  if (job.reschedule(`${fs.readFileSync("./saves/timer.sav")}`)) {
    console.log(`job updated to ${fs.readFileSync("./saves/timer.sav")}`)
  }
  else {console.log("invalid cron task please fix")}
  console.log(`logged as ${client.user.tag}`)
})

//Commands triggers
client.on("messageCreate", (msg) => {

  //                                        "--schedule" command
  if (msg.content.startsWith("--schedule")) {
    var where = `<#${sh.lister(list).join('> <#')}>`
    if (fs.readFileSync("./saves/schedule.sav") == "CUSTOM") {
      var when = fs.readFileSync("./saves/timer.sav")
      return msg.channel.send(`The channels ${where} are being scrubbed with a cron task of \`${when}\``)
    }
    var when = fs.readFileSync("./saves/schedule.sav")
    return msg.channel.send(`The channels ${where} are being scrubbed **${when}**`)
  }

  //                                        "--help" command
  if (msg.content.startsWith("--help")) {
    return msg.channel.send(`${fs.readFileSync("./doc/help.info")}`)
  }
  //this is for admin and owner server only
  var aid = msg.guild.roles.highest.members.has(`${msg.author.id}`)
  if (aid || `${msg.guild.ownerId}`== `${msg.author.id}`) {

    //                                      "--addthis" command
    if (msg.content.startsWith("--addthis")) {
      msg.channel.send(`<#${msg.channel.id}> is going to be **scrubbed**`)
      return sh.push(`${msg.channel.id}`, list)
    }

    //                                      "--removethis" command
    if (`${msg.content}` == `--removethis` || `${msg.content}` == `--rmthis` ) {
      sh.pull(`${msg.channel.id}`, list);
      return msg.channel.send(`<#${msg.channel.id}> is not going to be scrubbed`)
    }

    //                                      "--timer" command
    if (msg.content.startsWith("--timer")) {
      var num = msg.content.slice(8, 9)
      if (sh.timer(`"${num}"`)) {
          if (num == "1") {
              return msg.channel.send(`The listed channels will be scrubbed **everyday**`)
        }
        return msg.channel.send(`The listed channels will be scrubbed **every ${num} days**`)
      }
      job.reschedule(`${fs.readFileSync("./saves/timer.sav")}`)
      return msg.channel.send(`After **--timer** please put a number between **0 and 7**`)
    }

    //                                      "--template" commandd
    if (msg.content.startsWith("--template")) {
      fs.writeFileSync(`./saves/template.sav`, msg.content.slice(11))
      return msg.channel.send(`The following message **' welcome to CHANNEL - ${msg.content.slice(11)} '** will appear on a newly scrubbed channel`)
    }

    //                                      "--resetnow" command
    if (msg.content.startsWith("--resetnow")||msg.content.startsWith("--scrubnow")) {
      if (`${fs.readFileSync(list)}` != ""){
        return reset.rst()
      }
      return msg.channel.send("Please add **at less one channel** for to the channel list")
    }

    //                                      "--cronset" command
    if (msg.content.startsWith("--cronset")){
      var com = msg.content.slice(10).replace("`", "")
      var txt = com.replace("`", "")
      if (txt.length > 8) {
        if (job.reschedule(txt)) {
            console.log(txt)
            fs.writeFileSync(`./saves/timer.sav`, txt)
            fs.writeFileSync("./saves/schedule.sav", "CUSTOM")
            return msg.channel.send(`**Warning** you are changing the cron task manually to **\`${txt}\`** for more information use **--cronhelp**`)
        }
      }
      return msg.channel.send("Not a valid cron task you can also use **--timer HOUR** to setup the scrub schedule")
    }

    //                                      "--cronhelp" command
    if (msg.content.startsWith("--cronhelp")){
      return msg.channel.send(`${fs.readFileSync("./doc/cronhelp.info")}`)
    }
  }
})

client.login(token)
