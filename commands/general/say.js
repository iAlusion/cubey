const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['repeat', 'talk'],
            group: 'general',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, args) {
            if (!msg.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) 
                return msg.say('Error! I don\'t have permission to Send Messages!');
        const { text } = args;
        msg.delete();
        return msg.channel.send(`\u180E${text}`);
    }
};