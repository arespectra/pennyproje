const { getMessage, getAllIDs, remove } = require('./databaseHandler.js');
const moment = require('moment');

module.exports = async message => {
	if (!message.guild) {
		return;
	} else {
		const query = await remove(message.author.id, message.client.database);
		if (query.stmt.changes) {
			return message.channel.send(`${message.author.toString()} removed your AFK message.`);
    }
		message.mentions.users
			.array()
			.forEach(m => {
				console.log(m.username);
				getMessage(m.id, message.client.database)
					.then(entry => {
						if (entry) {
							message.channel.send(`${message.author.toString()} ${m.tag} is AFK: ${entry.message}\n-- ${moment(entry.datetime_text).fromNow()}`);
						}
					});
			});
	}
};
