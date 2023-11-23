/* Register the commands when the bot comes up */
const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client) => {
    /* Get all the files in commands folder */
    const localCommands = getLocalCommands()
    // console.log(localCommands);

    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        /* Loop through local commands and compare with application commands */
        for (const localCmd of localCommands) {
            const {name, description, options } = localCmd

            /* Check if command exists in the bot */
            const existingCommand = await applicationCommands.cache?.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCmd.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`🗑 Deleted command "${name}"`)
                    continue;
                }

                /* Check if commands are different */
                if (areCommandsDifferent(existingCommand, localCmd)) {
                    await applicationCommands.edit(
                        existingCommand.id,
                        {
                            description,
                            options,
                        }
                    )

                    console.log(`🔁 Edited command "${name}"`);
                }
            } else {
                if (localCmd.deleted) {
                    console.log(`⏩ Skipping registering command "${name}" as it's set to delete`)
                    continue;
                }

                /* Command exists and is NOT set to be deleted */
                await applicationCommands.create({
                    name,
                    description,
                    options,
                })

                console.log(`👍 Registered command "${name}"`);
            }
        }
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
};