import { Pool } from 'mysql2/promise';
import { RowDataPacket, FieldPacket } from 'mysql2';
import { ILogger } from './logger';
import { hrtime } from 'process';

interface RowId extends RowDataPacket {
  id: string;
}

interface Options {
  type: string;
  host: string;
  user: string;
  schema: string;
  maxAttempts: number;
}

interface IDatabase {
  execute(sql: string, params: Array<string | number>): any;
}

class Database implements IDatabase {
  pool: Pool;
  logger: ILogger;
  maxAttempts: number;
  meta: any;

  constructor(pool: Pool, options: Options, logger: ILogger) {
    this.pool = pool;
    this.logger = logger;
    this.maxAttempts = options.maxAttempts || 1;
    this.meta = {
      sgdb_type: options.type,
      schema: options.schema,
      query: { duration: 0 },
      connection: {
        host: options.host,
        user: options.user
      }
    }
  }


  async execute(sql: string, params: Array<string | number>) {
    let error;
    let finished;
    const meta = this.meta;
    const start = hrtime.bigint();

    for (let x = 1; x <= this.maxAttempts; x++) {
      const latestStart = hrtime.bigint();
      try {
        const result = await this.pool.execute(sql, params) as [RowDataPacket[], FieldPacket[]];
        finished = true;
        return result;
      } catch (err: any) {
        if (x === this.maxAttempts) {
          error = err.message;
          finished = true;
          throw err;
        }
      } finally {
        if (finished) {
          const end = hrtime.bigint();
          const duration = Number(end - start);
          meta.query.duration = Number(end - latestStart);
          meta.query.attempts = x;
          this.logger.log(error ? 'error' : 'debug', 'DataBaseQuery', { error, duration, db: meta });
        }
      }
    }
  }
}

export { IDatabase, Database, RowId };