const { Command } = require('discord.js-commando');

module.exports = class TakeRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'take',
            aliases: ['takerole', 'unrole'],
            group: 'moderation',
            memberName: 'take',
            description: 'Takes away role from a member.',
            examples: ['take'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to take a role from?',
                    type: 'member'
                },
                {
                    key: 'grole',
                    prompt: 'Which role?',
                    type: 'string'
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
            const { member, grole } = args;
            var roleToRemove = msg.guild.roles.find(role => role.name.toLowerCase() === grole.toLowerCase());
            if (!roleToRemove) { 
                return msg.say('There is no such role!') }
            if (roleToRemove.position >= msg.guild.me.highestRole.position) {
                return msg.say('I cannot take a higher role then me.')
            }
            if (roleToRemove.position >= msg.member.highestRole.position) {
                return msg.say('I cannot allow you to take a role higher then yourself.')
            }
            member.removeRole(roleToRemove);
            msg.reply("Removed `" + roleToRemove + "` from: "+ member)
    }
};