const { Command } = require('discord.js-commando');

module.exports = class StripCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'strip',
            aliases: ['fucku', 'getstripped'],
            group: 'moderation',
            memberName: 'strip',
            description: 'Strips a members roles',
            examples: ['strip @user'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to strip?',
                    type: 'member'
                }
            ]
        });    
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR') ? true : msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))
    }
        run(msg, args) {
            if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_ROLES'))
                return msg.say('Error! I don\'t have permission to Change Roles!');
            const { member } = args;
            if (member.highestRole.position >= msg.member.highestRole.position) {
                return msg.say("I cannot allow you to take someone's roles that is higher then you.")
            }
            member.setRoles([])
            msg.say("Now is `"+ member.user.username +"` naked :(")
    }
};