const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {


    let subreddits = [

        'https://gph.is/2ATApkD'
        'https://gph.is/2QbWaqG'
        'https://gph.is/2BRuZbL'
        'https://gph.is/2BQ3HTe'
        'https://gph.is/2SsqRUS'
        'https://gph.is/2Su32fA'
        'https://gph.is/2BQthHy'
        'https://gph.is/2SqTdz5'
        'https://gph.is/2QbAb2N'
        'https://gph.is/2BQp6eP'
        'https://gph.is/2BQnsdb',




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
