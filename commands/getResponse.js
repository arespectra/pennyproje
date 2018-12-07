module.exports = async function getResponse (channel, user, validResponses, incorrectResponseMessage) {
    let newPromise = new Promise (async function (resolve, reject) {
        let repeat = () => {
            message.channel.send(incorrectResponseMessage);
            return getResponse(channel, user, validResponses, incorrectResponseMessage);
        }
        channel.awaitMessages(received => received.author.id == user.id, {
            max: 1,
            errors: ['time'],
            time: 30000
        }).then(received=>{
            let message = received.first();
            if (!message) return repeat(channel, user, validResponses, incorrectResponseMessage);
            let isValidResponse = validResponses.some((val, ind) => message.content.toLowerCase().includes(val.toLowerCase()));
            if (isValidResponse == false) return repeat(channel, user, validResponses, incorrectResponseMessage);
            resolve(message.content.toLowerCase());
        }).catch(e=>{
            channel.send(`\:no: | **${user.username}**, the command menu has closed due to inactivity.`);
            reject();
        });
    })
    return newPromise;
}