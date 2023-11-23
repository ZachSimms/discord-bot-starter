/* Send the initial message with all the buttons */
const { 
	Client, 
	IntentsBitField,
    ButtonStyle, 
    ActionRowBuilder,
    ButtonBuilder
} = require("discord.js");
require("dotenv").config(); /* Gives us access to .env file */

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds, // Generate server stuff
		IntentsBitField.Flags.GuildMembers, // Server member info
		IntentsBitField.Flags.GuildMessages, // Server messages create/update/delete
		IntentsBitField.Flags.MessageContent, // Server messages read
	],
});

const roles = [
    {
        id: '1177071301869981736',  /* id of role */
        label: 'Red'                /* Text on button */
    },
    {
        id: '1177071396636082177',  /* id of role */
        label: 'Green'              /* Text on button */
    },
    {
        id: '1177071431629160482',  /* id of role */
        label: 'Yellow'             /* Text on button */
    }
]

/* on has access to several events based on intents */
client.on("ready", async c => {
	try {
        /* Define the channel to send message */
        const channel = await client.channels.cache.get('1172911527561547849');
        if (!channel) return;

        /* Define the row of buttons */
        /* Make a new row for every 5 row items you have */
        const row = new ActionRowBuilder();

        /* Add the three roles as buttons to the row */
        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Primary)
            )
        })

        await channel.send({
            content: "Claim or remove a role below",
            components: [row]
        });

        process.exit();

    } catch (error) {
        console.log(error)
    }
});


/* Login the bot with bot token */
client.login(process.env.TOKEN);
