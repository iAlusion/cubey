const { Command } = require('discord.js-commando');

module.exports = class SendlogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'logfiles',
            group: 'owner',
            memberName: 'logfiles',
            description: 'Sends log files',
            examples: ['logfiles'],
            guarded: true,
            guildOnly: false
        });
    }

    hasPermission(msg) {
         return this.client.isOwner(msg.author)
        }

    run(msg) {
        msg.channel.send({files: ["../.pm2/logs/cubey-error-0.log"]})
				msg.channel.send({files: ["../.pm2/logs/cubey-out-0.log"]})
			return;
    }
}; 