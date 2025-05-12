import { HealthService } from './health.service';
import { Request, Response, NextFunction } from 'express';

export class HealthController {
    static async checkHealth(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const healthCheckResult = await HealthService.checkHealth();
            const statusCode = healthCheckResult.status === 'healthy' ? 200 : 503;
            response.status(statusCode).json({
                data: healthCheckResult,
            });
        } catch (error) {
            next(error);
        }
    }
}
