import MySql from 'mysql2/promise';
import config from '../../config/application-config';
import { ILogger } from '../modules/logger';
import { Database } from '../modules/database';

class DatabaseFactory {
  static databases = new Map();

  static create(schema: string, logger: ILogger) {
    if(DatabaseFactory.databases.get(schema)) {
      return DatabaseFactory.databases.get(schema)
    }

    const poolOptions = {
      host: config.APP_DB_HOST,
      user: config.APP_DB_USER,
      password: config.APP_DB_PASS,
      database: schema,
      waitForConnections: true,
      connectionLimit: 1,
      idleTimeout: 10000,
    };

    const pool = MySql.createPool(poolOptions);

    const options = {
      type: 'mysql',
      host: poolOptions.host,
      user: poolOptions.user,
      maxAttempts: 3,
      schema,
    };

    const database = new Database(pool, options, logger);
    DatabaseFactory.databases.set(schema, database);

    return database;
  }
}

export { DatabaseFactory };