let gameMessageCount = 1
let wantedStatus;

exports.isMod = function (client, guildy, person) {
	let modRole = client.provider.get(guildy, 'modRole', [0])
	let badBoy = client.guilds.get(guildy).members.get(person)
	if(!badBoy.roles.has('name', modRole)) return false
		return true;
}

exports.isAdmin = function (client, person) {
	let badBoy = client.guilds.get('338676396597444610').members.get(person)
	if(!badBoy) return false
	if(!badBoy.roles.exists('name', 'Staff')) return false
		return true;
}

exports.joinText = function (client, guildy) {
	let toCheck = client.provider.get(guildy, 'welcomeMessage', '')
	if(toCheck[0] === undefined) return false;
		if(toCheck[0] == "False") return false;
			return true;
}

exports.leaveText = function (client, guildy) {
	let toCheck = client.provider.get(guildy, 'leaveMessage', '')
	if(toCheck[0] === undefined) return false
		if(toCheck[0] == "False") return false
			return true;
}

exports.joinRole = function (client, guildy) {
	let toCheck = client.provider.get(guildy, 'joinRole', '')
	if(toCheck[0] === undefined) return false
		if(toCheck[0] == "False") return false
		return true;
}

exports.setthegame = function (client) {
	if(gameMessageCount === 1) {
		client.user.setStatus("online")
		gameMessageCount += 1
		return "in " + client.guilds.array().length + " servers with a total of " + client.users.array().length + " users | ;commands"
	}
	else if(gameMessageCount === 2) {
		gameMessageCount += 1
		return "need help with Cubey? say ;discord to join the dev server!"
	 }
	else if(gameMessageCount === 3) {
		gameMessageCount += 1
		return ";commands & ;support are two useful commands to get a commands list or easily contact the server with a question"
	}
	else if(gameMessageCount === 4) {
		gameMessageCount = 1
		return "a developing moderative-fun bot"
	}
	else if(gameMessageCount === 5) {
		return wantedStatus
	}
	else if(gameMessageCount === 6) {
		client.user.setStatus("idle")
		return "Under development."
	}
}

exports.checklogger = function (client, guildy) {
	let toCheck = client.provider.get(guildy, 'everJoin', '')
	if(toCheck[0] === undefined) return false
		if(toCheck[0] == "False") return false
		return true;
}

exports.logstuff = function (client, channy, text) {
	client.guilds.get('338676396597444610').channels.get(channy).send(text);
}

exports.canWeSend = function (client, guildy) {
	let toCheck = client.provider.get(guildy, 'welcomeChannel', '')
	if(toCheck[0] === undefined) return false
		if(toCheck[0] == "False") return false
		return true;
}

exports.badWord =  function (client, guildy, channy, botty, word) {
	let Chantys = client.provider.get(guildy, 'BotFreeChannels', [])
	let BlockedWords = client.provider.get(guildy, 'BlockedWords', [])
	let NotThem = client.provider.get(guildy, 'BotIDs', [])
	if(!Chantys.includes(channy)) return false
	if(!NotThem.includes(botty)) return false
	if(!BlockedWords.includes(word)) return false
	return true
}

exports.changeStatus = function (text, count) {
	gameMessageCount = count
	wantedStatus = text
}

exports.MutualGuilds = function (client, id, id2) {
	let Mutual = [];
	client.guilds.forEach(g => {
		if(g.members.get(id) && g.members.get(id2)) {
			Mutual.push(g.id)
		} else {return}
		})
	if(Mutual[0] === undefined) return 'No servers mutual that Cubey shares with either of the given IDs.'
	else return Mutual
}

exports.lastGuild = function (client, id) {
	let total = [];
	client.guilds.forEach(g => { 
		if(!g.members.get(id)) return
		else total.push(g.id)
	})
	if(total[0] === undefined) return true;
	else return false;
}

exports.botOwner = function (client, member) {
	const toCheck = client.provider.get(member, 'ownerID', [])
	if(toCheck[0] === undefined) return false;
	return toCheck
}

exports.wipeGuildData = function (client, guild) {
		client.provider.remove(guild, 'NoCubey');
		client.provider.remove(guild, 'BotPrefixes');
		client.provider.remove(guild, 'BotIDs');
		client.provider.remove(guild, 'BotFreeChannels');
		client.provider.remove(guild, 'modLog');
		client.provider.remove(guild, 'logSet');
		client.provider.remove(guild, 'welcomeChannel');
		client.provider.remove(guild, 'welcomeMessage');
		client.provider.remove(guild, 'leaveMessage');
		client.provider.remove(guild, 'everJoined');
		client.provider.remove(guild, 'everJoinedLog');
		client.provider.remove(guild, 'joinRole');
}