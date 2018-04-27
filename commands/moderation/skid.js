const { Command } = require('discord.js-commando');

module.exports = class SkidCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skid',
            group: 'moderation',
            memberName: 'skid',
            description: 'Skid someone',
            examples: ['skid @user'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to be skidded?',
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
            var roleToAdd = msg.guild.roles.find("name", "Skiddy");
            if (!roleToAdd) {
                msg.say("Role not found. Creating it!") 
                msg.guild.createRole({
                name: 'Skiddy',
                color: 'BLUE',
            }).then(role => member.addRole(role)).catch(console.error)
                msg.say("Hah! `" + member.user.tag + "` is now a skid!")
            } 
            else if (roleToAdd) {
                member.addRole(roleToAdd)
                msg.say("Hah! `" + member.user.tag + "` is now a skid!")
            }
    }
};