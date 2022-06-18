const Discord = require('discord.js')
const main = {
  client: new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_WEBHOOKS"
  ]
  })
}

module.exports = main