export interface ConfigModel {
    port: number;
    env: string;
    database: DatabaseConfig;
    log: LogConfig;
}

export interface DatabaseConfig {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
}

export interface LogConfig {
    filename: string;
    dirname: string;
    datePattern: string;
    maxSize: string;
    maxFiles: string;
}
