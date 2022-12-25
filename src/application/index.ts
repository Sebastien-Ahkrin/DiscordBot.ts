import { DiscordClient } from './../core';
import Env, { schema } from './../core/Env';

const env = Env.schema({
  DISCORD_TOKEN: schema.string(),
});

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

client.login(env.DISCORD_TOKEN).then(() => {
  client.log('Client connected');
});
