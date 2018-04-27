const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class UBDCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ubd',
            group: 'general',
            memberName: 'ubd',
            description: 'Test',
            examples: ['ubd <discriminator>'],
            guarded: false,
            guildOnly: false,
            args: [
                {
                    key: 'thingy',
                    prompt: 'Discriminator?\n',
                    type: 'string'
                }
            ]
        });
    }

  async run(msg, { thingy }) {
     const theMsg = await msg.channel.send('Searching...');
		 const person = this.client.users.find('discriminator', thingy);
		 		 if(person === null) {
				 	setTimeout(function() { theMsg.edit('User not found.') }, 1500);
				 	return;
					}
		 let field3 = [];
		 let field2;
		 let field1 = [];

		 const cunt = this.client.guilds.get('338676396597444610').members.get(person.id)
		 
		 if(cunt) {
		 	field2 = 'Yes'
			field3.push(cunt.roles.map(r => r.name).join('\n'));
			}
		 else {
		 	field2 = 'No'
			field3 = 'N/A'
			}
		 
    this.client.guilds.forEach(g => {
     		if(!g.members.get(person.id)) return
          else field1.push(g.name)})
					
		const embed = new RichEmbed()
		 			.setTitle(person.tag)
					.addField("Profile >", "Status: **"+person.presence.status+"**\nGame: **"+person.presence.game.name+"**")
					.addField('Shared guilds with Cubey >', field1)
					.addField('Is in Universal Bot Development >', field2)
					.addField('UBD Roles >', field3);
		
		setTimeout(function() { theMsg.edit({embed}) }, 3000);
		return;
}};