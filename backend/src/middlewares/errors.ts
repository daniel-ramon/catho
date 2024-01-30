import {
    Request, Response, NextFunction,
  } from 'express';
  import { ILogger } from '../infra/modules/logger';
  
  const errorHandler = (logger: ILogger) => (err: any, _: Request, res: Response, next: NextFunction) => {
    const message = String(err?.message);

    logger.log('error', 'ErrorLoggerMidlleware', {
      error: message,
      stack: err?.stack,
    });
  
    if (res.headersSent) {
      return next(err);
    }
  
    let statusCode = 500;
    if (err.statusCode) {
      statusCode = err?.statusCode;
    }
  
    if (message.match('Range')) {
      statusCode = 400;
    }
  
    return res.status(statusCode).json({
      error: message,
    });
  };
  
  export default errorHandler;