const { Command } = require('discord.js-commando');

module.exports = class SupportCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'support',
            group: 'general',
            memberName: 'support',
            description: 'Sends a message to the support channel.',
            examples: ['support'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'content',
                    prompt: 'What do you need assistance with?',
                    type: 'string'
                }
            ]
        });    
    }


    run(msg, args) {
        const { content } = args;
        this.client.guilds.get('338676396597444610').channels.get('340523611725103104').send(`${msg.author} has requested assistance.\n\n__**Message:**__\n${args.content}\n\n__**UserID:**__\n${msg.member.user.id}`);
        msg.channel.send("Message has been succesfully delivered! Support will DM you a reply soon.")
    }
};