const { Command } = require('discord.js-commando');

module.exports = class BotsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'botfreesetup',
			aliases: ['nobots'],
			group: 'administration',
			memberName: 'botfreesetup',
			description: 'Prohibits bots from sending anything in a channel by IDs',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'bots',
					prompt: 'Which bot IDs would you like to add?(Format with commas)(To clear the setup settings, please put in "clear")\n',
					type: 'string'
				},
				{
					key: 'channels',
					prompt: 'Which channel "names" would you like to add?(Format with commas)\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR')
    }

	run(msg, { bots, channels }) {
		const botlist = this.client.provider.get(msg.guild.id, 'BotIDs', []);
		if (botlist.includes(bots)) return msg.reply('that bot ID is already registered.');
		if(bots.toLowerCase() == "clear") {
			this.client.provider.clear(msg.guild.id, 'BotIDs')
			this.client.provider.clear(msg.guild.id, 'BotFreeChannels')
			return msg.channel.send("Bot Free setup has been cleared.")
		}
		const channellist = this.client.provider.get(msg.guild.id, 'BotFreeChannels', []);
		if (channellist.includes(channels)) return msg.reply('that channel is already bot-free.');

		botlist.push(bots);
		this.client.provider.set(msg.guild.id, 'BlockedWords', botlist);
		channellist.push(channels);
		this.client.provider.set(msg.guild.id, 'BlockedWords', channellist);

		return msg.reply(`${bots} & ${channels} have been registered.`);
	}
};
