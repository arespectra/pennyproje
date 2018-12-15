const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //if(command === "remindme") {
    let reminderTime = args[0];

      if(!reminderTime) return message.channel.send(`**Specify a time for me to remind you. Usage: \`>remind 15min | Code**\``);

      let reminder = args.slice(1).join(" ");

      let remindEmbed = new Discord.RichEmbed()

      .setColor("#15f153")

      .addField("Reminder", `${reminder}`)

      .addField("Time", `\`${reminderTime}\``)

      message.channel.send(remindEmbed);

      setTimeout(function(){

        return message.channel.send(`Hey! You wanted me to remind you: ${reminder}`)

      }, ms(reminderTime));
  //}


};



module.exports.help = {
  name: "remindme"
}
