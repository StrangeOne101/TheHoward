const data = require("./data");
const storytime = data.load("storytime");

storytime.lastUsers = storytime.lastUsers || [];
storytime.repeatAfter = storytime.repeatAfter || 3;

if (channel.id == storytime.channel && storytime.enabled == true) {
	if (storytime.lastUsers.indexOf(sender.id) != -1) {
		msgobj.delete().catch(() => {});
		channel.send(sender.tag + " You must wait till " + (storytime.lastUsers.indexOf(sender.id) + 1) + `
		more people add to the story before you can add a word!`).then(message => {
			setTimeout(() => {
				message.delete().catch(() => {}); //Delete message
			}, 1000 * 10); //After 10 seconds
		});
		return;
	}

	if (message.indexOf(" ") != -1) {
		msgobj.delete().catch(() => {});
		channel.send(sender.tag + " You can only send one word at a time!").then(message => {
			setTimeout(() => {
				message.delete().catch(() => {}); //Delete message
			}, 1000 * 10); //After 10 seconds
		});
		return;
	}

	var word = message;

	var originalMessage = channel.fetchMessage(storytime.storyId).then(message => {
		if (message.content == storytime.storyMessage) {
			message.edit(word);
			msgobj.delete(() => {}); //Delete the message that added the word
			storytime.lastUsers.push(sender.id); //Add user to end the list
			storytime.lastUsers.shift(); //Remove the first element in the list
			return;
		}
		var lastWord = message.content.split(" ")[message.content.split(" ").length - 1];

		if (lastWord.toLowerCase() == word.toLowerCase()) {
			msgobj.delete().catch(() => {});
			channel.send(sender.tag + " You cannot use the last word added to the story!").then(message => {
				setTimeout(() => {
					message.delete().catch(() => {}); //Delete message
				}, 1000 * 10); //After 10 seconds
			});
			return;
		}

		message.edit(message.content + " " + word); //Add the word
		msgobj.delete(() => {}); //Delete the message that added the word
		storytime.lastUsers.push(sender.id); //Add user to end the list
		storytime.lastUsers.shift(); //Remove the first element in the list
	});


}

data.save("storytime", storytime);
