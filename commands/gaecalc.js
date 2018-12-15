const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
//if(command === "gaycalc") {


const gay = [
  "You're pretty straight.",
  "Eeeeh, you're leaning straight.",
  "Bicurious.",
  "You're bi, you just don't know it yet.",
  "Definitely bisexual.",
  "Leaning a bit more to men.",
  "Halfway out of your closet.",
  "You're almost as gay as me!",
  "You've just told your parents how gay you are, i'm proud of you!",
  "You're a fully fledged homosexual being."
];
let member = message.mentions.members.first();
var randomgay = gay[Math.floor(Math.random()*gay.length)];
if(!member) {
return message.reply(`${randomgay}`);
} else {
  return message.channel.send(`${member}, ${randomgay}`)
}
};

module.exports.help = {
  name: "howgay"
}
