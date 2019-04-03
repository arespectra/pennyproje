const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


//if(!args[2]) return message.reply("Please ask a full question!");
let replies = ["HEADS <:PennyHeads:555594128348413954>", "TAILS <:PennyTails:555594128566648832>"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

let ballembed = new Discord.RichEmbed()
.setAuthor(message.author.tag)
.setColor("RANDOM")
.addField("Result", replies [result]);

message.channel.send(ballembed);


}

module.exports.help = {
  name:"coinflip"
}
