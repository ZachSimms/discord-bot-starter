/* Only running this file when adding or updating commands */
/*
 * Need access to serverId and bot's id
 */

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require("dotenv").config();

/* Each object represents a different command */
const commands = [
	{
		name: "embed",
		description: "Sends an embed!",
		
	},
];

/* Register the slash commands */
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);


(async () => {
	try {
		console.log("Registering slash commands...");

		const data = await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID
			),
			{ body: commands }
		);

		console.log(`Slash commands registered successfully!`);
	} catch (error) {
		console.log(`There was an error: ${error}`);
	}
})();
