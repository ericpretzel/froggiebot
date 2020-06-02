let fs = require('fs');

const frogfacts = require('fs').readFileSync('frogfacts.txt').toString().split("\n");

module.exports = {
    name: 'fact',
    description: 'Sends a frog fact',
    execute(msg, args) {
        let i = Math.floor(Math.random() * frogfacts.length);
        msg.reply("did you know? " + frogfacts[i]);
    }
}