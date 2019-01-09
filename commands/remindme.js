const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    const INVALID_SYNTAX = `**Specify a time for me to remind you! Usage: \`>remind 15min | Code**\``
    const NO_USER_PROVIDED = `Sorry! That user isn't part of the server anymore!`;
    const NO_OPERABLE_TIME = `Sorry! You have to specify the time before the text!`;
    const DEFAULT_REMINDER_TEXT = `Here's your reminder!`;
    
    const fullReminder = args
          .join(" ")
          .split("|")
          .map(stringFragment => stringFragment.trim());

    const memberToPing = message.author;
    if (!memberToPing) return message.channel.send(NO_USER_PROVIDED);
    if (fullReminder[0].length === 0) return message.channel.send(INVALID_SYNTAX);
    
    const reminderTime = fullReminder[0];
    const reminderText = fullReminder[1] || DEFAULT_REMINDER_TEXT;
    const convertedReminderTime = ms(reminderTime);
    
    if (!/\d+/.test(reminderTime) || !convertedReminderTime) return message.channel.send(NO_OPERABLE_TIME);
    
    let remindEmbed = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Reminder", `${reminderText}`)
        .addField("Time", `\`${reminderTime}\``);

    message.channel.send(remindEmbed);

    setTimeout(_ => {
        return message.channel.send(`<@${memberToPing.id}> Hey! You wanted me to remind you: ${reminderText}`)
    }, convertedReminderTime);
};

module.exports.help = {
    name: "remindme"
}
