const { Command } = require('discord.js-commando');

module.exports = class Guild3Command extends Command {
    constructor(client) {
        super(client, {
            name: 'setcubey',
            group: 'administration',
            memberName: 'setcubey',
            description: 'Sets Cubeys preferences.',
            guarded: true,
            guildOnly: true,
            args: [
				{
					key: 'active',
					prompt: 'Would you like to log users that join?(True/False)\n',
					type: 'boolean'
                },
                {
					key: 'logpreset',
					prompt: 'Would you like to log commands?(True/False)\n',
					type: 'string'
                },
                {
					key: 'modlog',
                prompt: 'Which channel would you like to log commands on??(Exact name *Capitals included*/"False" If not wanted.)\n',
					type: 'string'
                },
                {
					key: 'updatechan',
                prompt: 'Which channel would you like to receive updates on??(Exact name *Capitals included*/"False" If not wanted.)\n',
					type: 'string'
                },
                {
					key: 'joinrole',
					prompt: 'Which role to give on joining?(Exact name *Capitols included*("Clear" to clear out the joinrole/"False" If not wanted.))\n',
					type: 'string'
                },
                {
					key: 'modrole',
					prompt: 'Which role to be used as Moderator?(Exact name *Capitols included*("Clear" to clear out the mod role/"False" If not wanted.))\n',
					type: 'string'
                }
			]
        });
    }
	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
	}

	run(msg, { active, logpreset, modlog, updatechan, joinrole, modrole }) {
        const guildid = msg.guild.id
        if(active === true) {
             this.client.provider.set(msg.guild.id, 'everJoined', 'True')
             msg.channel.send("Ever joined has been: `Enabled`")
        } 
        else if (active === false) {
             this.client.provider.set(msg.guild.id, 'everJoined', 'False')
            msg.channel.send("Ever joined has been: `Disabled`")
        }
        if(logpreset.toLowerCase() == "clear") {
            this.client.provider.clear(msg.guild.id, 'modLog')
            this.client.provider.clear(msg.guild.id, 'logSet')
            msg.channel.send("Mod-log settings cleared.`")
        } 
        else if(modlog.toLowerCase() == "false") {
            this.client.provider.set(msg.guild.id, 'modLog', 'False')
            this.client.provider.set(msg.guild.id, 'logSet', 'False')
                msg.channel.send("Mod-log presence: `False` channel: `False`")
        }
        else {
        this.client.provider.set(msg.guild.id, 'modLog', modlog)
        this.client.provider.set(msg.guild.id, 'logSet', logpreset)
            msg.channel.send("Mod-log presence: `" + logpreset + "` channel: `" + modlog+ "`")
        }
        if(updatechan.toLowerCase() == "clear") {
            this.client.provider.clear(guildid, 'updateChannel')
            msg.channel.send("Update channel cleared.")
        }
        else {
        this.client.provider.set(guildid, 'updateChannel', updatechan)
        msg.channel.send("Update channel set to: `" + updatechan + "`.")
        }
        if(joinrole.toLowerCase() == "clear") {
            this.client.provider.clear(guildid, 'joinRole')
            msg.channel.send("Join role cleared.")
        }
        else {
        this.client.provider.set(guildid, 'joinRole', joinrole)
        msg.channel.send("Join role set to: `" + joinrole + "`.")
        }
        if(modrole.toLowerCase() == "clear") {
            this.client.provider.clear(guildid, 'modRole')
            return msg.channel.send("Mod role cleared.")
        }
        else {
        this.client.provider.set(guildid, 'modRole', modrole)
            return msg.channel.send("Mod role set to: `" + modrole + "`.")
        }
	}
};
