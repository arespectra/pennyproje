const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {


    let subreddits = [

        'http://mrwgifs.com/wp-content/uploads/2014/09/Arnold-Geralds-Hankshake-In-The-Hey-Arnold-Intro-Theme-Song.gif',
        'https://media1.tenor.com/images/1f281a73477489a8b53ff85c13999714/tenor.gif?itemid=5020990',
        'https://i.pinimg.com/originals/79/7f/34/797f347cc1b437839cd21b44aa6fde96.gif',
        'https://thumbs.gfycat.com/AgitatedIlliterateJaguar-size_restricted.gif',
        'https://media.giphy.com/media/wog0MRE6zrfSypTUxm/giphy.gif',
        'https://i.gifer.com/37wL.gif',




        ]
        let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];



                let user = message.mentions.members.first()
                if(!user){
                    message.reply(`Who do you want to hug?`)
                }
                const embed = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .setDescription(`${message.author} is giving bro love to **${user}**`)
                    .setImage(sub);
                message.channel.send({
                    embed
                });

}

module.exports.help = {
    name: "bro"
}
