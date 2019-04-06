const Discord = require('discord.js');
const http = require("http");
var config = require("./config");
console.log('******* Bot starting *******');
config.load();
const ChatHandler = require("./chathandler");
const Mimic = require("./mimic");

var user;

var time;

function setTime() {
	time = Date.now();
}

function getTime() {
	console.log("Took " + (Date.now() - time) + "ms");
}

exports.setTime = setTime;
exports.getTime = getTime;


// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = config.getToken();

// The ready event is vital, it means that your bot will only start reacting to information

var instance = this;
// from Discord _after_ ready is emitted
client.on('ready', () => {
  client.generateInvite(['SEND_MESSAGES'])
  .then(link => {
    console.log(`Generated bot invite link: ${link}`);
  });
  ChatHandler.setParent(instance);
  
  console.log("Loaded " + config.getOps().length + " op(s) and " + config.getBarredUsers().length + " barred user(s)");
  exports.client = client;
  exports.user = client.user;
  exports.me = client.guilds.first().me;
  user = client.user;

  Mimic.setup();

  //client.user.setStatus("online");
});

client.on("disconnect", function() {
	//client.user.setStatus("dnd");
})

// Create an event listener for messages
client.on('message', message => {
	
	ChatHandler.handle(message.content, message.author, message.channel, message);
	console.log("[#" + message.channel.name + "] " + message.author.username + ": " + message.content);
});

// Log our bot in
client.login(token);



