export interface HealthCheckResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    checks: {
        database: boolean;
    };
}
