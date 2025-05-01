import { DatabaseConfig } from './databaseConfig';
import { LogConfig } from './logConfig';

export interface Config {
    port: number;
    env: string;
    database: DatabaseConfig;
    log: LogConfig;
}
