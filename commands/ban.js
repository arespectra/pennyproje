const Discord = require("discord.js");
// const errors = require("../utils/errors.js");
const getResponse = require('./getResponse');

module.exports.run = async (bot, message, args) => {

  if(args[0] == "help"){
    message.reply("Usage: p>ban <user> <reason>");
    return;
  }

  let mentionedMember = message.mentions.members.first() || message.guild.member(args[0]);
  if(!mentionedMember || mentionedMember == null) return message.channel.send("Please mention a user or provide their user id!");
  let banReason = args.slice(1).join(" ") != '' ? args.slice(1).join(" ") : 'No reason provided';
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Aww sorry but you are not cool enough to do this");
  if(mentionedMember.hasPermission("MANAGE_MESSAGES") || !mentionedMember.bannable) return message.channel.send("That person can't be banned bro!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~Ban~")
  .setColor("#bc0000")
  .addField("Banned User", `${mentionedMember} with ID ${mentionedMember.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", banReason);

  let responseMsg = `\:exclamation: | You are banning **${mentionedMember.user.tag}** from **${message.guild.name}**\n\`\`\`Ban Reason:\n\n${banReason}\`\`\`\n \:arrow_right: Please type \`confirm\` or type \`cancel\` `;

  let sentMessage = await message.channel.send(responseMsg);

  let userResponse = await getResponse(message.channel, message.author, ['confirm', 'cancel'], `\:no: | That is an invalid response. Please try again.`).catch(console.log);
  console.log(userResponse);
  sentMessage.delete();
  if (!userResponse | userResponse == 'cancel') {
      message.channel.send(`\:information_source: | **${mentionedMember.user.tag}** was not banned!`)
  } else {
      mentionedMember.ban(banReason).then( () => {
        message.channel.send(banEmbed);
      }).catch(e => {
          message.channel.send(`**Warning** | Failed to ban **${mentionedMember.user.tag}**`)
          throw new Error(e);
      })
  }
}

exports.help = {
  name:"ban"
}
