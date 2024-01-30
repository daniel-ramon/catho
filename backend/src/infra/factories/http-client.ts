import axios from 'axios';
import axiosRetry from 'axios-retry';
import http from "http";
import https from "https";
import config from '../../config/application-config';
import { ILogger } from '../modules/logger';
import { HttpClient } from '../modules/http-client';

class HttpClientFactory {
  static create(logger: ILogger) {
    const httpAgent = new http.Agent({
      keepAlive: true
    });

    const httpsAgent = new https.Agent({
      keepAlive: true
    });

    const instance = axios.create({
      timeout: 3000,
      httpAgent,
      httpsAgent,
      headers: {
        'user-agent': config.APPLICATION_NAME,
      },
      validateStatus: function (status) {
        return status >= 200 && status < 600;
      },
    });

    axiosRetry(instance, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });

    return new HttpClient(instance, logger);
  }
}

export { HttpClientFactory };