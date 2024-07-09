require("dotenv/config");
require('colors')

//Require the necessary discord.js classes
const { Client, GatewayIntentBits, Events } = require("discord.js");
const eventHandler = require('./handlers/eventHandler');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`.cyan);
});

eventHandler(client);

client.login(process.env.TOKEN)