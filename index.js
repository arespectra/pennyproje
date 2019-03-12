const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const path = require('path');
const sqlite = require('sqlite');
const token = process.env.token;
bot.commands = new Discord.Collection();
let rcoins = require("./playerequipment/coins.json");
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;
const chratis_cooldown_time = 5;


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

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "smalltalk💬");
  welcomechannel.send(`**Salutations** ${member} ** <a:intslPennyWaving:554045967511584778> ! Welcome to I'll name this server later. Make sure to read the** <#417055055355576330> **and give us an** <#451991249193533441> **!
You can also get** <#521378227130859562> **as well as** <#470308628725760000> https://imgur.com/y8fMmu7`);
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

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    let cdembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .addField("❌Error", "You need to wait 5 secs between commands.");
    return message.channel.send(cdembed).then(msg => {msg.delete(3000)});1
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(!rcoins[message.author.id]) coins[message.author.id] = {
    coins: 0
  };

  let chancenum = Math.floor(Math.random()* 15);
  let onnum = Math.floor(Math.random() * 15);
  if(chancenum === onnum){
    let rcoinamount = chancenum + 1;
    rcoins[message.author.id] = {
      rcoins: rcoins[message.author.id].coins + rcoinamount
    };
    let rcoinsembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.purple)
    .addField("💰", `${rcoinamount} pennies added!`);
    message.channel.send(rcoinsembed).then(msg => msg.delete(5000));
    console.log(`${rcoinamount} pennies added to ${message.author.username}`);

    fs.writeFile("./playerequipment/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });

  }

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id);
}, chratis_cooldown_time * 1000);

});

bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }

    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }

    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt){
      coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmt
      };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#0000FF")
    .addField("<:Pennies_HEADS:470660608736624640>", `${coinAmt} coins added!`);

    //message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }


    let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 800;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Level Up!")
    .setColor(purple)
    .addField("New Level", curlvl + 1);


    //message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile && cmd.startsWith(prefix)) commandfile.run(bot,message,args);







});

bot.login(token).catch(err => console.log(err));
