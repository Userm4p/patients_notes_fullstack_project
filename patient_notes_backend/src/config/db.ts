import { Sequelize } from 'sequelize';
import { envs } from './envs';

export const sequelize = new Sequelize(envs.dbConnectionString!, {
  dialect: 'postgres',
  logging: false,
});
