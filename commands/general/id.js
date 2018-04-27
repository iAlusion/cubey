const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class IdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userid',
            group: 'general',
            memberName: 'userid',
            description: 'Gives a discord ID.',
            examples: ['myid'],
            guarded: false,
            guildOnly: false,
        });
    }

    run(msg) {
        let user = msg.mentions.users.first();
        if(!user) {
            return msg.embed({
                color: 3447003,
                description: ":robot: `" + msg.member.user.id + "`"});
        }else if(user) {
            return msg.channel.send({embed: {
                color: 3447003,
                description: ":robot: `" + user.id + "`"
        }})}}
};