import path from 'path';
import { DiscordClient } from './../src/index';

const client = new DiscordClient({ intents: 'DiscordClientAllIntents' });
client.config({
  folderDir: path.join('./demo', 'logs'),
  format: 'DAY/MONTH/YEAR | HOUR:MINUTES | [LEVEL]: MESSAGE',
});

client.addCommand(
  {
    name: 'hello',
    description: 'reply Hello, World!',
  },
  (interaction) => {
    interaction.reply('Hello, World!');
  },
);

client.addCommand(
  {
    name: 'hello-with-user',
    description: 'reply Hello, @user',
    options: [
      { name: 'user', type: 6, description: 'user to hello', required: true },
    ],
  },
  (interaction, options) => {
    const user = options.getUser('user');

    if (user) {
      interaction.reply(`Hello, ${user.username}`);
    }
  },
);

client.addCommands([
  {
    command: {
      name: 'hello-with-user-from-array',
      description: 'reply Hello, @user',
      options: [
        { name: 'user', type: 6, description: 'user to hello', required: true },
      ],
    },
    execute: (interaction, options) => {
      const user = options.getUser('user');

      if (user) {
        interaction.reply(`Hello, ${user.username}`);
      }
    },
  },
]);

client.login('').then(() => {
  client.log('Client Logged in.');
});
