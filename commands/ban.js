const Discord = require("discord.js");
// const errors = require("../utils/errors.js");
const getResponse = require('./getResponse');

module.exports.run = async (bot, message, args) => {
    if (args[0] === 'help') {
        message.reply('Usage: p>ban <user> <reason>');
        return;
    }

    const { mentions, guild, member, channel, author, createdAt } = message;
    
    const NO_USER_PROVIDED = `Please mention a user or provide the user's id!`;
    const NO_REASON_PROVIDED = `No reason provided.`;
    const NO_BAN_PERMISSIONS = `Aww, sorry! You're not cool enough to do that!`;
    const UNBANNABLE_PERSON = `That person cannot be banned, dude!`
    const INVALID_CONFIRMATION = `\:no: | That is an invalid response. Please try again.`
    const FAILED_DM = `\:exclamation: | Failed to DM user after banning!`;

    const mentionedMember = mentions.members.first() || guild.member(args[0]);
    if (!mentionedMember)
        return channel.send(NO_USER_PROVIDED);

    let banReason = args.slice(1).join(" ").trim();
    if (!banReason.length) banReason = NO_REASON_PROVIDED;

    if (!member.hasPermission("BAN_MEMBERS"))
        return channel.send(NO_BAN_PERMISSIONS);
    if (mentionedMember.hasPermission("MANAGE_MESSAGES") || !mentionedMember.bannable)
        return channel.send(UNBANNABLE_PERSON);

    const banEmbed = new Discord.RichEmbed()
          .setDescription("~Ban~")
          .setColor("#bc0000")
          .addField("Banned User", `${mentionedMember} with ID ${mentionedMember.id}`)
          .addField("Banned By", `<@${author.id}> with ID ${author.id}`)
          .addField("Banned In", channel)
          .addField("Time", createdAt)
          .addField("Reason", banReason);

    const confirmationReceipt = `\:exclamation: | You are banning **${mentionedMember.user.tag}** from **${guild.name}**\n\`\`\`Ban Reason:\n\n${banReason}\`\`\`\n \:arrow_right: Please type \`confirm\` or type \`cancel\` `;
    const sentMessage = await channel.send(confirmationReceipt);
    const userResponse = await getResponse(channel, author, ['confirm', 'cancel'], INVALID_CONFIRMATION).catch(console.log);
    
    console.log(userResponse);
    sentMessage.delete();
    
    if (!userResponse || userResponse === 'cancel') {
        channel.send(`\:information_source: **${mentionedMember.user.tag}** was not banned!`)
    } else {
        mentionedMember.user
            .send(`\:exclamation: You were banned from a server. \n\n\`\`\`Reason:\n\n${banReason}\`\`\`\n\n*This message is an automated notification.*`)
            .then(_ => {
                mentionedMember
                    .ban(banReason)
                    .then(_ => {
                        channel.send(banEmbed);
                        channel.send(`\:exclamation: User **${mentionedMember.user.tag}** was successfully banned from ${guild.name}!`);
                    }, banError => {
                        channel.send(`\:warning: Failed to ban **${mentionedMember.user.tag}**!`)
                        throw new Error(banError);
                    });
            }, dmError => {
                channel.send(FAILED_DM);
                throw new Error(dmError);
            });
    }
}

exports.help = {
    name: 'ban'
}
