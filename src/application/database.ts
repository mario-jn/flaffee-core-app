import config from "./config"
import {drizzle} from "drizzle-orm/node-postgres"

export const database = drizzle({ connection: `postgres://${config.database.user}:${config.database.password}@${config.database.host}/${config.database.name}`, casing: 'snake_case' });