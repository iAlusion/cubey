const { Command } = require('discord.js-commando');

module.exports = class UpdatestatusCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'updatebot',
            aliases: ['freshup'],
            group: 'owner',
            memberName: 'updatebot',
            description: 'Status update of the bot, which can only be modified by the bot owner.',
            examples: ['updatebot'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like my status to be?',
                    type: 'string'
                }
            ]
        });    
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    run(msg, args) {
        const { text } = args;
        this.client.user.setPresence(data, {
        status: "online",
        afk: false,
        game: { name: `${args.text}`, type: 0}
        }); 
        this.client.guilds.get('338676396597444610').channels.get('348142781576904716').send(`Updated my status to: **` + text + `**`);
    }
};