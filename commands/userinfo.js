const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let memberInfo = message.mentions.members.first() || message.guild.member(args[0]);
  
  

  var userinfo = new Discord.RichEmbed()
  
  .setAuthor(memberInfo.displayName)
  .setThumbnail(memberInfo.user.avatarURL)
  .setDescription("This is the user's info!")
  .setColor("#15f153")
  .addField("Full Username:", `${memberInfo.user.username}#${memberInfo.user.discriminator}`)
  .addField("ID:", memberInfo.id)
  .addField("Created At:", memberInfo.user.createdAt)
  .addField("Joined at:", memberInfo.member.joinedAt);

   message.channel.send(userinfo);
};



module.exports.help = {
  name: "userinfo"
}
