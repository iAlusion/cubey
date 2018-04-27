const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'administration',
            memberName: 'leave',
            description: 'Bot leaves your guilds.',
            examples: ['leave'],
            guarded: true
        });    
    }

    hasPermission(msg) {
        return msg.member.hasPermission('ADMINISTRATOR')
    }

    run(msg) {
        msg.guild.leave();
    }
};