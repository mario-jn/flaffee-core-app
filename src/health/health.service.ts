import { HealthCheckResponse } from './health.model';
import { database } from '../application/database';
import { sql } from 'drizzle-orm';
import { logger } from '../application/logger';

export class HealthService {
    static async checkHealth(): Promise<HealthCheckResponse> {
        const checks = {
            database: await this.checkDatabase(),
        };
        const isHealthy = Object.values(checks).every(Boolean);
        return {
            status: isHealthy ? 'healthy' : 'unhealthy',
            timestamp: new Date().toISOString(),
            checks,
        };
    }

    private static async checkDatabase(): Promise<boolean> {
        try {
            await database.execute(sql`SELECT 1`);
            return true;
        } catch (err) {
            logger.error(`Error while executing database heath check ${err}`);
            return false;
        }
    }
}
