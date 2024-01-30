import { Axios } from 'axios';
import { hrtime } from 'process';
import { ILogger } from './logger';

interface IHttpClient {
  request(options: any): Promise<any>;
}

class HttpClient implements IHttpClient {
  instance: Axios;
  logger: ILogger;

  constructor(instance: Axios, logger: ILogger) {
    this.instance = instance;
    this.logger = logger;
  }

  async request(options: any) {
    let error;
    let response;

    const url = new URL(options.url);
    const { host, pathname: path } = url;
    const start = hrtime.bigint();

    try {
      response = await this.instance?.request(options);
      return response;
    } catch (err: any) {
      response = err?.response;
      error = err.message;
      throw err;
    } finally {
      this.logger.log(error ? 'error' : 'debug', 'HTTPClientRequest', {
        error,
        duration: Number(hrtime.bigint() - start),
        http: {
          request: { host, path },
          response: {
            attempts: Number(response?.config['axios-retry']?.retryCount + 1),
            status_code: response?.status || -1
          },
        }
      });
    }
  }
}

export { IHttpClient, HttpClient };