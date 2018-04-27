const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class GuildCheckerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gcheck',
            group: 'owner',
            memberName: 'gheck',
            description: 'Shows guild info.',
            examples: ['guilds'],
            guarded: false,
            guildOnly: false,
						args: [
				  {
					key: 'gid',
					prompt: 'Which guild?\n',
					type: 'string'
				  }
			  ]
        });
    }

    hasPermission(msg) {
         return this.client.isOwner(msg.author)
        }

    async run(msg, { gid }) {
        let guild = this.client.guilds.get(gid)
				let totalUsers = await guild.fetchMembers().then(guild => guild.members.filter(m => m.user.bot === false).size);
				let totalBots = await guild.fetchMembers().then(guild => guild.members.filter(m => m.user.bot === true).size);
				let totalMems = await guild.fetchMembers().then(guild => guild.members.size);
        return msg.channel.send({embed: {
			color: 12345,
			description: `Info on **${guild.name}**`,
			fields: [
				{
					name: '❯ ID',
					value: stripIndents`
						• ${guild.id}
					`,
					inline: true
				},
				{
					name: '❯ Channels',
					value: stripIndents`
						• ${guild.channels
							.filter(ch => ch.type === 'text').size} Text & ${guild.channels
								.filter(ch => ch.type === 'voice').size} Voice
					`,
					inline: true
				},
				{
					name: '❯ Members',
					value: stripIndents`
						• ${totalUsers} Users & ${totalBots} Bots
						• Member Count: ${totalMems}
					`,
					inline: true
				},
				{
					name: '❯ Owner',
					value: stripIndents`
						• User: ${guild.owner.user.tag}
						• ID: ${guild.ownerID}
					`,
					inline: true
				},
			],
			thumbnail: { url: guild.iconURL }
		}});
    }
};