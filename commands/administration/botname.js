const { Command } = require('discord.js-commando');

module.exports = class BotNickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botnick',
            group: 'administration',
            memberName: 'botnick',
            description: 'Sets my nickname for your server!',
            examples: ['botnick'],
            args: [
                {
                    key: 'name',
                    prompt: 'What would you like my name to be?',
                    type: 'string'
                }
            ]
        });              
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) ? true : msg.member.hasPermission('ADMINISTRATOR')
    }
       run(msg, args) {
           if (!msg.channel.permissionsFor(this.client.user).has('CHANGE_NICKNAME'))
            return msg.say('Error! I don\'t have permission to change my nickname!');
          const { name } = args;
          msg.guild.me.setNickname(name);
          msg.reply('Succesfully updated my nickname!')
      }};