const { Command } = require('discord.js-commando');

module.exports = class botCleanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clearbot',
			group: 'moderation',
			memberName: 'clearbot',
			description: 'Deletes Cubeys messages.',
			guildOnly: true,
			args: [
				{
					key: 'limit',
					prompt: 'how many messages would you like to delete?\n',
					type: 'integer',
					max: 100
				}
			]
		});
	}

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR') ? true : msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))
    }

	async run(msg, { limit }) {
		const messageDelete = await msg.channel.fetchMessages({ limit: 100}).catch(err => null)
		const deleteThese = messageDelete.filter(m => m.author.id === this.client.user.id)
		msg.channel.bulkDelete(deleteThese.first(limit))
	}
};