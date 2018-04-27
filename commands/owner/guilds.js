const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class GuildsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'guilds',
            group: 'owner',
            memberName: 'guilds',
            description: 'Shows my current guilds.',
            examples: ['guilds'],
            guarded: false,
            guildOnly: true
        });
    }

    hasPermission(msg) {
         return this.client.isOwner(msg.author)
        }

    async run(msg) {
       let total = [];
			 this.client.guilds.forEach(guild => {
			 	total.push(`[${guild.memberCount}] - ID: ${guild.id}`);
			 	})
				
			let sendMe = await msg.channel.send("```"+total.join('\n')+"```");
    }
};