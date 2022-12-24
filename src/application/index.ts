import { DiscordClient } from './../core';
import dotenv from 'dotenv';

dotenv.config();

const client = new DiscordClient(
  { intents: 'DiscordClientAllIntents' },
  {
    folderDir: './logs',
    format: 'DAY/MONTH/YEAR | HOUR:MINUTES | [LEVEL]: MESSAGE',
  },
);

client.addCommand(
  {
    name: 'hello',
    description: 'reply Hello, World!',
  },
  (interaction) => {
    interaction.reply('Hello, World!');
  },
);

client.login(process.env.DISCORD_TOKEN).then(() => {
  client.log('Client connected');
});
