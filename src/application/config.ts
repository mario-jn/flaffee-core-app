import 'dotenv/config';
import { ConfigModel } from '../model/configModel';

const config: ConfigModel = {
    port: Number(process.env.PORT) | 3000,
    env: process.env.NODE_ENV || 'development',
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        name: process.env.DATABASE_NAME || 'root',
        user: process.env.DATABASE_USER || 'user',
        password: process.env.DATABASE_PASSWORD || 'password',
    },
    log: {
        filename: process.env.LOG_FILENAME || 'app-%DATE%.log',
        dirname: process.env.LOG_DIRNAME || 'logs',
        datePattern: process.env.LOG_DATEPATTERN || 'YYYY-MM-DD',
        maxSize: process.env.LOG_MAXSIZE || '10m',
        maxFiles: process.env.LOG_MAXFILES || '7d',
    },
};

export default config;
