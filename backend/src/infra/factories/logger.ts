import config from '../../config/application-config';

import {
  createLogger,
  format,
  LoggerOptions,
  transports,
} from 'winston';
import { Logger } from '../modules/logger';

class LoggerFactory {
  static getDefaultOptions() {
    const generateExtraTags = format((info: any) => {
      const newInfo = info;
      newInfo['created_at'] = new Date().toISOString();
      return newInfo;
    });

    const options: LoggerOptions = {
      level: config.LOG_LEVEL || 'info',
      format: format.combine(generateExtraTags(), format.json()),
      defaultMeta: {
        environment: config.ENVIRONMENT,
        application_name: config.APPLICATION_NAME,
        application_version: config.APPLICATION_VERSION,
        db: {}
      },
      transports: [new transports.Console()],
    };

    return options
  }

  static create() {
    const logger = createLogger(LoggerFactory.getDefaultOptions());
    return new Logger(logger);
  }
}

export { LoggerFactory };