const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ChannelsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gchannels',
            group: 'owner',
            memberName: 'gchannels',
            description: 'Allows me to see if I can send messages to certain channels with the bot, for e.g updates!(With consent of the server owner)',
            examples: ['gchannels'],
            guarded: false,
            guildOnly: true,
            args: [
                {
                    key: 'guildid',
                    prompt: 'Which guild channels would you like to look into?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
         return this.client.isOwner(msg.author)
        }

    run(msg, args) {
        const { guildid } = args;
        var channel = this.client.guilds.get(guildid).channels.map(c =>`${c.name} [${c.id}] can send: ${c.permissionFor(this.client.user).has('SEND_MESSAGES')}`).join('\n* ')
        const embed = new RichEmbed()
            .setTitle("Guild name:")
            .setDescription(this.client.guilds.get(guildid).name)
            .setAuthor("NiteBot#0767","https://cdn.discordapp.com/avatars/314042564909072386/964700bfdd684f5e94e19ee8a68e6cbe.png")
            .setColor(11006140)
            .addField("Current channels:", channel)
        return msg.embed(embed);
    }   
};