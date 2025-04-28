import config from "./config"
import {drizzle} from "drizzle-orm/node-postgres"

export const db = drizzle({ connection: `postgres://${config.databaseUser}:${config.databasePassword}@${config.databaseHost}/${config.databaseName}`, casing: 'snake_case' });