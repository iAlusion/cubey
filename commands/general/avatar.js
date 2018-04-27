const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'general',
            memberName: 'avatar',
            description: 'Gives your avatar.',
            examples: ['avatar']
        });
    }

    run(msg) {
        const embed = new RichEmbed()
            .setTitle("Click me!")
            .setURL(msg.author.avatarURL)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setColor(0x48D1CC)
            .setThumbnail(msg.author.displayAvatarURL);
        return msg.channel.send({embed})
    }
};