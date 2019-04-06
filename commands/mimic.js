//send("args: '" + args + "'")
const Mimic = require("./mimic");
const Discord = require("discord.js");
if (args.length == 0) {
	send("Usage is `!mimic <message>`");
} else {
	if (args[0] == "debug") {
		send("CanMimic: " + Mimic.canMimic(channel));
		return;
	} else if (args[0] == "clearall") {
		channel.guild.fetchWebhooks()
			.then(hooks => hooks.forEach(e => e.delete()))
			.then(send("Deleted all webhooks!"))
			.catch(err => {
				console.log(err);
				send("An error occured: " + err);
			})
			return;
	}
	var message = args.join(" ");
	send(message, {mimic: sender});
}