const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let user = message.mentions.members.first() || message.guild.member(args[0]);

  var userinfo = new Discord.RichEmbed()
                .setAuthor(user.displayName)
                .setThumbnail(user.avatarURL)
                .setDescription("This is the user's info!")
                .setColor("#bc0000")
                .addField("Full Username:", `${user.username}#${user.discriminator}`)
                .addField("ID:", user.id)
                .addField("Created At:", user.createdAt)

                message.channel.send(userinfo);
          };



module.exports.help = {
  name: "userinfo"
}
