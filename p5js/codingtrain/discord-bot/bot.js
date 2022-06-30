const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.login(
  "OTkxNjA0ODkzMDc0ODUzODg4.GypmHw.1tq8Lxwydog3laSsaClZyWkrt3iYzqZ5G47Jk4"
);

// const { Client, GatewayIntentBits } = require("discord.js");
// const client = new Client({ intents: [GatewayIntentBits] });

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });

// client.login(
//   "OTkxNjA0ODkzMDc0ODUzODg4.GypmHw.1tq8Lxwydog3laSsaClZyWkrt3iYzqZ5G47Jk4"
// );
