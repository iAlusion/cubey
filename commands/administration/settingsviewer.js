const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class GuildSetViewCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setview',
			aliases: ['guildset'],
			group: 'administration',
			memberName: 'setview',
			description: 'Get info on the guild settings.',
            details: `Get detailed information on the guild settings.`,
            guarded: true,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
    }
        hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR')
    }

	run(msg) {
		return msg.embed({
			color: 3447003,
			description: `${msg.guild.name}`,
			fields: [
				{
					name: 'Settings:',
					value: stripIndents`
						• Welcome channel: ${this.client.provider.get(msg.guild.id, 'welcomeChannel', '')}
						• Welcome text: ${this.client.provider.get(msg.guild.id, 'welcomeMessage', '')}
						* Leave message: ${this.client.provider.get(msg.guild.id, 'leaveMessage', '')}
                        • Join role: ${this.client.provider.get(msg.guild.id, 'joinRole', '')} 
                        * Log channel: ${this.client.provider.get(msg.guild.id, 'modLog', '')}
						* Logging? ${this.client.provider.get(msg.guild.id, 'logSet', [])}
						* Ever Joined? ${this.client.provider.get(msg.guild.id, 'everJoined', '')}
						* Ever joined log: ${this.client.provider.get(msg.guild.id, 'everJoinedLog', [])}
						* Disabled channels Cubey: ${this.client.provider.get(msg.guild.id, 'NoCubey', [])}
						* Bot free channels: ${this.client.provider.get(msg.guild.id, 'BotFreeChannels', [])}
						* Bot IDs: ${this.client.provider.get(msg.guild.id, 'BotIDs', [])}
                        * Prefix: ${this.client.provider.get(msg.guild.id, 'prefix', [])}
					`,
					inline: true
				}
			],
			thumbnail: { url: msg.guild.iconURL }
		});
	}
};