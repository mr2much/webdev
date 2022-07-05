// const clientID = '991610668992176158';
require('dotenv').config();
const commandHandler = require('./commands');

const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on('messageCreate', commandHandler);

client.on('interactionCreate', async (interaction) => {
  console.log(`Interaction Received ${interaction}`);
});
