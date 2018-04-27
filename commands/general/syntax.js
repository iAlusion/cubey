const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'js',
            group: 'general',
            memberName: 'js',
            description: 'Replies with the text you provide in JS syntax..',
            examples: ['if (you == him) : true { msg.send("you must be weird")} false; return'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to be highlighted?',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, args) {
            if (!msg.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) 
                return msg.say('Error! I don\'t have permission to Send Messages!');
        const { text } = args;
        return msg.channel.send(text, { code: 'js' });
    }
};


