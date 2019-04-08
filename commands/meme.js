const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports.run = async (bot, message, args) => {

//if(command === "meme") {
    randomPuppy('wholesomememes')
    .then(url => {
        let embed = new Discord.RichEmbed()
        .setImage(url)
        .setColor("#15f153")
     return message.channel.send({ embed });
})
};
  //}
module.exports.help = {
  name: "meme"
 }
