const {client} = require('./main.js')
const token = process.env['DAKEY']

client.on("ready", () => {
  console.log(`logged as ${client.user.tag}`)
})

client.on("messageCreate", (msg) => {
  if (`${msg.content}` == `--hibot`) {
    msg.reply("hi")
  }
  if (`${msg.content}` == `--byebye`) { process.exit() }
})

client.login(token)