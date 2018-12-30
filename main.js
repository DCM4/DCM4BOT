const Discord = require("discord.js");
const moment = require("moment");

const bot = new Discord.Client()
let BotSettings = require("./botsettings.json")

bot.on("ready", async () => {
    console.log(`Bot ist eingeloggt als: ${bot.user.tag} \nPrefix: ${BotSettings.prefix}`)
    bot.user.setStatus("online")
    bot.user.setActivity(`mit ${bot.users.get(BotSettings.OwnerID).tag}`,{
        type: "PLAYING"
    })
})

bot.on("message", async message => {

    var args = message.content.slice(BotSettings.prefix.length).trim().split(" ")
    var command = args.shift()

//Test Command
if(message.content == `${BotSettings.prefix}test`) {
        message.channel.send("Das hier ist ein Test Befehl!")
}

//Help
if(message.content == `${BotSettings.prefix}help`) {
    var Helpembed = new Discord.RichEmbed()

    .setColor("#1ABC9C")
    .setTitle("Help Befehl")
    .setThumbnail(bot.user.avatarURL)
    .addField(`${BotSettings.prefix}about`, `Infos über den Bot`)
    .addField(`${BotSettings.prefix}kick`,`Kickt einen Nutzer`)
    .addField(`${BotSettings.prefix}ban`,`Bannt einen Nutzer`)
    .addField(`${BotSettings.prefix}say`,`Wiederholt deine Nachricht`)

    message.channel.send(Helpembed)
}

//About
if(message.content == `${BotSettings.prefix}about`) { 
   var Aboutembed = new Discord.RichEmbed()

   .setColor("#1ABC9C")
   .setTitle(`Infos über ${bot.user.username}`)
   .setDescription(`[Discord Server](https://discord.gg/V34PPMC) / [Einladungslink](https://discordapp.com/api/oauth2/authorize?client_id=528644946983518209&permissions=8&scope=bot)`)
   .setThumbnail(bot.user.avatarURL)
   .addField(`Name + Tag`,`${bot.user.username}#${bot.user.discriminator}`)
   .addField(`Entwickler`,`${bot.users.get(BotSettings.OwnerID).tag}`)
   .addField(`Erstellungsdatum`,`${moment(bot.user.createdAt).format("DD.MM.YYYY")}`)
   message.channel.send(Aboutembed)
}

//Say
if(message.content.startsWith(`${BotSettings.prefix}say`)){
    if(message.author.id == BotSettings.OwnerID) { 
        var Say = args.join(" ") 
        if(Say) {
            message.channel.send(Say) 
        } else { 
            message.channel.send(`Was soll ich bitte sagen? ${message.author}`)
        }
    } else { 
        message.channel.send(`Nur der Bot-Owner kann das. ${message.author}`)
    }
    message.delete();
}


//Kick
if(message.content.startsWith(`${BotSettings.prefix}kick`)) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
        var member = message.mentions.members.first()

        if(!member)

        return message.reply(`Dieses User existiert nicht!`)

        if(!message.guild.me.hasPermission("KICK_MEMBERS"))

        return message.reply(`Ich habe keine Berechtigungen dazu!`)

        var grund = args.slice(1).join(" ")

        if(!grund)return message.reply(`Du musst einen Grund angeben!`)

        await member.kick(grund)

        return message.reply(`${member.user.tag} wurde gekickt wegen **${grund}**`)
    } else {
        message.channel.send(`Du hast keine Kick Rechte!`)
    }

}

//Ban
if(message.content.startsWith(`${BotSettings.prefix}ban`)) {
    if(message.member.hasPermission("BAN_MEMBERS")) {
        var member = message.mentions.members.first()

        if(!member)

        return message.reply(`Dieses User existiert nicht!`)

        if(!message.guild.me.hasPermission("BAN_MEMBERS"))

        return message.reply(`Ich habe keine Berechtigungen dazu!`)

        var grund = args.slice(1).join(" ")

        if(!grund)return message.reply(`Du musst einen Grund angeben!`)

        await member.ban(grund)

        return message.reply(`${member.user.tag} wurde gebannt wegen **${grund}**`)
    } else {
        message.channel.send(`Du hast keine Ban Rechte!`)
    }

}

})


bot.login(process.env.BOT_TOKEN)
