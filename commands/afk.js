const Discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const { remove, insertOrReplace } = require('../databaseHandler.js');

module.exports.run = async (bot, message, args) => {
	if (!args.length) { // just !afk
		remove(message.author.id, bot.database).then(entry => {
			if (entry.stmt.changes) {	// If in the database
				return message.channel.send(new RichEmbed()
					.setColor('GREEN')
					.setTitle('Removed your AFK message')
				);
			} else {	// if not in the database, set default afk message
				insertOrReplace(message.author.id, bot.database, `AFK`).then(stmt => {
					return message.channel.send(new RichEmbed()
						.setColor('GREEN')
						.setTitle('Set you a default AFK message')
					);
				}).catch(error => {
					console.error(error);
					return sendError(message.channel, 'An error occured. Please try again later.');
				});
			}
		});
	} else {
		const afkMessage = args.join(' ');
		insertOrReplace(message.author.id, bot.database, afkMessage).then(stmt => {
			return message.channel.send(new RichEmbed()
				.setColor('GREEN')
				.addField('Set your AFK message', afkMessage)
			);
		})
	}
};

function sendError(channel, message) {
	return channel.send(new RichEmbed()
		.setColor('RED')
		.setTitle(message)
	);
};

module.exports.help = {
  name: "absfk"
};
