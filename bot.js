const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require('fs');
const unirest = require('unirest');

//bot startup
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.login(auth.discord_token);
bot.on('ready', () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.user.tag);

    bot.user.setActivity('🐸 f!froggie', { type: 'WATCHING' });
    unirest.get("https://api.imgur.com/3/album/royw0I6/images")
        .header("Authorization", `Client-ID ${auth.imgur_client_id}`)
        .end(function (result)  {
            /*for (let i = 0; i < result.body.data.length; i++) {
                console.log(result.body.data[i].link);
            }*/
            let data = "";
            for (let i = 0; i < result.body.data.length - 1; i++) {
                data += result.body.data[i].link + "\n";
            }
            data += result.body.data[result.body.data.length - 1].link;
            fs.writeFile("url.txt", data, (err => {
                if (err) throw err;
            }))
        });
});

//bot reads messages
bot.on('message', msg => {
    if (msg.author.id === bot.user.id) return;
    //msg is a command
    if (msg.content.substring(0, 2) === 'f!') {
        var args = msg.content.substring(2).split(' ');
        var cmd = args[0];

        console.log(cmd);

        args = args.splice(1);

        if (!bot.commands.has(cmd)) {
            return msg.reply('invalid command.');
        }

        try {
            bot.commands.get(cmd).execute(msg, args);
        } catch (err) {
            console.error(err);
            return msg.reply('Something went wrong.');
        }
    }
});
