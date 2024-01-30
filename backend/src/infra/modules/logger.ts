import { Context } from './contex';

import {
  Logger as WinstonLogger,
} from 'winston';

interface ILogger {
  log(level: string, message: string, meta?: any): void;
}

class Logger implements ILogger {
  logger: WinstonLogger;

  constructor(logger: WinstonLogger) {
    this.logger = logger;
  }

  log(level: string, message: string, meta?: any) {
    const newMeta = meta ? meta : {};
    newMeta['process_id'] = Context.get('process_id');
    return this.logger.log(level, message, newMeta);
  }
}

export { ILogger, Logger };