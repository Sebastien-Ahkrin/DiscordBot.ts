import { DiscordClient } from './../core';
import Env, { schema } from './../core/Env';
import { Account, sequelize } from './database';

const env = Env.schema({
  DISCORD_TOKEN: schema.string(),
  MYSQL_PASSWORD: schema.string(),
});

const client = new DiscordClient(
  { intents: 'DiscordClientAllIntents' },
  {
    folderDir: './logs',
    format: 'DAY/MONTH/YEAR | HOUR:MINUTES | [LEVEL]: MESSAGE',
    withConsole: true,
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

client.login(env.DISCORD_TOKEN).then(async () => {
  await sequelize.authenticate();
  client.log('Client connected to discord and database');

  const account = new Account({
    discord_id: '',
    discord_username: '',
  });

  await account.save();
});
