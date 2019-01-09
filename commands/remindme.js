const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    const NO_TIME_SPECIFIED = `**Specify a time for me to remind you! Usage: \`>remind 15min | Code**\``
    const NO_OPERABLE_TIME = `Sorry! You have to specify the time before the text!`;
    
    const fullReminder = args
          .join(" ")
          .split("|")
          .map(stringFragment => stringFragment.trim());
    
    const reminderTime = fullReminder[0];
    const convertedReminderTime = ms(reminderTime);
    
    if (!reminderTime.length) return message.channel.send(NO_TIME_SPECIFIED);
    if (!/\d+/.test || !convertedReminderTime) return message.channel.send(NO_OPERABLE_TIME);
    
    const reminderText = fullReminder[1];
    let remindEmbed = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Reminder", `${reminderText}`)
        .addField("Time", `\`${reminderTime}\``);

    message.channel.send(remindEmbed);

    setTimeout(_ => {
        return message.channel.send(`Hey! You wanted me to remind you: ${reminderText}`)
    }, convertedReminderTime);
};

module.exports.help = {
    name: "remindme"
}
