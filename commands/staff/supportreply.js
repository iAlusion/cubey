const { Command } = require('discord.js-commando');

module.exports = class SupportReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'spreply',
            group: 'staff',
            memberName: 'spreply',
            description: 'Sends a message to a guild.',
            examples: ['spreply'],
            guarded: false,
            guildOnly: false,
            args: [
                {
                    key: 'userid',
                    prompt: 'Which userID do you want to message?',
                    type: 'string'
                },
                {
                    key: 'text',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        }); 
    }

    hasPermission(msg) {
         if(this.client.isOwner(msg.author)) return true;
            const member = this.client.guilds.get('338676396597444610').members.find('id', msg.member.id);
        if(!member) return false;
        return member.roles.exists('name', 'Staff') 
        }

    run(msg, args) {
        const { userid, text } = args;
        this.client.fetchUser(userid).then(user => user.send(`In reply to: __**${user.username}**__\n\n**Support** has answered your question:\nHandled by: **${msg.member.user.username}**\n\n__**Answer:**__\n${args.text}\n\nI hope to have answered your question! If not, please contact support again. We hope you enjoy using Cubey. Bye!`)).catch(console.error)
        this.client.guilds.get('338676396597444610').channels.get('348142781576904716').send("`" + msg.memberName + "` has supported `" + args.userid + "` with: `" + args.text + "`");
        msg.say('Succesfully sent!')
    }
}; 