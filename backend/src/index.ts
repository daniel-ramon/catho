import http from 'http';
import express from 'express';
import apiRouter from './routes/api';
import healthcheck from './routes/healthcheck';
import cors from 'cors';
import { LoggerFactory } from './infra';

const logger = LoggerFactory.create();

const app = express();
app.use(cors());
app.use(healthcheck.create());
app.use(apiRouter.create(logger));

const server = http.createServer(app);

const serverPort = process.env.SERVER_PORT || 3000;
server.listen(serverPort, () => {
    logger.log('info', `server running on port ${serverPort}`, {});
});
