const { Command } = require('discord.js-commando');

module.exports = class ForceLeaveCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'fl',
            group: 'owner',
            memberName: 'fl',
            description: 'Force leaves a guild',
            details: 'This command is barely used, but if in case of usage; Staff of Nitebot must have seen excessive vulgar/unrespectable behaviour, abuse of the bot commands on members, purposely trying to break the bot, or any case we might consider leave-able for the bot.',
            examples: ['fl'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'guild',
                    prompt: 'Which guild would you like to leave?',
                    type: 'string'
                }
            ]
        });
    }

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

    run(msg, args) {
        const { guild } = args;
        this.client.guilds.get(guild)
        .leave();
        msg.reply('Succesfully left the guild.')
        this.client.guilds.get('338676396597444610').channels.get('348142781576904716').send("`"+ msg.member.user.username + "` has forced Nitebot to leave:  `"  + guild.name + "`")
    }
};