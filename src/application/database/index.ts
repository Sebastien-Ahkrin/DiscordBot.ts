import { DataTypes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'discord.ts',
  password: 'mauFJcuf5dhRMQrjj',
  dialect: 'mysql',
});

export class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discord_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discord_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: 'Account' },
);

export { sequelize };
