const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server',
    devOnly: true,
    // testOnly: Boolean,
    deleted: false,
    options: [
        {
            name: 'target-user',
            description: "The user to ban.",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: "The reason for banning",
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],   /* user perm requirements */
    botpermissions: [PermissionFlagsBits.Administrator],        /* bot perm requirements */

    callback: (client, interaction) => {
        // I'll leave this as an exercise for the reader 😂
        interaction.reply(`ban..`);
    },
};