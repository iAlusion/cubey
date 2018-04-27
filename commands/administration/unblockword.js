const { Command } = require('discord.js-commando');

module.exports = class UnblockWordCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unblock-word',
			aliases: ['unbword'],
			group: 'administration',
			memberName: 'unblock-word',
			description: 'Removes a blocked word.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'word',
					prompt: 'Which word would you like to unblock?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR')
    }

	run(msg, { word }) {
		const badlist = this.client.provider.get(msg.guild.id, 'BlockedWords', []);
		if (!badlist.includes(word)) return msg.reply('that word is not blocked.');

		const index = badlist.indexOf(word);
		badlist.splice(index, 1);

		if (badlist.length === 0) this.client.provider.remove(msg.guild.id, 'BlockedWords');
		else this.client.provider.set(msg.guild.id, 'BlockedWords', badlist);

		return msg.reply(`${word} has been unblocked.`);
	}
};
