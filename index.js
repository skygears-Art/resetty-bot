const {client} = require("./main.js")
const cronjs = require('node-schedule')
const fs = require("fs")
const Translator = require("./bash/tr.js")
const sh = new Translator
const reset = require("./reset.js")
const token = process.env.DAKEY
const list = "./channels.list"

const job = cronjs.scheduleJob(`0 0 31 12 0`, () => {
  reset.rst()
  console.log(`channel updated`)
})

sh.on("timeChange", () => {
  if (job.reschedule(`${fs.readFileSync("./timer.sav")}`)) {
    console.log(`job updated to ${fs.readFileSync("./timer.sav")}`)
  }
  else {console.log("INVALID CRON TASK please fix")}
})

client.on("ready", () => {
  if (job.reschedule(`${fs.readFileSync("./timer.sav")}`)) {
    console.log(`job updated to ${fs.readFileSync("./timer.sav")}`)
  }
  else {console.log("invalid cron task please fix")}
  console.log(`logged as ${client.user.tag}`)
})

//Comands triggers
client.on("messageCreate", (msg) => {
  //                                        "--schedule" command
  if (msg.content.startsWith("--schedule")) {
    var where = `<#${sh.lister(list).join('> <#')}>`
    if (fs.readFileSync("./schedule.sav") == "CUSTOM") {
      var when = fs.readFileSync("./timer.sav")
      return msg.channel.send(`the chennels ${where} are being reset with a cron task of \`${when}\``)
    }
    var when = fs.readFileSync("./schedule.sav")
    msg.channel.send(`the chennel ${where} are being reset daily at **${when}**`)
  }

  //                                        "--help" command
  if (msg.content.startsWith("--help")) {
    msg.channel.send(`${fs.readFileSync("./doc/help.info")}`)
  }
  //this is for admin and owner server only
  var aid = msg.guild.roles.highest.members.has(`${msg.author.id}`)
  if (aid || `${msg.guild.ownerId}`== `${msg.author.id}`) {

    //                                      "--addthis" command
    if (msg.content.startsWith("--addthis")) {
      msg.channel.send(`<#${msg.channel.id}> is going to be **reset**`)
      sh.push(`${msg.channel.id}`, list)
    }

    //                                      "--removethis" command
    if (`${msg.content}` == `--removethis` || `${msg.content}` == `--rmthis` ) {
      sh.pull(`${msg.channel.id}`, list);
      msg.channel.send(`<#${msg.channel.id}> is not going to be reset`)
    }

    //                                      "--timer" command
    if (msg.content.startsWith("--timer")) {
      var num = msg.content.slice(8, 10)
      if (sh.timer(`"${num}"`)) {
        return msg.channel.send(`reset time set at **${num}:00 HS** everyday`)
      }
      job.reschedule(`${fs.readFileSync("./timer.sav")}`)
      msg.channel.send(`after **--timer** please put a number between **0 and 23**`)
    }

    //                                      "--template" commandd
    if (msg.content.startsWith("--template")) {
      fs.writeFileSync(`./template.sav`, msg.content.slice(11))
      msg.channel.send(`the follow message **' welcome to CHANNEL - ${msg.content.slice(11)} '** will apear on a newly reset channel`)
    }

    //                                      "--resetnow" command
    if (msg.content.startsWith("--resetnow")||msg.content.startsWith("--rstnow")) {
      if (`${fs.readFileSync(list)}` != ""){
        return reset.rst()
      }
      msg.channel.send("please add **at less one channel** for reset")
    }

    //                                      "--cronset" command
    if (msg.content.startsWith("--cronset")){
      var com = msg.content.slice(10).replace("`", "")
      var txt = com.replace("`", "")
      if (job.reschedule(txt) && txt !== "") {
        console.log(txt)
        fs.writeFileSync(`timer.sav`, txt)
        fs.writeFileSync("./schedule.sav", "CUSTOM")
        return msg.channel.send(`**warning** you are changing the cron task manually to **\`${txt}\`** for more information use **--cronhelp**`)
      }
      msg.channel.send("not a valid cron task you can also use **--timer HOUR** to setup the reset schedule")
    }

    //                                      "--cronhelp" command
    if (msg.content.startsWith("--cronhelp")){
      msg.channel.send(`${fs.readFileSync("./doc/cronhelp.info")}`)
    }
  }
})

client.login(token)
