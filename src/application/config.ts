import "dotenv/config"

interface Config {
    port: number;
    nodeEnv: string;
    databaseHost: string;
    databasePort: number;
    databaseName: string;
    databaseUser: string;
    databasePassword: string;
}

const config: Config = {
    port: Number(process.env.PORT) | 3000,
    nodeEnv: process.env.NODE_ENV || "dev",
    databaseHost: process.env.DATABASE_HOST || "localhost",
    databasePort: Number(process.env.DATABASE_PORT) || 5432,
    databaseName: process.env.DATABASE_NAME!,
    databaseUser: process.env.DATABASE_USER!,
    databasePassword: process.env.DATABASE_PASSWORD!,
};

export default config;
