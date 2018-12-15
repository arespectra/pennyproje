const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

//if(command === "weebcalc") {
  const weeb = [
    "You're a full on weaboo, you own katanas & bodypillows... Still in your moms basement huh?",
    "You've watched like 1k+ animes & read the same amount of manga as you've watched anime.",
    "You're pretty much a cosplayer at this point, not in a good way.",
    "You're obsessed with anime, you just don't watch it all the time.",
    "You're a normie/weeb mixbreed.",
    "You just started watching anime.",
    "You don't watch anime but you like the art.",
    "You think anime is annoying.",
    "You hate anime with a passion.",
    "BURN THE WEEBS!"
  ];
  let member = message.mentions.members.first();
  var randomweeb = weeb[Math.floor(Math.random()*weeb.length)];
  if(!member) {
  return message.reply(`${randomweeb}`);
  } else {
    return message.channel.send(`${member}, ${randomweeb}`)
  }
};

module.exports.help = {
  name: "weebcalc"
}
