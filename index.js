const express = require("express");
const app = express();
require('dotenv').config();

app.listen(3002, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("your code is running!");
});

const { Client, GatewayIntentBits } = require('discord.js');

// Updated for Discord.js v14
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  const channelId = '1380085584394981428';
  const interval = 30 * 1000; // 25 sec in milliseconds
  
  setInterval(() => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send(`<@970283613818073098>`);
      channel.send(`<@970610501589544991>`);
    } else {
      console.log('Channel not found.');
    }
  }, interval);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
    await interaction.followUp('Pong again!');
  }
});

// Use the token from environment variables
client.login(process.env.token);