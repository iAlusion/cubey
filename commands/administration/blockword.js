const { Command } = require('discord.js-commando');

module.exports = class BlockWordCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'block-word',
			aliases: ['bword'],
			group: 'administration',
			memberName: 'block-word',
			description: 'Prohibits a user from using certain words in their message.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'word',
					prompt: 'Which word would you like to block?\n',
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
		if (badlist.includes(word)) return msg.reply('that word is already blocked.');

		badlist.push(word);
		this.client.provider.set(msg.guild.id, 'BlockedWords', badlist);

		return msg.reply(`${word} has been blocked.`);
	}
};
