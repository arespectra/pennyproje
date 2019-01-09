const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    const INVALID_SYNTAX = `**Specify a time for me to remind you! Usage: \`>remindme 15min | Code**\``
    const NO_USER_PROVIDED = `Sorry! That user isn't part of the server anymore!`;
    const NO_OPERABLE_TIME = `Sorry! You have to specify the time before the text!`;
    const DEFAULT_REMINDER_TEXT = `Here's your reminder!`;
    
    const fullReminder = args
          .join(" ")
          .split("|")
          .map(stringFragment => {
              let _stringFragment = stringFragment.replace('<','');
              const foundMention = _stringFragment.indexOf("@");
              if (foundMention > -1) _stringFragment = _stringFragment.substring(0, foundMention);
              return _stringFragment.trim();
          });

    const reminderCreator = [message.author.id];
    if (!reminderCreator[0]) return message.channel.send(NO_USER_PROVIDED);
    if (!fullReminder[0].length) return message.channel.send(INVALID_SYNTAX);
    
    const reminderTime = fullReminder[0];
    const reminderText = fullReminder[1] || DEFAULT_REMINDER_TEXT;
    const convertedReminderTime = ms(reminderTime);

    console.log(fullReminder);
    
    if (!/\d+/.test(reminderTime) || !convertedReminderTime) return message.channel.send(NO_OPERABLE_TIME);
    
    let remindEmbed = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Reminder", `${reminderText}`)
        .addField("Time", `\`${reminderTime}\``);

    const memberIdsToPing = reminderCreator.concat(message.mentions.members.map(member => member.id));
    message.channel.send(remindEmbed);

    const buildMessage = reminderText => {
        const baseMessage = ` Hey! You wanted me to remind you`;
        const messageBookend = reminderText.length ? `: ${reminderText}` : `!`;
        const membersToPing = memberIdsToPing.map(memberId => `<@${memberId}>`).join(' ');
        return `${membersToPing} ${baseMessage}${messageBookend}`;
    };
    

    setTimeout(_ => {
        return message.channel.send(buildMessage(reminderText));
    }, convertedReminderTime);
};

module.exports.help = {
    name: "remindme"
}
