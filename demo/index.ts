import { DiscordClient } from './../src/index';

const client = new DiscordClient({ intents: 'DiscordClientAllIntents' });

client.addCommand(
  {
    name: 'test',
    description: 'Vous affiche le profils du joueur',
    options: [{ name: 'user', type: 6, description: 'User', required: true }],
  },
  (interaction) => {
    interaction.reply('Hello, World!');
  },
);

client.login('SET A TOKEN');
