const Discord = require("discord.js");
const fs = require("fs");
const coins = require("../playerequipment/coins.json");
const playerclasses = require("../classhandler/playerclasses.json");
const strength = require("../playerstats/strength.json");
const questL = require("../questhandler/questcompleted.json");
const wins = require("../fightlog/wins.json");
const loses = require("../fightlog/loses.json");
const botconfig = require("../botconfig.json");
const purple = botconfig.purple;
const bid = botconfig.bid;

module.exports.run = async (bot, message, args) => {
  
  
  let subreddits = [

        'https://media.giphy.com/media/iWAqMe8hBWKVq/giphy-downsized-large.gif',
        'https://media.tenor.com/images/b561ad7377142adf365fe33f20fa45e8/tenor.gif',
        'https://media.giphy.com/media/LdsJrFnANh6HS/giphy.gif',
        'https://media.giphy.com/media/12dO0uYqeMVOy4/giphy.gif',
        'https://media.giphy.com/media/vtuUxg1qBgG6k/giphy.gif',
        'https://media.giphy.com/media/6CJT5B0JwxCY8/giphy.gif',
        'https://media.giphy.com/media/11HeubLHnQJSAU/giphy.gif',
        'https://media.giphy.com/media/1mpAmSVQNOzxS/giphy.gif',
        'https://media.giphy.com/media/jfSb9mx1EpCiQ/giphy.gif',
        'https://media.giphy.com/media/sRLx1DequmLug/giphy.gif',
        'https://media.giphy.com/media/fseRXWw5ScmxsEOwlM/giphy.gif',
        'https://media.giphy.com/media/jyMyHFzuHYv96/giphy.gif',
        'https://media.giphy.com/media/xUNemWOzznJDZpRDZm/giphy.gif',
        'https://media.giphy.com/media/TpAtVLFuHpOq4/giphy.gif',
        'https://media.giphy.com/media/BpX6RB6YFcx7q/giphy.gif',
        'https://media.giphy.com/media/Zg2mOtKNF7wu4/giphy.gif',
        'https://media.giphy.com/media/1oIMdfZ1GpT77MtjHZ/giphy.gif',






        ]
  
  let sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
  let fMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!fMember) return message.reply("oof").then(msg => {msg.delete(5000)});
  if(fMember.id === message.author.id) return message.reply("Quit hitting yourself, stupid!");
  if(fMember.id === bot.user.id) return message.reply("I put down my sword long ago.");
  if(!questL[message.author.id]){
    questL[message.author.id] = {
      quest: "1"
    };
  }
  if(!wins[message.author.id]){
    wins[message.author.id] = {
      wins: 0
    };
  }
  if(wins[message.author.id].wins >= 10 && questL[message.author.id].quest === "6"){
    questL[message.author.id] = {
      quest: "7"
    };
    fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
      if (err) console.log(err)
    });
  }


  if(fMember.id === bid){
    if(!questL[message.author.id]){
      questL[message.author.id] = {
        quest: "1"
      };
    }
    if(questL[message.author.id].quest == "2"){
      questL[message.author.id] = {
        quest: "3"
      };
      fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
        if (err) console.log(err)
      });

    }
  }

  if(!strength[message.author.id]){
    strength[message.author.id] = {
      level: 1,
      xp: 0
    };
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
  }

  if(!strength[fMember.id]){
    strength[fMember.id] = {
      level: 1,
      xp: 0
    };
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });

  }

  let sLvl = strength[message.author.id].level;
  let fLvl = strength[fMember.id].level;
  let sXp = strength[message.author.id].xp;
  let fXp = strength[fMember.id].xp;
  let nxtSLvl = sLvl * 300;
  let nxtFLvl = fLvl * 300;
  let chance = Math.ceil(Math.random() * 100);
  console.log(chance);
  let difference = (sLvl - fLvl) / 2;
  let calcChance = chance - difference;
  console.log(`Difference is ${difference}`)
  console.log(`new chance ${calcChance}`);


  if(sXp >= nxtSLvl){
    strength[message.author.id].level = sLvl + 1;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
    message.channel.send(`Congrats ${message.author}! You have leveled up to level ${sLvl + 1}`);
  }

  if(fXp >= nxtFLvl){
    strength[fMember.id].level = fLvl + 1;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });
    message.channel.send(`Congrats ${fMember}! You have leveled up to level ${fLvl + 1}`);
  }

  if(calcChance > 40){
    if(!wins[fMember.id]){
      wins[fMember.id] = {
        wins: 0
      };
    }
    wins[fMember.id] = {
      wins: wins[fMember.id].wins + 1
    }

    fs.writeFile("./fightlog/wins.json", JSON.stringify(wins),  (err) => {
      if (err) console.log(err)
    });

    if(!loses[message.author.id]){
      loses[message.author.id] = {
        loses: 0
      };
    }
    loses[message.author.id] = {
      loses: loses[message.author.id].loses + 1
    };

    fs.writeFile("./fightlog/loses.json", JSON.stringify(loses),  (err) => {
      if (err) console.log(err)
    });
    let fightresults = ["One punch to the face and the match is over.", `${message.author}'s foot slipped and ${fMember} took advantage and finished the fight`, `${fMember} such swordsmanship! Bravo! Bravo! ${message.author} couldn't even move`, `Wha... What just happened? ${fMember} was way too fast and ${message.author} is lying on the ground bleeding...`, `Pussy ${fMember} brought a gun to the fight and won. Well, I guess a win is win, Congrats pussy!`, `${message.member} got scared and ran away`, `During the brawl ${fMember} broke ${message.author}'s neck`, "A surprising uppercut and it's over!", `It was a massacre, it was a total bloodshed... I just couldn't watch more, poor ${message.author}`];

    let fresult = Math.floor((Math.random() * fightresults.length));


    let fightembed = new Discord.RichEmbed()
    .setTitle("✊ FIGHT!")
    .setColor(purple)
    .setThumbnail(fMember.user.displayAvatarURL)
    .addField("Winner", fMember)
    .addField("Loser", message.author)
    //.addField("How it went", fightresults [fresult])
    //.addField("Level", fLvl)
    .setImage(sub)
    .addField("XP", fXp);

    strength[fMember.id].xp = fXp + chance;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
      if (err) console.log(err)
    });

    message.delete();
    return message.channel.send(fightembed);

  }else if(calcChance <= 40){
    if(!questL[message.author.id]){
      questL[message.author.id] = {
        quest: "1"
      };
    }
    if(questL[message.author.id].quest == "4"){
      questL[message.author.id] = {
        quest: "5"
      };
      fs.writeFile("./questhandler/questcompleted.json", JSON.stringify(questL),  (err) => {
        if (err) console.log(err)
      });

    }

    if(!wins[message.author.id]){
      wins[message.author.id] = {
        wins: 0
      };
    }
    wins[message.author.id] = {
      wins: wins[message.author.id].wins + 1
    }

    fs.writeFile("./fightlog/wins.json", JSON.stringify(wins),  (err) => {
      if (err) console.log(err)
    });

    if(!loses[fMember.id]){
      loses[fMember.id] = {
        loses: 0
      };
    }
    loses[fMember.id] = {
      loses: loses[fMember.id].loses + 1
    };

    fs.writeFile("./fightlog/loses.json", JSON.stringify(loses),  (err) => {
      if (err) console.log(err)
    });

    let fightresults = ["One punch to the face and the match is over.", `${fMember}'s foot slipped and ${message.author} took advantage and finished the fight`, `${message.author} such swordsmanship! Bravo! Bravo! ${fMember} couldn't even move`, `Wha... What just happened? ${message.member}was way too fast and ${fMember} is lying on the ground bleeding...`, `Pussy ${message.author} brought a gun to the fight and won. Well, I guess a win is win, Congrats pussy!`, `${fMember} got scared and ran away`, `During the brawl ${message.author} broke ${fMember}'s neck`, "A surprising uppercut and it's over!", `It was a massacre, it was a total bloodshed... I just couldn't watch more, poor ${fMember}`];

    let fresult = Math.floor((Math.random() * fightresults.length));



    let fightembed = new Discord.RichEmbed()
    .setTitle("✊ FIGHT!")
    .setColor(purple)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Winner", message.author)
    .addField("Loser", fMember)
    //.addField("Level", sLvl)
    .addField("XP", sXp)
    .setImage(sub)
    //.addField("How it went", fightresults [fresult]);
    message.delete();


    strength[message.author.id].xp = sXp + chance;
    fs.writeFile("./playerstats/strength.json", JSON.stringify(strength),  (err) => {
    if (err) console.log(err)
  });

    return message.channel.send(fightembed);

  }
}


module.exports.help = {
  name: "fight"
}
