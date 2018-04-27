const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['kickmember', 'fuckoff'],
            group: 'moderation',
            memberName: 'kick',
            description: 'Kicks a member from the server.',
            examples: ['kick @user'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'Who would you like to be kicked?',
                    type: 'member'
                }
            ]
        });    
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR') ? true : msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))
    }
       run(msg, args) {
        if (!msg.channel.permissionsFor(this.client.user).has('KICK_MEMBERS'))
            return msg.say('Error! I don\'t have permission to Kick Members!');
          const { member } = args;
          if (this.client.isOwner(member.user)) {
                return msg.say('You may not touch my developer scumbag.')
          }
          if (member.user.id === msg.author.id) {
              return msg.say("You don't want to kick yourself do you?")
          }
          if (member.kickable == false) {
              return msg.say('I cannot kick this member.')
          }
          if (member.highestRole.position >= msg.member.highestRole.position) {
              return msg.say('You cannot kick someone higher roled then you.')
          }
          member.kick(); {
          msg.reply("Succesfully kicked `" + member + "`");
    }
}};
