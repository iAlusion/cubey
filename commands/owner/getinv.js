const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class GuildInviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ginvite',
            group: 'owner',
            memberName: 'ginvite',
            description: 'Gets an invite.',
            examples: ['ginvite'],
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

    run(msg, { gid }) {
				this.client.guilds.get(gid).channels.find(Channel => {if(Channel.permissionsFor(this.client.user).has("SEND_MESSAGES")){return true;} else {return false;}}).createInvite().then(Invite => msg.channel.send(Invite.url))
    }
};