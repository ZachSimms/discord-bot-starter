<div align="center">
	<br />
	<p style="font-size: 36px;font-weight:bold" >
		Discord.JS | Zach's Starter
	</p>
</div>

## About

This repository contains the starting code for my discord bots based on a tutorial I followed [here](https://youtube.com/playlist?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&si=rS6AJH0gYvrc0VYe). There are random comments sprinkled throught to help me recall the functionalities of sections
<br />
Please note that this is not the best starter code for making a discord bot with Discord.JS, but it's good enough for me at the moment.

## Links
- [Discord.js Documentation](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome)
- [Discord.js Guide](https://discordjs.guide/#before-you-begin)
- [Discord.js Github](https://github.com/discordjs/discord.js/tree/main)

## Setup
1. Install relevant packages with `npm install`
2. Setup `.env` with relevant info
```
TOKEN = 123
GUILD_ID = 123
CLIENT_ID = 123
```
3. Setup `config.json` with relevant info
```
{
    "testServer": "123",
    "clientId": "123",
    "devs": [
        "123",
        "456"
    ]
}
```
4. Setup `.gitignore`
```
.env
config.json
node_modules
.vscode
```
5. Run `nodemon` in the terminal in project root directory

## Add Commands

Example commands are given in the starter code in `/src/commands`

<strong>Steps</strong>
1. Go to the `src/commands` folder and add your command file into an appropriate nested folder OR make your own nested folder and put your command file into it
2. Follow the same formatting as provided in the examples `ping.js` and `ban.js`
3. run `nodemon` in the terminal
4. Good Luck 😎


Example code for `src/commands/misc/helloworld.js`

```
module.exports = {
    name: 'helloworld',
    description: 'Classic Hello world',
    devOnly: false,

    callback: (client, interaction) => {
        interaction.reply({
          content: `Hello World! User: ${interaction.user.globalName}`,
          ephemeral: true,
        })
    },
};
```

## Add Events <img src="https://img.shields.io/badge/WIP-ffd966" />
Handle different events. Example events are given in the starter code in `/src/events`