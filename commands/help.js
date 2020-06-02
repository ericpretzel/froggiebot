module.exports = {
    name: 'help',
    description: 'help',
    execute(msg, args) {
        msg.channel.send(`type "f!froggie" to receive a random froggie!`);
    }
}