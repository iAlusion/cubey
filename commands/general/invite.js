const { Command } = require('discord.js-commando');

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'general',
            memberName: 'invite',
            description: 'Replies with an invite link for the bot.',
            examples: ['invite'],
            guarded: true
        });
    }

    run(msg) {
        return msg.channel.send('Here is my invite link!\nhttps://discordapp.com/oauth2/authorize?client_id=314042564909072386&scope=bot&permissions=470150350');
    }
};