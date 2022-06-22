const {client} = require("./main.js")
const Translator = require("./bash/tr.js")
const sh = new Translator
const fs = require("fs")
const list = "./saves/channels.list"
const templ = "./saves/template.sav"
const serch = client.channels.cache


const reset = { rst: function (){
  if (`${fs.readFileSync(list)}` != "") {
    sh.lister(list).forEach( i => {
      serch.get(i).clone().then(clone => {
        var msg = `welcome to <#${clone.id}> - ` + `${fs.readFileSync(templ)}`
        serch.get(i).delete()
        clone.send(msg)
        sh.push(clone.id, list)
        sh.pull(i, list)
      })
    })
  }
}}

module.exports = reset
