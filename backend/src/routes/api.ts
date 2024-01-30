import express, { Router } from 'express';
import { ILogger } from '../infra/modules/logger';
import errorHandler from '../middlewares/errors';
import candidate from './candidate';

class Api {
  static create(logger: ILogger) {
    const prefix = '/api';
    const route = Router();

    route.use(express.json());

    route.use(candidate.create(prefix, logger));

    route.use(errorHandler(logger));

    return route;
  }
}

export default Api;