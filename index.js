const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { oneLine, stripIndents } = require('common-tags');
const path = require('path');
const winston = require('winston');
const sqlite = require('sqlite');
const config = require('./config.json');
const moment = require('moment');
const snekfetch = require('snekfetch')
const { RichEmbed } = require('discord.js');
const funcs = require('./structures/funcs.js');

const client = new CommandoClient({
    unknownCommandResponse: false,
    nonCommandEditable: false,
    commandEditableDuration: 30,
    commandPrefix: ';',
    owner: '148899587283877888',
	disableEveryone: true,
	messageCacheMaxSize: 400,
	messageCacheLifetime: 2500,
	messageSweepInterval: 4500
});

process.on('unhandledRejection', err => {
    console.warn(`Uncaught Promise Error: \n${err.stack}`)
});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new SQLiteProvider(db))
).catch(console.error);

client.dispatcher.addInhibitor(msg => {
	if(msg.command === undefined) return false;
	if(msg.command.group.name == 'general') return false;
	if(client.isOwner(msg.author)) return false;
	if(funcs.isMod(client, msg.guild.id, msg.member.id) && msg.command.group.name == 'moderation') return false;
	if(funcs.isAdmin(client, msg.member.id) && msg.command.group.name !== 'owner') return false;
	return msg.channel.send(`Not permitted category: [`+msg.command.group.name+`] by: `+msg.author.tag)
});

client.dispatcher.addInhibitor(msg => {
	return false;
	const toBlock = ['']
	if(!toBlock.includes(msg.command.memberName)) return false;
	return msg.channel.send('This command has been disabled globally. (Command in bugs fixes.)')
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	return `Has been blacklisted.`;
});

client.dispatcher.addInhibitor(msg => {
	if(msg.channel.type == 'dm') return false;
	const disable = client.provider.get(msg.guild.id, 'NoCubey', [])
	if(!disable.includes(msg.channel.id)) return false;
	if(msg.command.memberName === 'channel') return false;
	return `Channel has been disabled.`;
});

client.on('error', winston.error)
	.on('warn', winston.warn)
	.on('ready', () => {
		snekfetch.post(`https://discordbots.org/api/bots/314042564909072386/stats`)
        .set('Authorization', 'noob')
        .send({ server_count: client.guilds.size })
        .then(console.log('Updated discordbots.org status.'))
        .catch(e => console.log(e.body))
    snekfetch.post(`https://bots.discord.pw/api/bots/314042564909072386/stats`)
        .set('Authorization', 'noob')
        .send({ server_count: client.guilds.size })
        .then(console.log('Updated bots.discord.pw status.'))
        .catch(e => console.log(e.body))
			client.users.get('148899587283877888').send('Up and running boss!');
  		client.user.setPresence({ game: { name: "in ["+client.guilds.size+"] servers || ;commands For command info. ;support for contact.", type: 0 } });
			setInterval(function(){client.user.setPresence({ game: { name: "in ["+client.guilds.size+"] servers || ;commands For command info. ;support for contact.", type: 0 } })}, 45000);
		winston.info(oneLine`
			[DISCORD]: Client ready...
			Logged in as ${client.user.tag} (${client.user.id})
		`);
	})
	.on('disconnect', () => winston.warn('[DISCORD]: Disconnected!'))
	.on('reconnect', () => winston.warn('[DISCORD]: Reconnecting...'))
	.on('commandRun', (cmd, promise, msg, args) => { 
	//client.guilds.get('369919539389136896').channels.get('371721661340188683').send("`"+ msg.author.tag + "` has used `" + cmd.memberName + "` in:  `"  + msg.guild.name + "`")
		winston.info(oneLine`
			[DISCORD]: ${msg.author.tag} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args).length ? `>>> ${Object.values(args)}` : ''}
		`)
	if(client.isOwner(msg.author)) return;
	const toCheck1 = client.provider.get(msg.guild.id, 'logSet', '')
	if(toCheck1.toLowerCase() !== 'true') return;
			const embedlog = new RichEmbed()
					.setDescription("Command: "+cmd.memberName)
					.setAuthor(msg.author.tag, msg.author.displayAvatarURL)
					.setColor(0x00AE86)
					.setTimestamp()
					.addField("Args:", `${Object.values(args).length ? Object.values(args) : 'N/A'}`, true);
		const toCheck = client.provider.get(msg.guild.id, 'modLog', [0])
		if(toCheck[0] === undefined) return funcs.logstuff(client, '371727949734608897', "toCheck undefined for: "+msg.guild.id +msg.guild.name)
		const chan =  msg.guild.channels.find('name', toCheck)
		if(!chan) return funcs.logstuff(client, '371727949734608897', "Could not find the mod channel log for: "+msg.guild.id+" content: "+toCheck)
		return chan.send({embed : embedlog});
	})
	.on('commandBlocked', (msg, reason) => {
		winston.info(oneLine`
			[DISCORD]: Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; User ${msg.author.tag} (${msg.author.id}): ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		winston.info(oneLine`
			[DISCORD]: Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
   .on('guildCreate', (guild) => {
	  console.log(`Cubey has joined ${guild.name}`);
	  client.users.get('148899587283877888').send("New guild detected!").then(msg => msg.channel.send("`"+guild.name+"` ID: `"+guild.id+"`"))
    return;
	})
	 .on('guildDelete', (guild) => {
		console.log(`Cubey has left ${guild.name}`);
		return client.guilds.get('369919539389136896').channels.get('371720348019982336').send("`Cubey` has left: `" + guild.name + "`");
	 })
   .on('guildMemberAdd', (member) => {
	const him = member.guild.id;
	const joinEmbed = new RichEmbed()
		.setDescription("Hello there, "+member.user+"! :wave:")
		.setColor(0x00AE86);
	const joinEmbed2 = new RichEmbed()
		.setDescription(client.provider.get(member.guild.id, 'welcomeMessage', ''))
		.setColor(0x00AE86);
	
	if(funcs.canWeSend(client, him)) {
		const thatTexty = client.provider.get(him, 'welcomeChannel', '');
		const letsSendThere = member.guild.channels.find('name', thatTexty);
		if(!letsSendThere) return;
		if(!funcs.joinText) {letsSendThere.send({embed: joinEmbed})}
		else {return letsSendThere.send({embed: joinEmbed2})}
	}
	if(funcs.joinRole(client, him)) {
		const toAdd = client.provider.get(him, 'joinRole', '');
		const toAddChecked = member.guild.roles.find('name', toAdd)
		if(!toAddChecked) return;
		return member.addRole(toAddChecked);
	}
	if(funcs.checklogger(client, him)) {
		let loghere = client.provider.get(him, 'everJoinedLog', []);
		if(loghere.includes(member.user.tag)) return;
		else loghere.push(member.user.tag);
		client.provider.set(him, 'everJoinedLog', loghere);
		return;
	}
	return;
	})
	.on('guildMemberRemove', (member) => {
	const leaveEmbed = new RichEmbed()
		.setDescription("Goodbye, "+member.user+"! :wave:")
		.setColor(0x00AE86);
	const leaveEmbed2 = new RichEmbed()
		.setDescription(client.provider.get(member.guild.id, 'leaveMessage', ''))
		.setColor(0x00AE86);
		})
   .on('message', async message => {
	const messageIGot = new RichEmbed()
		.setDescription(message.content)
		.setAuthor(`${message.author.tag} ID: ${message.author.id}`, message.author.displayAvatarURL)
		.setColor(0x00AE86)
		.setTimestamp();
	if(message.channel.type !== 'dm') return;
	if(message.author.bot) return;
	if(message.author === client.user) return;
		return client.users.get('148899587283877888').send({embed: messageIGot});
   });

client.registry
	.registerGroups([
		['general', 'general'],
		['moderation', 'moderation'],
		['administration', 'administration'],
		['staff', 'staff'],
		['owner', 'owner'],
		['commands', 'setcom'],
		['util', 'util']
	])
	.registerDefaultTypes()
	.registerDefaultCommands({
		help: false,
		prefix: true,
		ping: true,
		eval: true,
		commandState: true
	})
	.registerTypesIn(path.join(__dirname, 'types'))
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(config.Token);
