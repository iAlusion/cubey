const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'give',
            aliases: ['giverole', 'role'],
            group: 'moderation',
            memberName: 'give',
            description: 'Gives a role to a member.',
            examples: ['give'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to give a role?',
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
    var roleToAdd = msg.guild.roles.find(role => role.name.toLowerCase() === grole.toLowerCase());
        if (!roleToAdd) { 
            return msg.say('There is no such role!') }
        if (roleToAdd.position >= msg.guild.me.highestRole.position) {
            return msg.say('I cannot give a role higher then me.')
            }
        if (roleToAdd.position >= msg.member.highestRole.position) {
            return msg.say('I cannot allow you to give a role higher then yourself.')
            }
            member.addRole(roleToAdd);
            msg.say("Added `" + grole + "` to: "+ member)
    }
};