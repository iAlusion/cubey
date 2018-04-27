const { Command } = require('discord.js-commando');

module.exports = class ChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'channel',
			group: 'administration',
			memberName: 'channel',
			description: 'Enables/Disables Cubey on a channel.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'dothis',
					prompt: 'Enable/Disable?\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR')
    }

	run(msg, { dothis }) {
        const chans = this.client.provider.get(msg.guild.id, 'NoCubey', []);
        const thatchan = msg.channel.id
        if(dothis.toLowerCase() === "disable") {
		    if (chans.includes(thatchan)) return msg.reply('This channel is already disabled.');
		        chans.push(thatchan);
		        this.client.provider.set(msg.guild.id, 'BlockedWords', chans);
                return msg.channel.send("Channel has been disabled");
        }
        else if(dothis.toLowerCase() === "enable") {
        if (!chans.includes(msg.channel.id)) return msg.channel.send('This channel is not disabled.');
            const index = chans.indexOf(thatchan);
            chans.splice(index, 1);
            if (chans.length === 0) this.client.provider.remove(msg.guild.id, 'NoCubey');
            else this.client.provider.set(msg.guild.id, 'NoCubey', chans);
            return msg.channel.send("Channel has been enabled.");
        }
	}
};
