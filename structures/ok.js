//setInterval(function(){client.user.setPresence({ game: { name: funcs.setthegame(client), type: 0 } })}, 45000);

/*
.on('presenceUpdate', (oldMember, newMember) => {
		let iD = funcs.botOwner(client, newMember.id)
		
		if(newMember.guild.id !== '338676396597444610') return
		if(newMember.id !== '148899587283877888') return
		
		if(iD == false) return client.users.get('148899587283877888').send('Could not obtain the bot owner ID from Presence Update => ' + newMember.id)
		console.log(newMember.user.tag)
			if(newMember.presence.status === 'online') {
				client.users.get(iD).send('Online');
				return console.log("Sent to: "+ iD);
			} else if(newMember.presence.status === 'offline') {
				client.users.get(iD).send('Offline');
				return console.log("Sent to: "+ iD);
			}
	 })
 */