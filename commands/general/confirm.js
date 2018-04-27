const { Command } = require('discord.js-commando');

module.exports = class ConfirmCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'confirm',
            group: 'general',
            memberName: 'confirm',
            description: 'Will reply with a message to confirm the bot is running.',
            examples: ['confirm']
        });
    }

    run(msg) {
        return msg.channel.send('Hi, I\'m awake!');
    }
};