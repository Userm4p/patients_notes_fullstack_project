import { app } from './app';
import { sequelize, envs, checkEnvs } from './config';
import './models';
import { seedDatabaseOnce } from './seed';

async function bootstrap() {
  try {
    checkEnvs();

    await sequelize.authenticate();

    console.log('Database connected');

    await sequelize.sync();

    console.log('Models synchronized');

    await seedDatabaseOnce();

    app.listen(envs.port, () => {
      console.log(`Server running on port ${envs.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
