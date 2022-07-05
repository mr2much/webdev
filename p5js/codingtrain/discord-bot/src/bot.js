// const clientID = '991610668992176158';
const replies = [
  'The answer is 42',
  ':heart:',
  ':dizzy:',
  'These are not the droids you are looking for',
];

require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  console.log(`Message received: ${msg}`);

  if (msg.channel.id === process.env.CLIENT_ID && msg.content === 'choo choo') {
    // msg.reply(":heart:");
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  }
});

client.on('interactionCreate', async (interaction) => {
  console.log(`Interaction Received ${interaction}`);
});
