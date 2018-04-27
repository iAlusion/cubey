const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class SendupdateCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sendupdate',
			group: 'owner',
			memberName: 'sendupdate',
			description: 'Sends the latest updates of Cubey to the server-set notification channel.',
			args: [
				{
					key: 'text',
					prompt: 'Which updates should I send?\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

    run(msg, { text }) {
        const embedd = new RichEmbed()
            .setTitle("Latest updates of Cubey:")
            .setDescription(text)
            .setColor(11006140)
            .setTimestamp();

        this.client.guilds.forEach(g => {
            let updater = this.client.provider.get(g.id, 'updateChannel', '')
						let toSend = g.channels.find('name', updater)
            if(updater[0] === undefined) return
                if(updater == "False") return
								if(!toSend) return
                    else return toSend.send({embed: embedd })
        })
    }
};
