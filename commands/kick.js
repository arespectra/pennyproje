const Discord = require("discord.js");
// const errors = require("../utils/errors.js");
const getResponse = require('./getResponse');

module.exports.run = async (bot, message, args) => {
    if (args[0] === 'help') {
        message.reply('Usage: p>kick <user> <reason>');
        return;
    }

    const NO_USER_PROVIDED = `Please mention a user or provide the user's id!`;
    const NO_REASON_PROVIDED = `No reason provided.`;
    const NO_KICK_PERMISSIONS = `Aww, sorry! You're not cool enough to do that!`;
    const UNKICKABLE_PERSON = `That person cannot be kicked, dude!`
    const INVALID_CONFIRMATION = `\:no: | That is an invalid response. Please try again.`
    const FAILED_DM = `\:exclamation: | Failed to DM user after kicking!`;

    const mentionedMember = message.mentions.members.first() || message.guild.member(args[0]);
    if (!mentionedMember)
        return message.channel.send(NO_USER_PROVIDED);

    let kickReason = args.slice(1).join(" ").trim();
    if (!kickReason.length) kickReason = NO_REASON_PROVIDED;

    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(NO_KICK_PERMISSIONS);
    if (mentionedMember.hasPermission("MANAGE_MESSAGES") || !mentionedMember.kickable)
        return message.channel.send(UNKICKABLE_PERSON);
    
    const kickEmbed = new Discord.RichEmbed()
          .setDescription("~Kick~")
          .setColor("#e56b00")
          .addField("Kicked User", `${mentionedMember} with ID ${mentionedMember.id}`)
          .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
          .addField("Kicked In", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", kickReason);

    let confirmationReceipt = `\:exclamation: | You are kicking **${mentionedMember.user.tag}** from **${message.guild.name}**\n\`\`\`Kick Reason:\n\n${kickReason}\`\`\`\n \:arrow_right: Please type \`confirm\` or type \`cancel\` `;
    let sentMessage = await message.channel.send(confirmationReceipt);
    const userResponse = await getResponse(message.channel, message.author, ['confirm', 'cancel'], INVALID_CONFIRMATION).catch(console.log);
    
    console.log(userResponse);
    sentMessage.delete();

    if (!userResponse || userResponse === 'cancel') {
        message.channel.send(`\:information_source: **${mentionedMember.user.tag}** was not kicked!`)
    } else {
        mentionedMember.user
            .send(`\:exclamation: You were kicked from our server. \n\n\`\`\`Reason:\n\n${kickReason}\`\`\`\n\n*This message is an automated notification.*`)
            .then(_ => {
                mentionedMember
                    .kick(kickReason)
                    .then(_ => {
                        message.channel.send(kickEmbed);
                        message.channel.send(`\:exclamation: User **${mentionedMember.user.tag}** was successfully kicked from ${message.guild.name}!`);
                    }, kickError => {
                        message.channel.send(`\:warning: Failed to kick **${mentionedMember.user.tag}**!`)
                        throw new Error(kickError);
                    })                
            }, dmError => {
                message.channel.send(FAILED_DM);
                throw new Error(dmError);
            });
    }
}

exports.help = {
    name: 'kick'
}
