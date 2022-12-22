import { DiscordClient } from './../src/index';

const client = new DiscordClient({ intents: 'DiscordClientAllIntents' });

client.addCommand(
  {
    name: 'hello',
    description: 'reply Hello, World!',
  },
  (interaction) => {
    interaction.reply('Hello, World!');
  },
);

client.login('');
