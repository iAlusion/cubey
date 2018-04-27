const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class DefineCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'define',
            group: 'general',
            memberName: 'define',
            description: 'Defines.',
            examples: ['guilds'],
            guarded: false,
            guildOnly: false
        });
    }

    run(msg) {
       let thatUser = msg.mentions.users.first();
       let thatMember = msg.mentions.members.first();
       let thatChannel = msg.mentions.channels.first();

       if(thatUser) {
        const mate = msg.guild.members.get(thatUser.id);
        let total = [];
        this.client.guilds.forEach(g => {
            if(!g.members.get(thatUser.id)) return
            else total.push(g.name)})
        const aEmbed = new RichEmbed()
            .setTitle(mate.user.tag)
            .setDescription("Shared guilds with Cubey: "+total)
            .setColor(11006140);
            msg.channel.send({embed: aEmbed})
       } else if(thatMember) {
        return //do nothing
       } else if(thatChannel) {
            return msg.channel.send(msg.guild.channels.get(thatChannel.id).id)
       }
    }
};