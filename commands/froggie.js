const auth = require('../auth.json');
const fs = require('fs');

const url = fs.readFileSync('url.txt').toString().split("\n");

module.exports = {
    name: 'froggie',
    description: 'Sends a frog image',
    execute(msg, args) {
        let i = Math.floor(Math.random() * url.length);
        msg.reply(url[i]);
    }
}