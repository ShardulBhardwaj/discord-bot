import { getCurrentFreeGames } from "./getCurrentFreeGames"
import dotenv from 'dotenv';
dotenv.config();

import { Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

async function run() {
  console.log(`Logged in as ${client.user?.tag}!`);
  // get channel
  const channel = client.channels.cache.get(process.env.CHANNEL_ID!) as TextChannel;

  const freeGames = await getCurrentFreeGames();

  const embeds = freeGames.map(game => new MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle(`${game.title}`)
                                    .setURL(`https://www.epicgames.com/store/en-US/p/${game.urlSlug}`)
                                    .setAuthor(`${game.title}`,game.keyImages.find(image => image.type === 'Thumbnail').url,`https://www.epicgames.com/store/en-US/p/${game.urlSlug}`)
                                    .setDescription(`${game.description}`)
                                    .setThumbnail(game.keyImages.find((image: { type: string; }) => image.type === 'Thumbnail').url)
                                    .setImage(game.keyImages.find(image => image.type === 'Thumbnail').url)
                                    .setTimestamp()
                              )

  channel.send({ embeds: embeds });
}

client.on('ready', run);

client.login(process.env.TOKEN);