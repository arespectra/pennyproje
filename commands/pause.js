exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
if (!fetched) return message.channel.send('There isn\'t any song playing at the moment!');
if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('You aren\'t connected to the bot\'s voice channel');
if (fetched.dispatcher.paused) return message.channel.send('The music is already paused!');
fetched.dispatcher.pause();
message.channel.send('Music Paused!');

}


module.exports.help = {
  name:"pause"
}
