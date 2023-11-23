const path = require('path');
const getAllFiles = require("../utils/getAllFiles")

/* Will handle all the events in the events folder */
module.exports = (client) => {
    /* Get the paths to the FOLDERS in the events folder */
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)
    // console.log('== eventFolder ==\n', eventFolders)

    /* Get the path to the files in the events folders */
    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        // console.log("eventFiles NOT sorted\n", eventFiles)

        /* Sort folder priority based on numbering */
        eventFiles.sort((a, b) => a > b);
        // console.log("eventFiles YES sorted\n", eventFiles)

        /* Get the event name based on folder name */
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        // console.log("eventName\n", eventName);

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg)
            }
        });
    }
};