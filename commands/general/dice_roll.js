const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');

module.exports = class DiceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'general',
            memberName: 'roll',
            description: 'Rolls a dice'
        });
    }

     run(msg) {
        var roll = Math.floor(Math.random() * 6) + 1;

		return msg.channel.send({embed: {
			color: 3447003,
			description: "You rolled `" + roll + "`! :thumbsup:",
		}});
	}
};
