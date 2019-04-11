const Discord = require("discord.js");
const fs = require("fs");
const botconfig = require('./botconfig.json');
const bot = new Discord.Client({disableEveryone: true});
const path = require('path');
const sqlite = require('sqlite');
const jimp = require('jimp');
const token = process.env.token;
bot.commands = new Discord.Collection();
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;
const chratis_cooldown_time = 5;
const money = require('discord-money');
const moment = require('moment');
const emoji = bot.emojis.get("559427989713190922");
var spawning = "no";
var cheerio = require("cheerio");
var request = require("request");
const yt = require("ytdl-core");
const ffmpeg = require("ffmpeg");
const search = require("yt-search")
var skipping = 0;
var skips = 3;
var opusscript = require("opusscript");
const active = new Map();

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => {
	db.migrate().then(db => bot.database = db);
});

fs.readdir("./commands/", (err, files) =>  {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.lenght <= 0){
    console.log("Couldn't find commands.")
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
		if (props.help && props.help.name) {
			bot.commands.set(props.help.name, props);
		}
  });
});

bot.on('guildMemberAdd', async member => {
  let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
  let font64 = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
  let mask = await jimp.read('https://cdn.discordapp.com/attachments/464568657109057539/559768060035334170/Mask.png');
  let welcome = await jimp.read('https://cdn.discordapp.com/attachments/559770699254857758/559779319505747970/w2.png');

  jimp.read(member.user.displayAvatarURL).then(avatar => {
    avatar.resize(318, 317);
    mask.resize(318, 317);
    avatar.mask(mask);

  welcome.print(font64, 378, 165, member.user.username);
  welcome.composite(avatar, 43, 38).write('Welcome2.png');
  member.guild.channels.get('392772985192185857').send(`**Salutations** ${member} ** <a:intslPennyWaving:554045967511584778> ! Welcome to I'll name this server later. Make sure to read the** <#417055055355576330> **and give us an** <#451991249193533441> **!
You can also get** <#470308628725760000> **and before you ask any questions, check out** <#550374373060509700> ** ! **`, { files: ["Welcome2.png"] });
  console.log('Image sent!');
  })
  .catch(err => {
  console.log('error sending the avatar');
})
});
//bot.on("guildMemberRemove", async member => {

  //console.log(`${member.id} left the server.`);

  //let welcomechannel = member.guild.channels.find(`name`, "smalltalk");
  //welcomechannel.send(`BEGONE THOT!`);
//});
//${member} has left the server!

//bot.on("roleUpdate", async (oldRole, newRole)=> {

  //let logchannel = newRole.guild.channels.find(`name`, "log");
  //logchannel.send(`The role ${oldRole.name} has been changed to ${newRole}`);


//});

//bot.on("roleDelete", async role => {
  //let logchannel = message.guild.channels.find(`name`, "smalltalk");
  //logchannel.send(`The role ${role.name} has been deleted.`);
//});




//bot.on("channelCreate", async channel => {

  //console.log(`${channel.name} has been created.`);

  //let sChannel = channel.guild.channels.find(`name`, "smalltalk");
  //sChannel.send(`${channel} has been created`);

//});

//bot.on("channelDelete", async channel => {

  //console.log(`${channel.name} has been deleted.`);

  //let sChannel = channel.guild.channels.find(`name`, "smalltalk");
  //sChannel.send(`${channel.name} has been deleted`);
//});

bot.on("ready", () => {
  console.log(`Penny has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  bot.user.setActivity("I'll name this server later", {type: "WATCHING"});
});

bot.on("message", require('./afkListener.js'));

bot.on("message", async message => {

  var parts = message.content.split(" ");
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}
  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  //if(cooldown.has(message.author.id)){
    //message.delete();
    //let cdembed = new Discord.RichEmbed()
    //.setAuthor(message.author.username)
    //.setColor(botconfig.red)
    //.addField("❌Error", "You need to wait 5 secs between commands.");
    //return message.channel.send(cdembed).then(message => {message.delete(3000)});1
  //}
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  try {
  let ops = {
      active: active
  }
    if(commandfile) commandfile.run(bot,message,args,ops);
}catch (e) {
  console.log(e.stack);

  }

  setTimeout(() => {
    cooldown.delete(message.author.id);
}, chratis_cooldown_time * 1000);

if(message.author.bot) return;
if(message.channel.type === "dm") return;

let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} ; ${baseAmt}`);





//let prefix = prefixes[message.guild.id].prefixes;

//let commandfile = bot.commands.get(cmd.slice(prefix.length));
//if(commandfile && cmd.startsWith(prefix)) commandfile.run(bot,message,args);

if(message.author.bot) return;

var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];

if (command === "active") {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");
    const spawningLien = setInterval(() => {

                spawnLIen();
                message.channel.send({embed: {
                    color: 3447003,
                    description: 'Some Lien have been randomly spawned! ' + "\n" + 'Amount: ' + "400"+ "\n" + "Use \`>grab`\ to grab them!",
                    author: {
                        name: `Lien Spawn!`,
                        icon_url: bot.avatarURL
                    }
                }});
            }, 1000 * 60 * 60);
}

if (command === 'test') {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");
    const liens = bot.emojis.find(emoji => emoji.name === "Lien");
    message.reply("bot's working!" + ` ${liens}`)
}

if (command === 'balance') {
    const liens = bot.emojis.find(emoji => emoji.name === "Lien");
    money.fetchBal(message.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.
    message.reply("**Your balance:** "  + `${i.money}` + `${liens}`);
})
}
if (command === 'addmoney') {
    var user = message.mentions.users.first() || message.author
    var payMoney = args[0]
    if (!args[0]) {
        return message.reply("Please, specify the amount of money!")
    }
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");

    const liens = bot.emojis.find(emoji => emoji.name === "Lien");
    money.updateBal(user.id, args[0] ).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
    message.channel.send(user + " **You got ** " +payMoney+ " Lien from an Admin!" + "\n" + "**New Balance:** " + `${i.money}` + `${liens}`);

})
}

if (command === 'pay') {
    var user = message.mentions.users.first()
    var payMoney = args[0]
    if (!args[0]) {
        return message.reply("Please, specify the amount of money!")
    }
    if (!message.mentions.users.first()){
        return message.reply("Please, specify a user!")
    }
    const liens = bot.emojis.find(emoji => emoji.name === "Lien");

    money.updateBal(message.author.id, -0).then((i) => {
        if (i.money < args[0]) {
            message.reply("You do not have that amount of money!")
        } else{
            money.updateBal(message.author.id, -args[0])
            money.updateBal(user.id, args[0] ).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
            message.channel.send(user + " **You got ** " +payMoney+ " Lien" + "\n" + "**From** " + message.author.tag+ "\n" + "**New Balance:**" + `${i.money}` + `${liens}` );
        })
        }
    })

}

if (command === 'clearbalance') {
    var user = message.mentions.users.first() || message.author
    var payMoney = args[0]
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");

    const liens = bot.emojis.find(emoji => emoji.name === "Lien");
    money.updateBal(user.id, -0 ).then((i) => {
        money.updateBal(user.id, -`${i.money}`) // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
    message.channel.send(user + " **Your Balance has been cleared by an admin!**" + "\n" + "**New Balance:**" + `0` + `${liens}`);

})
}

if (command === 'spawn') {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Sorry, you can't do it, you are not an admin!");
    message.delete();
    spawning = "yes";
     message.channel.send({embed: {
        color: 3447003,
        description: 'Some Lien have been spawned by an admin! ' + "\n" + 'Amount: ' + "400"+ "\n" + "Use \`>grab`\ to grab them!",
        author: {
            name: `${message.author.username}#${message.author.discriminator}`,
            icon_url: message.author.avatarURL
        }
    }});
}


if (command === 'grab') {
    if (spawning === 'no') return message.reply("Sorry, money have not spawned yet!");

    money.updateBal(message.author.id, 400)
    message.reply("Congratulations! You grabbed the money!")
    spawning = "no";

    }






 if (command === 'daily') {
    message.delete();
    if (money[message.author.username + message.guild.name] != moment().format('L')) {
        money[message.author.username + message.guild.name] = moment().format('L')
        money.updateBal(message.author.id, 200).then((i) => { // The daily ends of the day, so everyday they can get a daily bonus, if they missed it, they can't get it back again.
            message.channel.send({embed: {
                color: 3447003,
                description: 'Recieved your **200 Lien** \`>daily`\. I think you should check \`>balance\`.',
                author: {
                    name: `${message.author.username}#${message.author.discriminator}`,
                    icon_url: message.author.avatarURL
                }
            }});
        })
    } else {
        message.channel.send({embed: {
            color: 3447003,
            description: 'You already recieved your \`>daily`\. Check later **' + moment().endOf('day').fromNow() + '**.', // When you got your daily already, this message will show up.
            author: {
                name: `${message.author.username}#${message.author.discriminator}`,
                icon_url: message.author.avatarURL
            }
        }});
    }
}
});








//});



bot.login(token).catch(err => console.log(err));
