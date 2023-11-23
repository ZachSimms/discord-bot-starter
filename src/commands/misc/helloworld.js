module.exports = {
    name: 'helloworld',
    description: 'Classic Hello world',
    devOnly: false,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply({
          content: `Hello World 🌎! User: ${interaction.user.globalName}`,
          ephemeral: true,
        })
    },
};