const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {


    let subreddits = [

        'https://media.giphy.com/media/4WFiAcreAPXNOQ9ddv/giphy.gif',
        'https://media.giphy.com/media/5eG1Uyn2qfwMnIMDCY/giphy.gif',
        'https://media.giphy.com/media/g07k9rfuiY3OsW9Oco/giphy.gif',
        'https://media.giphy.com/media/6GFcTNhf1pmESeudxT/giphy.gif',
        'https://media.giphy.com/media/2w4OaG8qIsEzGhUSPA/giphy.gif',
        'https://media.giphy.com/media/35MCtpI5npAHSLcInn/giphy.gif',
        'https://media.giphy.com/media/1dKQaJ444y8QxTUNaT/giphy.gif',
        'https://media.giphy.com/media/2xE3QyuG7cFVCfxJ0s/giphy.gif',
        'https://media.giphy.com/media/4GWh7VFJnzSB1iFy20/giphy.gif',
        'https://media.giphy.com/media/l2adduTiUaqRn2HpQQ/giphy.gif',
        'https://media.giphy.com/media/1na6Eu9u21hEBYPrFz/giphy.gif',
        'https://media.giphy.com/media/5hd97nKfNNKuBtwaLp/giphy.gif',
        'https://media.giphy.com/media/mX3P97rgjYrv6ySbqW/giphy.gif',




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
