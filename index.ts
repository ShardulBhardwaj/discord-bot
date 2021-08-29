const dotenv = require('dotenv');
dotenv.config();

import { Client, Intents, TextChannel } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function run() {
  console.log(`Logged in as ${client.user?.tag}!`);
  const channel = client.channels.cache.get(process.env.CHANNEL_ID!) as TextChannel;

  channel.send('https://www.epicgames.com/store/en-US/');
}


client.on('ready', run);



client.login(process.env.TOKEN);
