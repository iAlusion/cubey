const { Command } = require('discord.js-commando');

module.exports = class Guild3Command extends Command {
    constructor(client) {
        super(client, {
            name: 'welcomesetup',
            group: 'administration',
            memberName: 'welcomesetup',
            description: 'Sets the welcome channel & message.',
            guarded: true,
            guildOnly: true,
            args: [
				{
					key: 'welcomechannel',
					prompt: 'Which channel would you like for it?(Exact name *Capitols included*)\n',
					type: 'string'
                },
                {
					key: 'welcomemessage',
					prompt: 'What should the welcome message be?\n',
					type: 'string'
				},
                {
					key: 'leavemessage',
					prompt: 'What should the leave message be?\n',
					type: 'string'
				}
			]
        });
    }
	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
	}

	run(msg, { welcomechannel, welcomemessage, leavemessage }) {
        const guildid = msg.guild.id
        const wcchan = this.client.provider.get(guildid, 'welcomeChannel', []);
         if(!wcchan) {
             this.client.provider.set(guildid, 'welcomeChannel', welcomechannel)
         }
            else if (wcchan) {
                this.client.provider.set(guildid, 'welcomeChannel', welcomechannel)
            }
        const wctext = this.client.provider.get(guildid, 'welcomeMessage', []);
                 if(!wctext) {
             this.client.provider.set(guildid, 'welcomeMessage', welcomemessage)
         }
            else if (wctext) {
                this.client.provider.set(guildid, 'welcomeMessage', welcomemessage)
            }        
        const leavetext = this.client.provider.get(guildid, 'welcomeMessage', []);
            if(!leavetext) {
                this.client.provider.set(guildid, 'leaveMessage', leavemessage)
                }
            else if (leavetext) {
                    this.client.provider.set(guildid, 'leaveMessage', leavemessage)
       }
        msg.channel.send("Welcome channel set to: `" + welcomechannel + "` & welcome message set to: `" + welcomemessage + "` & leave message set to: `" + leavemessage + "`")
	}
};
