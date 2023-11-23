require("dotenv").config(); /* Gives us access to .env file */
const { Client, IntentsBitField, } = require("discord.js");
const eventHander = require("./handlers/eventHander");

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds, // Generate server stuff
		IntentsBitField.Flags.GuildMembers, // Server member info
		IntentsBitField.Flags.GuildMessages, // Server messages create/update/delete
		IntentsBitField.Flags.MessageContent, // Server messages read
	],
});

eventHander(client);

/* Login the bot with bot token */
client.login(process.env.TOKEN);
