const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {

let memberInfo = message.mentions.members.first() || message.guild.member(args[0]);


  var member = message.guild.member(memberInfo);

  var userinfo = new Discord.RichEmbed()

  .setAuthor(memberInfo.displayName)
  .setThumbnail(memberInfo.user.avatarURL)
  .setDescription("This is the user's info!")
  .setColor("#15f153")
  .addField("Full Username:", `${memberInfo.user.username}#${memberInfo.user.discriminator}`)
  .addField("Bot:", `${memberInfo.user.bot}`, true)
  .addField("Status:", `${memberInfo.presence.status}`, true)
  .addField("ID:", memberInfo.id)
  .addField("Created At:",  `${moment.utc(memberInfo.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
  .addField("Joined at:", `${moment.utc(memberInfo.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
  .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true);

   message.channel.send(userinfo);
};



module.exports.help = {
  name: "userinfo"
}
