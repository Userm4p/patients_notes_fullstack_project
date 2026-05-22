import express from 'express';
import cors from 'cors';
import { envs } from './config';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: envs.frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(`/api/${envs.apiVersion}`, router);

export { app };
