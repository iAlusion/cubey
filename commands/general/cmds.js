const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CmdsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'commands',
            group: 'general',
            memberName: 'commands',
            description: 'Lists commands Categories: general, moderation, administration, staff, owner.',
            examples: [';commands, ;commands general (Lists by category)'],
            guarded: false,
            guildOnly: false
        });    
    }

    run(msg) {
        let categ = msg.content.split(' ').slice(1, 2);
        let ok = categ.join(' ');

const mainembed = new RichEmbed()
.setDescription("Commands")
.setColor(0x00AE86)
.addField('Arguments', 'All arguments are defined on the command by [] with text in it. If it has none, there are no arguments to provide with the command.', true)
.addField('Aliases', 'All aliases are defined on the command name by [] with text in it. If it has none, there are no aliases for that command.', true)
.addField('General', 'Commands for any member.', false)
.addField('Moderation', 'Commands for members with the server-set Moderator role.', true)
.addField('Administration', 'Commands for members with the Administrator permission.', false)
.addField('Staff', 'Commands for the Staff of the bot server.', true)
.addField('Owner', 'Commands for ialusion#3104.', false);

const genembed = new RichEmbed()
.setDescription("General commands")
.setColor(0x00AE86)
.addField('avatar', 'Gives an link to your avatar.', true)
.addField('confirm', 'Will acknowledge the bot is running.', false)
.addField('roll', 'Rolls a dice.', true)
.addField('embed', 'Embeds the text you provide. [text]', false)
.addField('userid', 'Provides your own id if no user is mentioned. [@someone]', true)
.addField("invite", "Provides Cubey's invite link.", false)
.addField('discord', 'Provides an invite link to the bot discord server', true)
.addField('say', 'Cubey will send the text you provide. [text]', false)
.addField('server-info', 'Displays information about the server.', true)
.addField('stats', 'Displays stats on Cubey.', false)
.addField('strawpoll', 'Creates a strawpoll. [title] [multiple answers]', true)
.addField('support', 'Allows you to ask a question to the Staff, will be returned by DM. Please make sure that you have your DMs active. [text]', false)
.addField('js', 'Returns the code you provide in JS syntax. [text]', true);

const modembed = new RichEmbed()
.setDescription("Moderation commands")
.setColor(0x00AE86)
.addField('ban', 'Bans a member. [@someone]', true)
.addField('clean', 'Clears up messages. Max: 100 [number]', true)
.addField('kick', 'Kicks a member. [@someone]', false)
.addField('name', 'Sets a members nickname. [@someone] [name]', true)
.addField('give', 'Gives a role to a member. [@someone] [role name]')
.addField('take', 'Takes a role from a member. [@someone] [role name]', false)
.addField('skid', 'Skids a member. [@someone]', true)
.addField("strip", "Removes all roles from a member. [@someone]", false);

const adminembed = new RichEmbed()
.setDescription("Administration commands")
.setColor(0x00AE86)
.addField('block-word[bword]', 'Blocks that word from being used in messages. [word]', true)
.addField('unblock-word[unbword]', 'Unblocks the word from the list. [word]', true)
.addField('botfreesetup', 'Allows to easily delete bot messages on instant in a specified channel. [botID] [channelname]', true)
.addField('botnick', 'Sets the nickname of Cubey. [name]', false)
.addField('channel', 'Enables/disables commands from cubey on a channel. [enable/disable]', true)
.addField('activate-cybernuke[nuke]', 'Initiates ban protocol by join date. (Usable to e.g prevent mass join attacks.)', false)
.addField('setcubey', 'Saves Cubeys preferences. [true/false] [true/false] [channel name] [role name] [role name]', true)
.addField('leave', 'Makes Cubey leave the server.', true)
.addField('setview[guildset]', 'Views the guild settings (Including the log of everjoin)', false)
.addField('welcomesetup', 'Sets the welcome channel, welcome message and leave message.[channel name] [welcome message] [leave message]', false);

const staffembed = new RichEmbed()
.setDescription("Staff commands")
.setColor(0x00AE86)
.addField('spreply', 'DMs a user with an answer to their question. [userID] [text]', true);

const ownerembed = new RichEmbed()
.setDescription("Owner commands")
.setColor(0x00AE86)
.addField('gchannels', 'Shows channels of a server and if Cubey can message to it or not.', true)
.addField('fl', 'Forces Cubey to leave a server. [server id]', false)
.addField('guilds', 'Lists the current guilds Cubey is in.', true)
.addField('updatebot', 'Updates the bot play status. [text]', false)
.addField('blacklist-user[blacklist]', 'Blocks a user from using Cubey. [@someone]', true)
.addField('whitelist-user[whitelist]', 'Removes the block from using Cubey. [@someone]', false)
.addField('reload', 'Reloads a command. [command name]', true)
.addField('load', 'Loads a command. [command name]', false)
.addField('unload', 'Unloads a command. [command name]', false)
.addField('eval', 'Executes JavaScript code. [code]', true);
        
        if(!ok) {
            return msg.channel.send({embed: mainembed})
        }else if(ok.toLowerCase() === "general") {
            return msg.channel.send({embed: genembed})
        }else if(ok.toLowerCase() === "moderation") {
            if(!msg.member.roles.exists('name', this.client.provider.get(msg.guild.id, 'modRole', ''))) return msg.channel.send("You do not have the required permissions!")
                return msg.channel.send({embed: modembed})
        }else if(ok.toLowerCase() === "administration") {
            if(!msg.channel.permissionsFor(msg.member).has("ADMINISTRATOR")) return msg.channel.send("You do not have the required permissions!")
                return msg.channel.send({embed: adminembed})
        }else if(ok.toLowerCase() === "staff") {
            if(!this.client.guilds.get('').members.get(msg.member.id).roles.has('name', 'Staff')) return msg.channel.send("You do not have the required permissions!")
                return msg.channel.send({embed: staffembed})
        }else if(ok.toLowerCase() === "owner") {
            if(!this.client.isOwner(msg.author)) return msg.channel.send("You do not have the required permissions!")
                return msg.channel.send({embed: ownerembed})   
        }
    }
};











