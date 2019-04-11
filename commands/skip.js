exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if (!fetched) return message.channel.send('There isn\'t any music playing');

  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('You aren\'t connected to the bot\'s voice channel!');

  let userCount = message.member.voiceChannel.members.size;

  let required = Math.ceil(userCount/2);

  if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

  if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`You already voted. ${fetched.queue[0].voteSkips.length}/${required} voted for skipping`);

  fetched.queue[0].voteSkips.push(message.member.id);

  ops.active.set(message.guild.id, fetched);

  if (fetched.queue[0].voteSkips.length >= required) {
    message.channel.send('Music Skipped!');
    return fetched.dispatcher.emit('end');
  }

  message.channel.send(`You voted for skipping.${fetched.queue[0].voteSkips.length}/${required} voted for skipping `)

}
module.exports.help = {
  name:"skip"
}
