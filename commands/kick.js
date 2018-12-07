const Discord = require("discord.js");
// const errors = require("../utils/errors.js");
const getResponse = require('./getResponse');

module.exports.run = async (bot, message, args) => {

  let mentionedMember = message.mentions.members.first() || message.guild.member(args[0]);
  if(!mentionedMember || mentionedMember == null) return message.channel.send("Please mention a user or provide their user id!");
  let kickReason = args.slice(1).join(" ") != '' ? args.slice(1).join(" ") : 'No reason provided';
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Aww sorry but you are not cool enough to do this");
  if(mentionedMember.hasPermission("MANAGE_MESSAGES") || !mentionedMember.kickable) return message.channel.send("That person can't be kicked bro!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~Kick~")
  .setColor("#e56b00")
  .addField("Kicked User", `${mentionedMember} with ID ${mentionedMember.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Reason", kickReason);

  let responseMsg = `\:exclamation: | You are kicking **${mentionedMember.user.tag}** from **${message.guild.name}**\n\`\`\`Kick Reason:\n\n${kickReason}\`\`\`\n \:arrow_right: Please type \`confirm\` or type \`cancel\` `;
  
  let sentMessage = await message.channel.send(responseMsg);

  let userResponse = await getResponse(message.channel, message.author, ['confirm', 'cancel'], `\:no: | That is an invalid response. Please try again.`).catch(console.log);
  console.log(userResponse);
  sentMessage.delete();
  if (!userResponse) return;
  if (userResponse == 'cancel') {
      message.channel.send(`\:information_source: | **${mentionedMember.user.tag}** was not kicked!`)
  } else {
      mentionedMember.kick(kickReason).then( () => {
        message.channel.send(kickEmbed);
        
        message.channel.send(`\:exlamation: | User **${mentionedMember.user.tag}** was successfully kicked from ${message.guild.name}`);

        mentionedMember.user.send(`\:exclamation: | Kick Reason: \n\n\`\`\`Kick Reason:\n\n${kickReason}\`\`\`\n\n*This message is an automated notification*`).catch(e =>{
          message.channel.send(`\:exclamation: | Failed to dm user when kicking!`);
        })
      }).catch(e => {
          message.channel.send(`**Warning** | Failed to kick **${mentionedMember.user.tag}**`)
          throw new Error(e);
      })
  }
}

exports.help = {
  name:"kick"
}
