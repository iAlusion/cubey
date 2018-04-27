const { Command } = require('discord.js-commando');

module.exports = class DiscServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord',
            group: 'general',
            memberName: 'discord',
            description: 'Replies with an invite link for the bot discord server.',
            examples: ['invite'],
            guarded: true
        });
    }

    run(msg) {
        return msg.channel.send('https://discord.gg/qgZYX7');
    }
};