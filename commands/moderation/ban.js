const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['banmember', 'bye'],
            group: 'moderation',
            memberName: 'ban',
            description: 'Ban a member from the server.',
            examples: ['ban'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to be banned?',
                    type: 'member'
                }
            ]
        });    
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR') ? true : msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))
    }
       run(msg, args) {
        if (!msg.channel.permissionsFor(this.client.user).has('BAN_MEMBERS'))
            return msg.say('Error! I don\'t have permission to Ban Members!');
    const { member } = args;
          if (this.client.isOwner(member.user)) {
                return msg.say('You may not touch my developer scumbag.')
          }
          if (member.user.id === msg.author.id) {
              return msg.say("You don't want to ban yourself do you?")
          }
          if (member.bannable == false) {
              return msg.say('I cannot ban this member.')
          }
          if (member.highestRole.position >= msg.member.highestRole.position) {
              return msg.say('You cannot ban someone higher roled then you.')
          }
          member.ban(); {
          msg.reply(`Succesfully banned: ${args.member.user.username}`);
    }
}};