/* Handle slash commands interaction events */
const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        )

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only developers are allowed to run this command",
                    ephemeral: true,
                });
                return;
            }
        }

        /* Check if running command in the right server */
        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: "This command cannot be ran here",
                    ephemeral: true,
                });
                return;
            }
        }

        /* Check if user has permissions */
        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough permissions (USER)",
                        ephemeral: true,
                    });
                    return;
                }
            }
        }

        /* Check if bot has permissions */
        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has()) {
                    interaction.reply({
                        content: "Not enough permissions (BOT)",
                        ephemeral: true,
                    });
                    return
                }
            }
        }

        
        /* All check are fine. Run the command */
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
};