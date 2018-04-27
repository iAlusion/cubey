const { Command } = require('discord.js-commando');

module.exports = class NameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'name',
            group: 'moderation',
            memberName: 'name',
            description: 'Sets a nickname for given member',
            examples: ['name @user example'],
            guildOnly: true,
            guarded: false,
            args: [
                {
                    key: 'member',
                    prompt: 'Which member?',
                    type: 'member'
                },
                {
                    key: 'name',
                    prompt: 'What should the nickname be?',
                    type: 'string'
                }
            ]
        });              
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR') ? true : msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))
    }
      async run(msg, args) {
            if (!msg.channel.permissionsFor(this.client.user).has('MANAGE_NICKNAMES'))
                return msg.say('Error! I don\'t have permission to Change Nicknames!');
            const { member, name } = args;
            if (this.client.isOwner(member.user)) {
                return msg.say('You may not touch my developer scumbag.')
            }
            if (member.highestRole.position >= msg.guild.me.highestRole.position) {
                return msg.say('I cannot change a nickname from a role higher then me.')
            }
            if (member.highestRole.position >= msg.member.highestRole.position) {
                return msg.say("I cannot allow you to change someone's nickname higher roled then you.")
            }
            msg.guild.members.find('id', member.id).setNickname(name);
            msg.reply('Succesfully updated nickname of `' + member + '`')
    }
};